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


class PlayerSeekPositionDataSerializer(serializers.Serializer):
    position_ms = serializers.IntegerField(
        min_value=0,
        help_text=_(
            'The position in milliseconds to seek to. '
            'Must be a positive number. Passing in a position that is greater than the length of the track '
            'will cause the player to start playing the next song.'
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


class PlayerSeekPositionView(APIView):
    """
    PUT     /api/spotify/me/player/seek/   - Seeks to the given position in the user’s currently playing track.

    Reference:
    https://developer.spotify.com/documentation/web-api/reference/seek-to-position-in-currently-playing-track
    """

    permission_classes = [IsAuthenticated, HasSpotifyToken]

    @extend_schema(
        request=PlayerSeekPositionDataSerializer,
        responses={status.HTTP_204_NO_CONTENT: None},
    )
    def put(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        serializer = PlayerSeekPositionDataSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        position_ms = serializer.validated_data['position_ms']
        device_id = serializer.validated_data['device_id']

        client = get_spotify_client(request.user)
        client.seek_track(position_ms=position_ms, device_id=device_id)
        return Response({}, status=status.HTTP_200_OK)
