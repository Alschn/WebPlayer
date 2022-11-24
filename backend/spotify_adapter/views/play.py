from typing import Any

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from spotify_adapter.utils import play_song_with_uri, play_song
from spotify_auth.permissions import HasSpotifyToken


class PlaySongView(APIView):
    """/api/spotify/player/play/"""

    permission_classes = [IsAuthenticated, HasSpotifyToken]

    def post(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        sender = request.user
        uris = request.data.get('uris')
        context_uri = request.data.get('context_uri')
        if not uris:
            return Response({"error": 'Uri not found in request body!'}, status=status.HTTP_400_BAD_REQUEST)

        if context_uri:
            play_song_with_uri(sender, uris)
        else:
            play_song_with_uri(sender, uris, context_uri)
        return Response({'Success': f'Playing with uris: {str(uris)}'}, status=status.HTTP_204_NO_CONTENT)

    def put(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        sender = request.user
        play_song(sender)
        return Response({'Success': 'Playing song'}, status=status.HTTP_204_NO_CONTENT)
