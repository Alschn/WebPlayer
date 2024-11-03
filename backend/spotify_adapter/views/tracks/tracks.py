from typing import Any

from drf_spectacular.utils import extend_schema
from rest_framework import serializers, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from spotify_adapter.serializers.spotify import TrackIdsField
from spotify_adapter.serializers.tracks import TracksSerializer
from spotify_adapter.utils import get_spotify_client
from spotify_auth.permissions import HasSpotifyToken


class TracksParamsSerializer(serializers.Serializer):
    ids = TrackIdsField()
    market = serializers.CharField(required=False)


class TracksView(APIView):
    """
    GET     /api/spotify/tracks/

    Get Spotify catalog information for multiple tracks based on their Spotify IDs.

    Reference:
    https://developer.spotify.com/documentation/web-api/reference/get-several-tracks
    """
    permission_classes = [IsAuthenticated, HasSpotifyToken]

    @extend_schema(
        parameters=[TracksParamsSerializer],
        responses={status.HTTP_200_OK: TracksSerializer}
    )
    def get(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        serializer = TracksParamsSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)

        ids = serializer.validated_data.get('ids')
        market = serializer.validated_data.get('market')

        client = get_spotify_client(request.user)
        data = client.tracks(tracks=ids, market=market)
        return Response(data, status=status.HTTP_200_OK)
