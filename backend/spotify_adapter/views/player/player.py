from typing import Any

from rest_framework import status, serializers
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from spotify_adapter.utils import get_spotify_client


class PlayerParamsSerializer(serializers.Serializer):
    market = serializers.CharField(required=False)
    additional_types = serializers.CharField(required=False)


class PlayerView(APIView):
    """
    GET     /api/spotify/me/player/    -  Get information about the user’s current playback state,
    including track or episode, progress, and active device.

    Reference:
    https://developer.spotify.com/documentation/web-api/reference/get-information-about-the-users-current-playback
    """

    def get(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        serializer = PlayerParamsSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)

        market = serializer.validated_data.get("market")
        additional_types = serializer.validated_data.get("additional_types")

        client = get_spotify_client(request.user)
        state = client.current_playback(
            market=market, additional_types=additional_types
        )
        return Response(state, status=status.HTTP_200_OK)
