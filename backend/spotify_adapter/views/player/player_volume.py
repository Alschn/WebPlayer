from typing import Any

from django.utils.translation import gettext_lazy as _
from drf_spectacular.utils import extend_schema
from rest_framework import status, serializers
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from spotify_adapter.utils import get_spotify_client
from spotify_auth.permissions import HasSpotifyToken


class PlayerVolumeDataSerializer(serializers.Serializer):
    volume_percent = serializers.IntegerField(
        min_value=0,
        max_value=100,
        help_text=_(
            'The volume to set. Must be a value from 0 to 100 inclusive.'
        )
    )
    device_id = serializers.CharField(
        allow_null=True,
        default=None,
        help_text=_(
            "The id of the device this command is targeting. "
            "If not supplied, the user's currently active device is the target."
        )
    )


class PlayerVolumeView(APIView):
    """
    PUT     /api/spotify/me/player/volume/  - Set the volume for the user’s current playback device.

    Reference:
    https://developer.spotify.com/documentation/web-api/reference/set-volume-for-users-playback
    """

    permission_classes = [IsAuthenticated, HasSpotifyToken]
    serializer_class = PlayerVolumeDataSerializer

    @extend_schema(
        request=PlayerVolumeDataSerializer,
        responses={status.HTTP_204_NO_CONTENT: None},
    )
    def put(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        serializer = PlayerVolumeDataSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        volume_percent = serializer.validated_data['volume_percent']
        device_id = serializer.validated_data['device_id']

        client = get_spotify_client(request.user)
        client.volume(volume_percent=volume_percent, device_id=device_id)
        return Response({}, status=status.HTTP_204_NO_CONTENT)
