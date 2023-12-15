from typing import Any

import requests
from django.conf import settings
from drf_spectacular.utils import extend_schema
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

SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token'


class GetSpotifyAccessTokenDataSerializer(serializers.Serializer):
    code = serializers.CharField()


class SpotifyAccessTokenResponseSerializer(serializers.Serializer):
    access_token = serializers.CharField()
    refresh_token = serializers.CharField()
    expires_in = serializers.IntegerField()
    token_type = serializers.CharField()


class GetSpotifyAccessTokenView(APIView):
    """
    POST    /api/auth/spotify/access/

    Sends authorization code to Spotify api endpoint.
    Responds with `access_token`, `refresh_token`, `expires_in`, `token_type`.
    """

    @extend_schema(
        responses={
            status.HTTP_200_OK: SpotifyAccessTokenResponseSerializer,
        }
    )
    def post(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        serializer = GetSpotifyAccessTokenDataSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        code = serializer.validated_data['code']

        response = send_spotify_token_request(code)
        response_json = response.json()
        return Response(response_json, status=status.HTTP_200_OK)


def send_spotify_token_request(code: str) -> requests.Response:
    return requests.post(
        SPOTIFY_TOKEN_URL,
        data={
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri': settings.SPOTIFY_REDIRECT_URI,
            'client_id': settings.SPOTIFY_CLIENT_ID,
            'client_secret': settings.SPOTIFY_CLIENT_SECRET
        }
    )
