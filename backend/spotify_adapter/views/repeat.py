from typing import Any

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from spotify_adapter.utils import set_repeat_mode
from spotify_auth.permissions import HasSpotifyToken


class SetRepeatModeView(APIView):
    """/api/spotify/player/repeat/"""

    permission_classes = [IsAuthenticated, HasSpotifyToken]

    def put(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        sender = request.user
        mode = request.data.get('mode')
        if mode and mode in ['off', 'track', 'context']:
            set_repeat_mode(sender, mode)
            return Response({'Message': 'Changed repeat mode!'}, status=status.HTTP_200_OK)
        return Response({'error': 'Mode not found in request body!'}, status=status.HTTP_400_BAD_REQUEST)
