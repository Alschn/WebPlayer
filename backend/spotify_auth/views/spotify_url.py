from typing import Any

import requests
from django.conf import settings
from rest_framework import status, serializers
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

SPOTIFY_AUTHORIZE_URL = 'https://accounts.spotify.com/authorize'


class GetSpotifyAuthUrlSerializer(serializers.Serializer):
    url = serializers.CharField()


class GetSpotifyAuthURLView(APIView):
    """
    GET     /api/auth/spotify/url/   - Get the url to redirect the user to for spotify authorization
    """
    serializer_class = GetSpotifyAuthUrlSerializer

    def get(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        url = build_spotify_authorize_url(SCOPES)
        return Response({'url': url}, status=status.HTTP_200_OK)


def build_spotify_authorize_url(scopes: list[str]) -> str:
    scope = ' '.join(scopes)

    request_obj = requests.Request(
        'GET',
        SPOTIFY_AUTHORIZE_URL,
        params={
            'scope': scope,
            'response_type': 'code',
            'redirect_uri': settings.REDIRECT_URI,
            'client_id': settings.CLIENT_ID
        }
    ).prepare()
    return request_obj.url
