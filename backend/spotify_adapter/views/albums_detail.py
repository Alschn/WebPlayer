from typing import Any

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from spotify_adapter.utils import get_album, get_next_items
from spotify_auth.permissions import HasSpotifyToken


class GetAlbumView(APIView):
    """/api/spotify/albums/{album_id}"""

    permission_classes = [IsAuthenticated, HasSpotifyToken]

    def get(self, request: Request, album_id: str, *args: Any, **kwargs: Any) -> Response:
        sender = request.user
        saved_tracks = get_album(sender, album_id)
        return Response(saved_tracks, status=status.HTTP_200_OK)

    def put(self, request: Request, album_id: str, *args: Any, **kwargs: Any) -> Response:
        sender = request.user
        next_tracks = request.data.get('next')
        if next_tracks and album_id:
            more_tracks = get_next_items(sender, href=next_tracks)
            return Response(more_tracks, status=status.HTTP_200_OK)
        return Response({'error': 'Album id not found in query parameters!'}, status=status.HTTP_400_BAD_REQUEST)
