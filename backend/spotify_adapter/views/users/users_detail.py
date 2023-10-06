from typing import Any

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from spotify_adapter.utils import get_spotify_client
from spotify_auth.permissions import HasSpotifyToken


class UsersDetailView(APIView):
    """
    GET     /api/spotify/users/<str:user_id>/       - Get public profile information about a Spotify user.

    Reference:
    https://developer.spotify.com/documentation/web-api/reference/get-users-profile
    """

    permission_classes = [IsAuthenticated, HasSpotifyToken]

    # todo: response serializer

    def get(self, request: Request, user_id: str, *args: Any, **kwargs: Any) -> Response:
        client = get_spotify_client(request.user)
        data = client.user(user_id)
        return Response(data, status=status.HTTP_200_OK)
