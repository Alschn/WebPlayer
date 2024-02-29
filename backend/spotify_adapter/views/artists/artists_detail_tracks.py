from typing import Any

from drf_spectacular.utils import extend_schema
from rest_framework import status, serializers
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from spotify_adapter.serializers.artists import ArtistTopTracksPageSerializer
from spotify_adapter.serializers.spotify import MarketField
from spotify_adapter.utils import get_spotify_client
from spotify_auth.permissions import HasSpotifyToken


class ArtistsDetailTracksParamsSerializer(serializers.Serializer):
    market = MarketField()


class ArtistsDetailTracks(APIView):
    """
    GET     /api/spotify/artists/<str:artist_id>/top-tracks/

    Get Spotify catalog information about an artist's top tracks by country.

    Reference:
    https://developer.spotify.com/documentation/web-api/reference/get-an-artists-top-tracks
    """

    permission_classes = [IsAuthenticated, HasSpotifyToken]

    @extend_schema(
        parameters=[ArtistsDetailTracksParamsSerializer],
        responses={status.HTTP_200_OK: ArtistTopTracksPageSerializer},
    )
    def get(self, request: Request, artist_id: str, *args: Any, **kwargs: Any) -> Response:
        serializer = ArtistsDetailTracksParamsSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)

        market = serializer.validated_data.get('market')

        client = get_spotify_client(request.user)
        data = client.artist_top_tracks(artist_id, country=market)
        return Response(data, status=status.HTTP_200_OK)
