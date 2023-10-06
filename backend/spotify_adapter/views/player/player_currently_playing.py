from typing import Any

from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from spotify_adapter.utils import get_spotify_client


class PlayerCurrentlyPlayingView(APIView):
    """
    GET     /api/spotify/me/player/currently-playing/    -  Get the object currently being played on the user's Spotify
    account.

    Reference:
    https://developer.spotify.com/documentation/web-api/reference/get-the-users-currently-playing-track
    """

    def get(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        client = get_spotify_client(request.user)
        current_song = client.current_user_playing_track()
        return Response(current_song, status=status.HTTP_200_OK)
