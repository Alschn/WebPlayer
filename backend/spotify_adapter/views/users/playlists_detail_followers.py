from typing import Any

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from spotify_adapter.utils import get_spotify_client
from spotify_auth.permissions import HasSpotifyToken


class PlaylistDetailFollowersView(APIView):
    """
    PUT     /api/spotify/playlists/<str:playlist_id>/followers/   - Add the current user as a follower of a playlist.

    DELETE  /api/spotify/playlists/<str:playlist_id>/followers/   - Remove the current user as a follower of a playlist.

    Reference:
    https://developer.spotify.com/documentation/web-api/reference/follow-playlist

    https://developer.spotify.com/documentation/web-api/reference/unfollow-playlist
    """
    permission_classes = [IsAuthenticated, HasSpotifyToken]

    def put(self, request: Request, playlist_id: str, *args: Any, **kwargs: Any) -> Response:
        client = get_spotify_client(request.user)
        client.current_user_follow_playlist(playlist_id=playlist_id)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def delete(self, request: Request, playlist_id: str, *args: Any, **kwargs: Any) -> Response:
        client = get_spotify_client(request.user)
        client.current_user_unfollow_playlist(playlist_id=playlist_id)
        return Response(status=status.HTTP_204_NO_CONTENT)
