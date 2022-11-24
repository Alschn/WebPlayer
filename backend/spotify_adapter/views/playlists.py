from typing import Any

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from spotify_adapter.utils import get_user_playlists, get_next_items
from spotify_auth.permissions import HasSpotifyToken


class GetUserPlaylistsView(APIView):
    """/api/spotify/playlists/"""

    permission_classes = [IsAuthenticated, HasSpotifyToken]

    def get(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        sender = request.user
        playlists = get_user_playlists(sender)
        return Response(playlists, status=status.HTTP_200_OK)

    def put(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        sender = request.user
        next_playlists = request.data.get('next')
        if next_playlists:
            playlists = get_next_items(sender, href=next_playlists)
            return Response(playlists, status=status.HTTP_200_OK)
        return Response({'error': 'Next parameter not found in request body!'}, status=status.HTTP_400_BAD_REQUEST)
