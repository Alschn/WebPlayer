from typing import Any

from drf_spectacular.utils import extend_schema
from rest_framework import status, serializers
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from spotify_adapter.serializers.albums import AlbumSerializer
from spotify_adapter.serializers.spotify import MarketField, AlbumIdsField
from spotify_adapter.utils import get_spotify_client
from spotify_auth.permissions import HasSpotifyToken


class AlbumsParamsSerializer(serializers.Serializer):
    ids = AlbumIdsField()
    market = MarketField(required=False)


class AlbumsView(APIView):
    """
    GET     /api/spotify/albums/ - Get Spotify catalog information for multiple albums identified by their Spotify IDs.

    Reference:
    https://developer.spotify.com/documentation/web-api/reference/get-multiple-albums
    """

    permission_classes = [IsAuthenticated, HasSpotifyToken]
    serializer_class = AlbumsParamsSerializer

    @extend_schema(
        parameters=[AlbumsParamsSerializer],
        responses={status.HTTP_200_OK: AlbumSerializer(many=True)},
    )
    def get(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        serializer = AlbumsParamsSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)

        ids = serializer.validated_data['ids']
        market = serializer.validated_data.get('market')

        client = get_spotify_client(request.user)
        data = client.albums(albums=ids, market=market)
        return Response(data, status=status.HTTP_200_OK)
