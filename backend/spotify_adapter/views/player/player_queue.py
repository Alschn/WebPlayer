from typing import Any

from rest_framework import status, serializers
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from spotify_adapter.utils import get_spotify_client
from spotify_auth.permissions import HasSpotifyToken


class PlayerAddToQueueDataSerializer(serializers.Serializer):
    uri = serializers.CharField()
    device_id = serializers.CharField(required=False, allow_null=True, default=None)


class PlayerQueueView(APIView):
    """
    GET     /api/spotify/me/player/queue/     - Get the list of objects that make up the user's queue.

    POST    /api/spotify/me/player/queue/     - Add an item to the end of the user's current playback queue.

    Reference:
    https://developer.spotify.com/documentation/web-api/reference/player/get-queue/
    """
    permission_classes = [IsAuthenticated, HasSpotifyToken]

    def get(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        client = get_spotify_client(request.user)
        data = client.queue()
        return Response(data, status=status.HTTP_200_OK)

    def post(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        serializer = PlayerAddToQueueDataSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        uri = serializer.validated_data['uri']
        device_id = serializer.validated_data['device_id']

        client = get_spotify_client(request.user)
        data = client.add_to_queue(uri=uri, device_id=device_id)
        return Response(data, status=status.HTTP_200_OK)
