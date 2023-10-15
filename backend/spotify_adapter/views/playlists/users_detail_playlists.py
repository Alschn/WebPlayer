from typing import Any

from drf_spectacular.utils import extend_schema
from rest_framework import status, serializers
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from spotify_adapter.utils import get_spotify_client
from spotify_auth.permissions import HasSpotifyToken


class UserPlaylistsParamsSerializer(serializers.Serializer):
    limit = serializers.IntegerField(min_value=1, max_value=50, default=50)
    offset = serializers.IntegerField(min_value=0, default=0)


class UserPlaylistCreateDataSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100)
    public = serializers.BooleanField(default=True)
    collaborative = serializers.BooleanField(default=False)
    description = serializers.CharField(max_length=300, allow_blank=True, required=False)


class UsersPlaylistsView(APIView):
    """
    GET     /api/spotify/users/<str:user_id>/playlists/

    Get a list of the playlists owned or followed by a Spotify user.

    POST    /api/spotify/users/<str:user_id>/playlists/

    Create a playlist for a Spotify user. (The playlist will be empty until you add tracks.)
    Each user is generally limited to a maximum of 11000 playlists.

    Reference:
    https://developer.spotify.com/documentation/web-api/reference/get-list-users-playlists

    https://developer.spotify.com/documentation/web-api/reference/create-playlist
    """

    permission_classes = [IsAuthenticated, HasSpotifyToken]

    @extend_schema(
        parameters=[UserPlaylistsParamsSerializer],
        # todo: response
    )
    def get(self, request: Request, user_id: str, *args: Any, **kwargs: Any) -> Response:
        serializer = UserPlaylistsParamsSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)

        client = get_spotify_client(request.user)
        data = client.user_playlists(user_id, **serializer.validated_data)
        return Response(data, status=status.HTTP_200_OK)

    @extend_schema(
        request=UserPlaylistCreateDataSerializer,
        # todo: response
    )
    def post(self, request: Request, user_id: str, *args: Any, **kwargs: Any) -> Response:
        serializer = UserPlaylistCreateDataSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        client = get_spotify_client(request.user)
        data = client.user_playlist_create(
            user_id,
            **serializer.validated_data
        )
        return Response(data, status=status.HTTP_201_CREATED)
