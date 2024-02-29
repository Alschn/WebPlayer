from typing import Any

from drf_spectacular.utils import extend_schema
from rest_framework import status, serializers
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from spotify_adapter.serializers.artists import ArtistSerializer
from spotify_adapter.serializers.spotify import ArtistIdsField
from spotify_adapter.utils import get_spotify_client
from spotify_auth.permissions import HasSpotifyToken


class ArtistsParamsSerializer(serializers.Serializer):
    ids = ArtistIdsField()


class ArtistsView(APIView):
    """
    GET     /api/spotify/artists/   - Get Spotify catalog information for several artists based on their Spotify IDs.

    Reference:
    https://developer.spotify.com/documentation/web-api/reference/get-multiple-artists
    """

    permission_classes = [IsAuthenticated, HasSpotifyToken]

    @extend_schema(
        parameters=[ArtistsParamsSerializer],
        responses={status.HTTP_200_OK: ArtistSerializer(many=True)},
    )
    def get(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        serializer = ArtistsParamsSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)

        ids = serializer.validated_data['ids']

        client = get_spotify_client(request.user)
        data = client.artists(artists=ids)
        return Response(data, status=status.HTTP_200_OK)
