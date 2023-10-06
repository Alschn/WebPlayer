from typing import Any

from rest_framework import status, serializers
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from spotify_adapter.utils import get_spotify_client
from spotify_auth.permissions import HasSpotifyToken


class PlaylistCreateSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100)
    public = serializers.BooleanField(default=True)
    collaborative = serializers.BooleanField(default=False)
    description = serializers.CharField(max_length=300, allow_blank=True, required=False)


class UsersPlaylistsView(APIView):
    """
    GET     /api/spotify/users/<str:user_id>/playlists/     - Get a list of a user's playlists
    POST    /api/spotify/users/<str:user_id>/playlists/     - Create a new playlist for a user
    """

    permission_classes = [IsAuthenticated, HasSpotifyToken]

    def get(self, request: Request, user_id: str, *args: Any, **kwargs: Any) -> Response:
        client = get_spotify_client(request.user)
        data = client.user_playlists(user_id)
        return Response(data, status=status.HTTP_200_OK)

    def post(self, request: Request, user_id: str, *args: Any, **kwargs: Any) -> Response:
        serializer = PlaylistCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        client = get_spotify_client(request.user)
        data = client.user_playlist_create(
            user_id,
            **serializer.validated_data
        )
        return Response(data, status=status.HTTP_201_CREATED)
