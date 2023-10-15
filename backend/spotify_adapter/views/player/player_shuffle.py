from typing import Any

from drf_spectacular.utils import extend_schema
from rest_framework import status, serializers
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from spotify_adapter.utils import get_spotify_client
from spotify_auth.permissions import HasSpotifyToken


class PlayerShuffleDataSerializer(serializers.Serializer):
    state = serializers.BooleanField(
        help_text=(
            'true: Shuffle user’s playback. '
            'false: Do not shuffle user’s playback.'
        )
    )
    device_id = serializers.CharField(
        required=False, allow_null=True, default=None,
        help_text=(
            'The id of the device this command is targeting. '
            'If not supplied, the user’s currently active device is the target.'
        )
    )


class PlayerShuffleView(APIView):
    """
    PUT     /api/spotify/me/player/shuffle/     - Toggle shuffle on or off for user’s playback.

    Reference:
    https://developer.spotify.com/documentation/web-api/reference/toggle-shuffle-for-users-playback
    """

    permission_classes = [IsAuthenticated, HasSpotifyToken]

    # todo: response serializer

    @extend_schema(
        request=PlayerShuffleDataSerializer,
    )
    def put(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        serializer = PlayerShuffleDataSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        shuffle = serializer.validated_data['state']

        client = get_spotify_client(request.user)
        client.shuffle(shuffle, device_id=serializer.validated_data['device_id'])
        return Response(serializer.data, status=status.HTTP_200_OK)
