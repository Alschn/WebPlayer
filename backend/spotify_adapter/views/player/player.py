from typing import Any

from django.utils.translation import gettext_lazy as _
from drf_spectacular.utils import extend_schema
from rest_framework import status, serializers
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from spotify_adapter.serializers.player import PlayerPlaybackStateSerializer
from spotify_adapter.serializers.spotify import MarketField
from spotify_adapter.utils import get_spotify_client
from spotify_auth.permissions import HasSpotifyToken


class PlayerParamsSerializer(serializers.Serializer):
    market = MarketField(required=False)
    additional_types = serializers.MultipleChoiceField(
        choices=['track', 'episode'],
        default={'track'},
        required=False,
        help_text=_(
            'A comma-separated list of item types that your client supports besides the default `track` type. '
            'Note: This parameter was introduced to allow existing clients to maintain their current behaviour and '
            'might be deprecated in the future.'
            'In addition to providing this parameter, make sure that your client properly handles cases of new types '
            'in the future by checking against the type field of each object.'
        )
    )


class PlayerView(APIView):
    """
    GET     /api/spotify/me/player/    -  Get information about the user’s current playback state,
    including track or episode, progress, and active device.

    Reference:
    https://developer.spotify.com/documentation/web-api/reference/get-information-about-the-users-current-playback
    """
    permission_classes = [IsAuthenticated, HasSpotifyToken]

    @extend_schema(
        parameters=[PlayerParamsSerializer],
        responses={status.HTTP_200_OK: PlayerPlaybackStateSerializer}
    )
    def get(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        serializer = PlayerParamsSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)

        market = serializer.validated_data.get('market')
        additional_types = serializer.validated_data.get('additional_types')

        client = get_spotify_client(request.user)
        state = client.current_playback(
            market=market, additional_types=additional_types
        )
        return Response(state, status=status.HTTP_200_OK)
