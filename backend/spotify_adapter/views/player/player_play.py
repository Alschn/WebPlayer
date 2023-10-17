from typing import Any

from rest_framework import status, serializers
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from spotify_adapter.utils import get_spotify_client
from spotify_auth.permissions import HasSpotifyToken


class PlaySongWithURISerializer(serializers.Serializer):
    uris = serializers.ListField(child=serializers.CharField())
    context_uri = serializers.CharField(required=False, allow_null=True, default=None)
    device_id = serializers.CharField(required=False, allow_null=True, default=None)
    offset = serializers.DictField(required=False, allow_null=True, default=None)
    position_ms = serializers.IntegerField(required=False, allow_null=True, default=None)

    def validate(self, data: dict) -> dict:
        uris = data['uris']
        context_uri = data['context_uri']

        if uris is not None and context_uri is not None:
            raise serializers.ValidationError("You can't specify both `uris` and `context_uri`")

        return data


class PlayerStartResumePlayback(APIView):
    """
    POST    /api/spotify/me/player/play/

    PUT     /api/spotify/me/player/play/

    Start a new context or resume current playback on the user's active device.

    Reference:
    https://developer.spotify.com/documentation/web-api/reference/start-a-users-playback
    """

    permission_classes = [IsAuthenticated, HasSpotifyToken]

    # todo: response serializer

    def post(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        client = get_spotify_client(request.user)
        client.start_playback()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        serializer = PlaySongWithURISerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        client = get_spotify_client(request.user)
        client.start_playback(**serializer.validated_data)
        return Response(serializer.data, status=status.HTTP_200_OK)
