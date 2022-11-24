from typing import Any

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from spotify_adapter.utils import prev_song, skip_song
from spotify_auth.permissions import HasSpotifyToken


class SkipSongView(APIView):
    """/api/spotify/skip"""

    permission_classes = [IsAuthenticated, HasSpotifyToken]

    def post(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        sender = request.user
        if request.data['forward'] is False:
            prev_song(sender)
            return Response({'Message': 'Skipped song'}, status.HTTP_204_NO_CONTENT)

        skip_song(sender)
        return Response({'Message': 'Skipped song'}, status.HTTP_204_NO_CONTENT)
