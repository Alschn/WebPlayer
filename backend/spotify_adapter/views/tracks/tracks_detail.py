from typing import Any

from drf_spectacular.utils import extend_schema
from rest_framework import serializers
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from spotify_adapter.serializers.spotify import MarketField
from spotify_adapter.serializers.tracks import TrackSerializer
from spotify_adapter.utils import get_spotify_client
from spotify_auth.permissions import HasSpotifyToken


class TrackParamsSerializer(serializers.Serializer):
    market = MarketField(required=False)


class TrackDetailView(APIView):
    """
    GET     /api/spotify/tracks/<str:track_id>/

    Get Spotify catalog information for a single track identified by its unique Spotify ID.

    Reference:
    https://developer.spotify.com/documentation/web-api/reference/get-track
    """
    permission_classes = [IsAuthenticated, HasSpotifyToken]

    @extend_schema(
        parameters=[TrackParamsSerializer],
        responses={status.HTTP_200_OK: TrackSerializer}
    )
    def get(self, request: Request, track_id: str, *args: Any, **kwargs: Any) -> Response:
        client = get_spotify_client(request.user)
        data = client.track(track_id)
        return Response(data, status=status.HTTP_200_OK)
