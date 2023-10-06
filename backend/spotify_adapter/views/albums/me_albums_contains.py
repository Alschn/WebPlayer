from typing import Any

from drf_spectacular.utils import extend_schema
from rest_framework import status, serializers
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from spotify_adapter.utils import get_spotify_client
from spotify_auth.permissions import HasSpotifyToken


class CurrentUserAlbumsContainsParamsSerializer(serializers.Serializer):
    ids = serializers.ListField(child=serializers.CharField(), allow_empty=False)


class CurrentUserAlbumsContainsView(APIView):
    """
    GET     /api/spotify/me/albums/contains/ - Check if one or more albums is already saved in the current
    Spotify user's 'Your Music' library.

    Reference:
    https://developer.spotify.com/documentation/web-api/reference/check-users-saved-albums
    """

    permission_classes = [IsAuthenticated, HasSpotifyToken]

    @extend_schema(
        parameters=[CurrentUserAlbumsContainsParamsSerializer],
        # todo: response serializer
    )
    def get(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        serializer = CurrentUserAlbumsContainsParamsSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)

        ids = serializer.validated_data['ids']

        client = get_spotify_client(request.user)
        data = client.current_user_saved_albums_contains(albums=ids)
        return Response(data, status=status.HTTP_200_OK)
