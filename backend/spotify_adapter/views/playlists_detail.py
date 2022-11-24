from typing import Optional, Any

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from spotify_adapter.utils import get_playlist, update_playlist, get_next_items
from spotify_auth.permissions import HasSpotifyToken


class GetPlaylistView(APIView):
    """/api/spotify/playlists/{playlist_id}/"""

    permission_classes = [IsAuthenticated, HasSpotifyToken]

    def get(self, request: Request, playlist_id: str, *args: Any, **kwargs: Any) -> Response:
        """Get a Playlist"""

        sender = request.user
        if playlist_id:
            playlist = get_playlist(sender, playlist_id)
            return Response(playlist, status=status.HTTP_200_OK)
        return Response({'error': 'Playlist id not found in query parameters!'}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request: Request, playlist_id: str, *args: Any, **kwargs: Any) -> Response:
        """Add Items to a playlist"""

        return Response({}, status=status.HTTP_201_CREATED)

    def patch(self, request: Request, playlist_id: str, *args: Any, **kwargs: Any) -> Response:
        """Change a Playlist's Details"""

        sender = request.user
        req_data = request.data
        name: Optional[str] = req_data.get('name')
        public: Optional[bool] = req_data.get('public')
        collaborative: Optional[bool] = req_data.get('collaborative')
        description: Optional[str] = req_data.get('description')

        payload = {}

        if name and isinstance(name, str):
            payload['name'] = name
        if public is not None and isinstance(public, bool):
            payload['public'] = public
        if collaborative is not None and isinstance(public, bool):
            payload['collaborative'] = public
        if description and isinstance(description, str):
            payload['description'] = description

        update = update_playlist(sender, playlist_id, payload=payload)
        return Response(update, status=status.HTTP_200_OK)

    def put(self, request: Request, playlist_id: str, *args: Any, **kwargs: Any) -> Response:
        sender = request.user
        next_tracks = request.data.get('next')
        if next_tracks:
            more_tracks = get_next_items(sender, next_tracks)
            return Response(more_tracks, status=status.HTTP_200_OK)
        return Response({'error': 'Next parameter not found in request body!'}, status=status.HTTP_400_BAD_REQUEST)
