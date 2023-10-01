from typing import Any

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from spotify_adapter.utils import get_users_playlists, create_playlist
from spotify_auth.permissions import HasSpotifyToken


class UsersPlaylistsView(APIView):
    """/api/spotify/users/{user_id}/playlists/"""

    permission_classes = [IsAuthenticated, HasSpotifyToken]

    def get(self, request: Request, user_id: str, *args: Any, **kwargs: Any) -> Response:
        sender = request.user
        playlists = get_users_playlists(sender, user_id)
        return Response(playlists, status=status.HTTP_200_OK)

    def post(self, request: Request, user_id: str, *args: Any, **kwargs: Any) -> Response:
        sender = request.user
        playlist_name = request.data.get('name')
        if not playlist_name:
            return Response({'error': 'Playlist name not found in request!'}, status=status.HTTP_400_BAD_REQUEST)
        new_playlist = create_playlist(sender, user_id, playlist_name)
        return Response(new_playlist, status=status.HTTP_201_CREATED)
