from typing import Any

from drf_spectacular.utils import extend_schema
from rest_framework import status, serializers
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from spotify_adapter.serializers.albums import AlbumSerializer
from spotify_adapter.serializers.spotify import AlbumIdsField, LimitField, OffsetField
from spotify_adapter.utils import get_spotify_client
from spotify_auth.permissions import HasSpotifyToken


class CurrentUserAlbumsParamsSerializer(serializers.Serializer):
    limit = LimitField()
    offset = OffsetField()


class CurrentUserAlbumsSaveDataSerializer(serializers.Serializer):
    ids = AlbumIdsField()


class CurrentUserAlbumsDeleteParamsSerializer(serializers.Serializer):
    ids = AlbumIdsField()


class CurrentUserAlbumsView(APIView):
    """
    GET     /api/spotify/me/albums/ - Get a list of the albums saved in the current Spotify user's 'Your Music' library.

    PUT     /api/spotify/me/albums/ - Save one or more albums to the current user's 'Your Music' library.

    DELETE  /api/spotify/me/albums/ - Remove one or more albums from the current user's 'Your Music' library.

    Reference:
    https://developer.spotify.com/documentation/web-api/reference/get-users-saved-albums

    https://developer.spotify.com/documentation/web-api/reference/save-albums-user

    https://developer.spotify.com/documentation/web-api/reference/remove-albums-user
    """

    permission_classes = [IsAuthenticated, HasSpotifyToken]

    @extend_schema(
        parameters=[CurrentUserAlbumsParamsSerializer],
        responses={status.HTTP_200_OK: AlbumSerializer},
    )
    def get(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        serializer = CurrentUserAlbumsParamsSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)

        client = get_spotify_client(request.user)
        data = client.current_user_saved_albums(**serializer.validated_data)
        return Response(data, status=status.HTTP_200_OK)

    @extend_schema(
        parameters=[CurrentUserAlbumsParamsSerializer],
    )
    def put(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        serializer = CurrentUserAlbumsSaveDataSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        client = get_spotify_client(request.user)
        data = client.current_user_saved_albums_add()
        return Response(data, status=status.HTTP_200_OK)

    @extend_schema(
        parameters=[CurrentUserAlbumsParamsSerializer],
    )
    def delete(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        serializer = CurrentUserAlbumsDeleteParamsSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        client = get_spotify_client(request.user)

        client.current_user_saved_albums_delete()
        return Response(status=status.HTTP_200_OK)
