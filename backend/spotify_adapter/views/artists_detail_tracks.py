from typing import Any

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from spotify_adapter.utils import get_artist
from spotify_auth.permissions import HasSpotifyToken


class GetArtistsTopTracksView(APIView):
    """/api/spotify/artists/{artist_id}/tracks"""

    permission_classes = [IsAuthenticated, HasSpotifyToken]

    def get(self, request: Request, artist_id: str, *args: Any, **kwargs: Any) -> Response:
        artist_top = get_artist(request.user, artist_id, endpoint_type='/top-tracks')
        return Response(artist_top, status=status.HTTP_200_OK)
