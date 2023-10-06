from typing import Any

from drf_spectacular.utils import extend_schema
from rest_framework import serializers, status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from spotify_adapter.utils import get_spotify_client


class TracksParamsSerializer(serializers.Serializer):
    ids = serializers.ListField(child=serializers.CharField(max_length=22), required=True)
    market = serializers.CharField(required=False)


class TracksView(APIView):
    """
    GET     /api/spotify/tracks/

    Get Spotify catalog information for multiple tracks based on their Spotify IDs.

    Reference:
    https://developer.spotify.com/documentation/web-api/reference/get-several-tracks
    """

    @extend_schema(
        parameters=[TracksParamsSerializer],
        # todo: add response schema
    )
    def get(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        serializer = TracksParamsSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)

        ids = serializer.validated_data.get('ids')
        market = serializer.validated_data.get('market')

        client = get_spotify_client(request.user)
        data = client.tracks(tracks=ids, market=market)
        return Response(data, status=status.HTTP_200_OK)
