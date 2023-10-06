from typing import Any

from drf_spectacular.utils import extend_schema
from rest_framework import serializers, status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from spotify_adapter.serializers.spotify import NewReleasesSerializer
from spotify_adapter.utils import get_spotify_client


class NewReleasesParamsSerializer(serializers.Serializer):
    country = serializers.CharField(max_length=2, required=False)
    limit = serializers.IntegerField(min_value=1, max_value=50, required=False)
    offset = serializers.IntegerField(min_value=0, required=False)


class NewReleasesView(APIView):
    """
    GET     /api/spotify/browse/new-releases/ - Get a list of new album releases featured in Spotify
    (shown, for example, on a Spotify player’s “Browse” tab).

    Reference:
    https://developer.spotify.com/documentation/web-api/reference/get-new-releases
    """
    serializer_class = NewReleasesSerializer

    @extend_schema(
        parameters=[NewReleasesParamsSerializer],
        responses={status.HTTP_200_OK: NewReleasesSerializer},
    )
    def get(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        serializer = NewReleasesParamsSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)

        client = get_spotify_client(request.user)
        data = client.new_releases(**serializer.validated_data)
        return Response(data, status=status.HTTP_200_OK)
