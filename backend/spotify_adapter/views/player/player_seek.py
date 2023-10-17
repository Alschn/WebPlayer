from typing import Any

from drf_spectacular.utils import extend_schema
from rest_framework import status, serializers
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from spotify_adapter.utils import get_spotify_client
from spotify_auth.permissions import HasSpotifyToken


class PlayerSeekPositionDataSerializer(serializers.Serializer):
    position_ms = serializers.IntegerField(min_value=0)
    device_id = serializers.CharField(required=False, allow_null=True, default=None)


class PlayerSeekPositionView(APIView):
    """
    PUT     /api/spotify/me/player/seek/   - Seeks to the given position in the user’s currently playing track.

    Reference:
    https://developer.spotify.com/documentation/web-api/reference/seek-to-position-in-currently-playing-track
    """

    permission_classes = [IsAuthenticated, HasSpotifyToken]

    # todo: response serializer

    @extend_schema(
        request=PlayerSeekPositionDataSerializer,
    )
    def put(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        serializer = PlayerSeekPositionDataSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        position_ms = serializer.validated_data['position_ms']
        device_id = serializer.validated_data['device_id']

        client = get_spotify_client(request.user)
        data = client.seek_track(position_ms=position_ms, device_id=device_id)
        return Response(data, status=status.HTTP_200_OK)
