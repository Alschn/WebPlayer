from typing import Any

from drf_spectacular.utils import extend_schema
from rest_framework import status, serializers
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from spotify_adapter.utils import get_spotify_client
from spotify_auth.permissions import HasSpotifyToken

from django.utils.translation import gettext_lazy as _


class PlayerRepeatDataSerializer(serializers.Serializer):
    state = serializers.ChoiceField(
        choices=[
            ('off', _('Repeat off')),
            ('track', _('Repeat the current track')),
            ('context', _('Repeat the current context')),
        ],
    )
    device_id = serializers.CharField(
        allow_null=True,
        default=None,
        help_text=_(
            "The id of the device this command is targeting. "
            "If not supplied, the user's currently active device is the target."
        )
    )


class PlayerRepeatView(APIView):
    """
    PUT     /api/spotify/player/repeat/     - Set the repeat mode of the current user's Spotify player.

    Reference:
    https://developer.spotify.com/documentation/web-api/reference/set-repeat-mode-on-users-playback
    """

    permission_classes = [IsAuthenticated, HasSpotifyToken]

    @extend_schema(
        request=PlayerRepeatDataSerializer,
        # todo: response serializer
        responses={status.HTTP_200_OK: None},
    )
    def put(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        serializer = PlayerRepeatDataSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        state = serializer.validated_data['state']
        device_id = serializer.validated_data.get('device_id')

        client = get_spotify_client(request.user)
        client.repeat(state=state, device_id=device_id)
        return Response(serializer.data, status=status.HTTP_200_OK)
