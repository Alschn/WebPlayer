from typing import Any

from rest_framework import serializers, status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from spotify_adapter.utils import get_spotify_client


class SearchParamsSerializer(serializers.Serializer):
    q = serializers.CharField()
    type = serializers.CharField()
    market = serializers.CharField(required=False)
    limit = serializers.IntegerField(required=False)
    offset = serializers.IntegerField(required=False)


class SearchView(APIView):
    """
    GET     /api/spotify/search/?q=     - Get Spotify catalog information about albums, artists, playlists, tracks,
    shows, episodes or audiobooks that match a keyword string.

    Reference:
    https://developer.spotify.com/documentation/web-api/reference/search
    """

    def get(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        serializer = SearchParamsSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)

        search_param = serializer.validated_data['q']
        type_param = serializer.validated_data['type']
        limit = serializer.validated_data.get('limit')
        offset = serializer.validated_data.get('offset')
        market = serializer.validated_data.get('market')

        client = get_spotify_client(request.user)
        data = client.search(
            q=search_param,
            limit=limit,
            offset=offset,
            type=type_param,
            market=market,
        )
        return Response(data, status=status.HTTP_200_OK)
