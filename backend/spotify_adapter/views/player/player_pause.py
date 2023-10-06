from typing import Any

from rest_framework import status, serializers
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from spotify_adapter.utils import get_spotify_client
from spotify_auth.permissions import HasSpotifyToken


class PlayerPausePlaybackParamsSerializer(serializers.Serializer):
    device_id = serializers.CharField(required=False, allow_null=True, default=None)


class PlayerPausePlaybackView(APIView):
    """
    PUT  /api/spotify/me/player/pause/ - Pause playback on the user's account.

    Reference:
    https://developer.spotify.com/documentation/web-api/reference/pause-a-users-playback
    """

    permission_classes = [IsAuthenticated, HasSpotifyToken]

    # todo: response serializer

    def put(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        serializer = PlayerPausePlaybackParamsSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        device_id = serializer.validated_data['device_id']

        client = get_spotify_client(request.user)
        client.pause_playback(device_id=device_id)
        return Response(serializer.data, status=status.HTTP_204_NO_CONTENT)
