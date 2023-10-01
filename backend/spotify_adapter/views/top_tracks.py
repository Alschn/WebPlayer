from typing import Any

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from spotify_adapter.utils import get_users_top_tracks
from spotify_auth.permissions import HasSpotifyToken


class GetTopTracksView(APIView):
    """/api/spotify/top/tracks/"""

    permission_classes = [IsAuthenticated, HasSpotifyToken]

    def get(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        limit = request.query_params.get('limit')
        sender = request.user
        tracks = get_users_top_tracks(sender, limit=limit) if limit else get_users_top_tracks(sender)
        return Response(tracks, status=status.HTTP_200_OK)

    def put(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        return Response({}, status=status.HTTP_200_OK)
