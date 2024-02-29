from typing import Any

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from spotify_adapter.serializers.artists import ArtistSerializer
from spotify_adapter.utils import get_spotify_client
from spotify_auth.permissions import HasSpotifyToken


class ArtistsDetailView(APIView):
    """
    GET     /api/spotify/artists/<str:artist_id>/ - Get Spotify catalog information for a single artist
    identified by their unique Spotify ID.

    Reference:
    https://developer.spotify.com/documentation/web-api/reference/get-an-artist
    """
    permission_classes = [IsAuthenticated, HasSpotifyToken]
    serializer_class = ArtistSerializer

    def get(self, request: Request, artist_id: str, *args: Any, **kwargs: Any) -> Response:
        client = get_spotify_client(request.user)
        data = client.artist(artist_id)
        return Response(data, status=status.HTTP_200_OK)
