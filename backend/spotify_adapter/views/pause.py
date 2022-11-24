from typing import Any

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from spotify_adapter.utils import pause_song
from spotify_auth.permissions import HasSpotifyToken


class PauseSongView(APIView):
    """/api/spotify/pause"""

    permission_classes = [IsAuthenticated, HasSpotifyToken]

    def put(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        sender = request.user
        pause_song(sender)
        return Response({'Success': 'Paused song'}, status=status.HTTP_204_NO_CONTENT)
