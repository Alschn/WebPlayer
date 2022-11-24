from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from spotify_adapter.utils import get_artist
from spotify_auth.permissions import HasSpotifyToken


class GetArtistView(APIView):
    """/api/spotify/artists/{artist_id}"""

    permission_classes = [IsAuthenticated, HasSpotifyToken]

    def get(self, request, artist_id, *args, **kwargs) -> Response:
        artist = get_artist(request.user, artist_id)
        return Response(artist, status=status.HTTP_200_OK)
