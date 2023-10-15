from typing import Any

from drf_spectacular.utils import extend_schema
from rest_framework import status, serializers
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from spotify_adapter.utils import get_spotify_client
from spotify_auth.permissions import HasSpotifyToken


class AlbumsDetailTracksParamsSerializer(serializers.Serializer):
    market = serializers.CharField(required=False)
    limit = serializers.IntegerField(required=False, min_value=0, max_value=50)
    offset = serializers.IntegerField(required=False, min_value=0)


class AlbumsDetailTracksView(APIView):
    """
    GET     /api/spotify/albums/<str:album_id>/tracks/   - Get Spotify catalog information for a single album.

    Reference:
    https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-an-album
    """

    permission_classes = [IsAuthenticated, HasSpotifyToken]

    # todo: response serializer

    @extend_schema(
        parameters=[AlbumsDetailTracksParamsSerializer],
        # responses={status.HTTP_200_OK: None},
    )
    def get(self, request: Request, album_id: str, *args: Any, **kwargs: Any) -> Response:
        serializer = AlbumsDetailTracksParamsSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)

        client = get_spotify_client(request.user)
        data = client.album_tracks(album_id, **serializer.validated_data)
        return Response(data, status=status.HTTP_200_OK)
