from typing import Any

from drf_spectacular.utils import extend_schema
from rest_framework import serializers, status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from spotify_adapter.utils import get_spotify_client


class CategoriesDetailParamsSerializer(serializers.Serializer):
    country = serializers.CharField(max_length=2, required=False)
    limit = serializers.IntegerField(min_value=1, max_value=50, required=False)
    offset = serializers.IntegerField(min_value=0, required=False)


class CategoriesDetailPlaylistsView(APIView):
    """
    GET     /api/spotify/browse/categories/<str:category_id>/playlists/

    Get a list of Spotify playlists tagged with a particular category.

    Reference:
    https://developer.spotify.com/documentation/web-api/reference/get-a-categories-playlists
    """

    @extend_schema(
        parameters=[CategoriesDetailParamsSerializer],
        # todo: response serializer
    )
    def get(self, request: Request, category_id: str, *args: Any, **kwargs: Any) -> Response:
        serializer = CategoriesDetailParamsSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)

        country = serializer.validated_data.get('country')
        limit = serializer.validated_data.get('limit')
        offset = serializer.validated_data.get('offset')

        client = get_spotify_client(request.user)
        data = client.category_playlists(
            category_id,
            country=country,
            limit=limit,
            offset=offset
        )
        return Response(data, status=status.HTTP_200_OK)
