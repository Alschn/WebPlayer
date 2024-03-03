from typing import Any

from django.utils.translation import gettext_lazy as _
from drf_spectacular.utils import extend_schema
from rest_framework import status, serializers
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from spotify_adapter.serializers.queue import TracksQueueSerializer
from spotify_adapter.utils import get_spotify_client
from spotify_auth.permissions import HasSpotifyToken


class PlayerAddToQueueDataSerializer(serializers.Serializer):
    uri = serializers.CharField(
        help_text=_(
            'The uri of the item to add to the queue. '
            'Must be a track or an episode uri.'
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


class PlayerQueueView(APIView):
    """
    GET     /api/spotify/me/player/queue/     - Get the list of objects that make up the user's queue.

    POST    /api/spotify/me/player/queue/     - Add an item to the end of the user's current playback queue.

    Reference:
    https://developer.spotify.com/documentation/web-api/reference/player/get-queue/
    """
    permission_classes = [IsAuthenticated, HasSpotifyToken]

    @extend_schema(
        responses={status.HTTP_200_OK: TracksQueueSerializer}
    )
    def get(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        client = get_spotify_client(request.user)
        data = client.queue()
        return Response(data, status=status.HTTP_200_OK)

    @extend_schema(
        request=PlayerAddToQueueDataSerializer,
        responses={status.HTTP_204_NO_CONTENT: None}
    )
    def post(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        serializer = PlayerAddToQueueDataSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        uri = serializer.validated_data['uri']
        device_id = serializer.validated_data['device_id']

        client = get_spotify_client(request.user)
        client.add_to_queue(uri=uri, device_id=device_id)
        return Response({}, status=status.HTTP_204_NO_CONTENT)
