from typing import Any

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from spotify_adapter.utils import seek_position
from spotify_auth.permissions import HasSpotifyToken


class SeekPositionView(APIView):
    """/api/spotify/player/seek/"""

    permission_classes = [IsAuthenticated, HasSpotifyToken]

    def put(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        sender = request.user
        position_ms = request.data.get('position_ms')
        if isinstance(position_ms, int) and 0 <= position_ms:
            seek_position(sender, position_ms)
            return Response({'Message': f'Changed current position to {position_ms} [ms]!'}, status=status.HTTP_200_OK)
        return Response({'error': 'Position_ms not found in request body!'}, status=status.HTTP_400_BAD_REQUEST)
