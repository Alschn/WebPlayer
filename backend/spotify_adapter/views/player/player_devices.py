from typing import Any

from django.utils.translation import gettext as _
from drf_spectacular.utils import extend_schema
from rest_framework import status, serializers
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from spotify_adapter.serializers.devices import DevicesResponseSerializer
from spotify_adapter.utils import get_spotify_client
from spotify_auth.permissions import HasSpotifyToken


class TransferPlaybackDataSerializer(serializers.Serializer):
    device_id = serializers.CharField(
        required=True,
        help_text=_('ID of the device on which playback should be started/transferred.')
    )
    play = serializers.BooleanField(
        default=False,
        help_text=_(
            'true: ensure playback happens on new device. '
            'false or not provided: keep the current playback state.'
        )
    )


class PlayerDevices(APIView):
    """
    GET     /api/spotify/me/player/devices/   - Get information about a user’s available devices.

    PUT     /api/spotify/me/player/devices/   - Set the active device for the user

    Reference:
    https://developer.spotify.com/documentation/web-api/reference/get-a-users-available-devices

    https://developer.spotify.com/documentation/web-api/reference/transfer-a-users-playback
    """

    permission_classes = [IsAuthenticated, HasSpotifyToken]

    @extend_schema(
        responses={status.HTTP_200_OK: DevicesResponseSerializer}
    )
    def get(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        client = get_spotify_client(request.user)
        data = client.devices()
        return Response(data, status=status.HTTP_200_OK)

    @extend_schema(
        request=TransferPlaybackDataSerializer,
        responses={status.HTTP_204_NO_CONTENT: None}
    )
    def put(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        serializer = TransferPlaybackDataSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        device_id = serializer.validated_data['device_id']
        play = serializer.validated_data['play']

        client = get_spotify_client(request.user)
        client.transfer_playback(
            device_id=device_id,
            force_play=play
        )
        return Response({}, status=status.HTTP_204_NO_CONTENT)
