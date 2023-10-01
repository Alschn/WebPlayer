from typing import Any

import requests
from django.conf import settings
from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

SCOPES = [
    # listening history
    'user-read-recently-played', 'user-top-read', 'user-read-playback-position',
    # spotify connect
    "user-read-playback-state", "user-modify-playback-state", "user-read-currently-playing",
    # playback
    "app-remote-control", "streaming",
    # playlists
    "playlist-modify-public", "playlist-modify-private",
    "playlist-read-private", "playlist-read-collaborative",
    # follow
    "user-follow-modify", "user-follow-read",
    # library
    "user-library-modify", "user-library-read",
    # users
    "user-read-email", "user-read-private",
]

SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token'


class GetSpotifyAccessTokenView(APIView):
    """/api/auth/spotify/access"""

    def post(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        """Sends authorization code to Spotify api endpoint.
        Responds with access_token, refresh_token, expires_in, token_type."""

        code = request.data.get('code')

        if not code:
            return Response({'error': 'Code not found in request'}, status=status.HTTP_400_BAD_REQUEST)

        response = requests.post(SPOTIFY_TOKEN_URL, data={
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri': settings.REDIRECT_URI,
            'client_id': settings.CLIENT_ID,
            'client_secret': settings.CLIENT_SECRET
        })

        return Response(response.json(), status=status.HTTP_200_OK)
