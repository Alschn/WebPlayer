from typing import Any

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from spotify_adapter.serializers.artists import ArtistRelatedArtistsPageSerializer
from spotify_adapter.utils import get_spotify_client
from spotify_auth.permissions import HasSpotifyToken


class ArtistsDetailRelatedArtistsView(APIView):
    """
    GET     /api/spotify/artists/<str:artist_id>/related-artists/   - Get Spotify catalog information about artists
    similar to a given artist. Similarity is based on analysis of the Spotify community's listening history.

    Reference:
    https://developer.spotify.com/documentation/web-api/reference/get-an-artists-related-artists
    """

    permission_classes = [IsAuthenticated, HasSpotifyToken]
    serializer_class = ArtistRelatedArtistsPageSerializer

    def get(self, request: Request, artist_id: str, *args: Any, **kwargs: Any) -> Response:
        client = get_spotify_client(request.user)
        data = client.artist_related_artists(artist_id)
        return Response(data, status=status.HTTP_200_OK)
