from typing import Any

from rest_framework import status, serializers
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from spotify_adapter.utils import get_spotify_client
from spotify_auth.permissions import HasSpotifyToken


class PlayerSkipToNextParamsSerializer(serializers.Serializer):
    device_id = serializers.CharField(required=False, allow_null=True, default=None)


class PlayerSkipToNextView(APIView):
    """
    POST    /api/spotify/me/player/next/   - Skips to next track in the user’s queue.

    Reference:
    https://developer.spotify.com/documentation/web-api/reference/skip-users-playback-to-next-track
    """

    permission_classes = [IsAuthenticated, HasSpotifyToken]

    def post(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        serializer = PlayerSkipToNextParamsSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        device_id = serializer.validated_data['device_id']

        client = get_spotify_client(request.user)
        client.next_track(device_id=device_id)
        return Response(status=status.HTTP_204_NO_CONTENT)
