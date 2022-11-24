from typing import Any

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from spotify_adapter.utils import set_volume
from spotify_auth.permissions import HasSpotifyToken


class SetVolumeView(APIView):
    """/api/spotify/volume"""

    permission_classes = [IsAuthenticated, HasSpotifyToken]

    def put(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        sender = request.user
        volume = request.data.get('volume')
        if isinstance(volume, int) and 0 <= volume <= 100:
            set_volume(sender, volume)
            return Response({"Message": f"Changed volume to {volume}"}, status=status.HTTP_204_NO_CONTENT)
        return Response({"error": 'Invalid volume parameter'}, status=status.HTTP_400_BAD_REQUEST)
