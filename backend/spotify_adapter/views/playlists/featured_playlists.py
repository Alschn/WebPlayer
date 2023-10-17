from typing import Any

from drf_spectacular.utils import extend_schema
from rest_framework import serializers, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from spotify_adapter.utils import get_spotify_client
from spotify_auth.permissions import HasSpotifyToken


class FeaturedPlaylistsParamsSerializer(serializers.Serializer):
    country = serializers.CharField(max_length=2, required=False)
    locale = serializers.CharField(max_length=5, required=False)
    timestamp = serializers.CharField(required=False)
    limit = serializers.IntegerField(min_value=1, max_value=50, required=False)
    offset = serializers.IntegerField(min_value=0, required=False)


class FeaturedPlaylistsView(APIView):
    """
    GET     /api/spotify/browse/featured-playlists/

    Get a list of Spotify featured playlists (shown, for example, on a Spotify player's 'Browse' tab).

    Reference:
    https://developer.spotify.com/documentation/web-api/reference/get-featured-playlists
    """
    permission_classes = [IsAuthenticated, HasSpotifyToken]

    @extend_schema(
        parameters=[FeaturedPlaylistsParamsSerializer],
        # todo: response serializer
    )
    def get(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        serializer = FeaturedPlaylistsParamsSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)

        country = serializer.validated_data.get('country')
        locale = serializer.validated_data.get('locale')
        timestamp = serializer.validated_data.get('timestamp')
        limit = serializer.validated_data.get('limit')
        offset = serializer.validated_data.get('offset')

        client = get_spotify_client(request.user)
        data = client.featured_playlists(
            country=country,
            locale=locale,
            timestamp=timestamp,
            limit=limit,
            offset=offset,
        )
        return Response(data, status=status.HTTP_200_OK)
