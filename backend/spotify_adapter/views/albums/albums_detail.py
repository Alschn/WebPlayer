from typing import Any

from drf_spectacular.utils import extend_schema
from rest_framework import status, serializers
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from spotify_adapter.serializers.albums import AlbumSerializer
from spotify_adapter.serializers.spotify import MarketField
from spotify_adapter.utils import get_spotify_client
from spotify_auth.permissions import HasSpotifyToken


class AlbumDetailParamsSerializer(serializers.Serializer):
    market = MarketField(required=False)


class AlbumsDetailView(APIView):
    """
    GET     /api/spotify/albums/<str:album_id>/ - Get Spotify catalog information for a single album.

    Reference:
    https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-an-album
    """

    permission_classes = [IsAuthenticated, HasSpotifyToken]

    @extend_schema(
        parameters=[AlbumDetailParamsSerializer],
        responses={status.HTTP_200_OK: AlbumSerializer},
    )
    def get(self, request: Request, album_id: str, *args: Any, **kwargs: Any) -> Response:
        serializer = AlbumDetailParamsSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)

        market = serializer.validated_data.get("market")

        client = get_spotify_client(request.user)
        data = client.album(album_id, market=market)
        return Response(data, status=status.HTTP_200_OK)
