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


class OffsetSerializer(serializers.Serializer):
    position = serializers.IntegerField(
        required=False,
        help_text=_('The position to start playback. Must be a positive integer.')
    )
    uri = serializers.CharField(
        required=False,
        help_text=_('The URI of the item to start at.')
    )

    def validate(self, attrs: dict) -> dict:
        position = attrs.get('position')
        uri = attrs.get('uri')

        if position is not None and uri is not None:
            raise serializers.ValidationError("You can't specify both `position` and `uri`")

        return attrs


class PlaySongWithURISerializer(serializers.Serializer):
    uris = serializers.ListField(
        child=serializers.CharField(),
        default=None,
        help_text=_('Optional. Array of the Spotify track URIs to play.')
    )
    context_uri = serializers.CharField(
        allow_null=True,
        default=None,
        help_text=_(
            'Optional. Spotify URI of the context to play. Valid contexts are albums, artists & playlists.'
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
    offset = OffsetSerializer(
        default=None,
        help_text=_(
            'Optional. Indicates from where in the context playback should start. '
            'Only available when context_uri corresponds to an album or playlist object '
            '"position" is zero based and can’t be negative. '
            'Example: "offset": {"position": 5} "uri" is a string representing the uri of the item to start at. '
            'Example: "offset": {"uri": "spotify:track:1301WleyT98MSxVHPZCA6M"}'
        )
    )
    position_ms = serializers.IntegerField(default=None)

    def validate(self, attrs: dict) -> dict:
        uris = attrs['uris']
        context_uri = attrs['context_uri']

        if uris is not None and context_uri is not None:
            raise serializers.ValidationError("You can't specify both `uris` and `context_uri`")

        return attrs


class PlayerStartResumePlayback(APIView):
    """
    POST    /api/spotify/me/player/play/

    PUT     /api/spotify/me/player/play/

    Start a new context or resume current playback on the user's active device.

    Reference:
    https://developer.spotify.com/documentation/web-api/reference/start-a-users-playback
    """

    permission_classes = [IsAuthenticated, HasSpotifyToken]

    @extend_schema(
        responses={status.HTTP_204_NO_CONTENT: None}
    )
    def post(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        client = get_spotify_client(request.user)
        client.start_playback()
        return Response({}, status=status.HTTP_204_NO_CONTENT)

    @extend_schema(
        request=PlaySongWithURISerializer,
        responses={status.HTTP_204_NO_CONTENT: None}
    )
    def put(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        serializer = PlaySongWithURISerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        client = get_spotify_client(request.user)
        client.start_playback(**serializer.validated_data)
        return Response({}, status=status.HTTP_204_NO_CONTENT)
