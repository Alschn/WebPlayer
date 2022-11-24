from typing import Any

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from spotify_adapter.utils import get_artist
from spotify_auth.permissions import HasSpotifyToken


class GetRelatedArtistsView(APIView):
    """/api/spotify/artists/{artist_id}/related-artists"""

    permission_classes = [IsAuthenticated, HasSpotifyToken]

    def get(self, request: Request, artist_id: str, *args: Any, **kwargs: Any) -> Response:
        related_artists = get_artist(request.user, artist_id, endpoint_type='/related-artists')
        return Response(related_artists, status=status.HTTP_200_OK)
