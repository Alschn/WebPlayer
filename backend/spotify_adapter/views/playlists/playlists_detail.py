from typing import Any

from drf_spectacular.utils import extend_schema
from rest_framework import status, serializers
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from spotify_adapter.utils import get_spotify_client
from spotify_auth.permissions import HasSpotifyToken


class PlaylistDetailParamsSerializer(serializers.Serializer):
    market = serializers.CharField(required=False)
    fields = serializers.CharField(required=False)
    additional_types = serializers.CharField(required=False)


class PlaylistDetailUpdateDataSerializer(serializers.Serializer):
    name = serializers.CharField(required=False)
    public = serializers.BooleanField(required=False)
    collaborative = serializers.BooleanField(required=False)
    description = serializers.CharField(required=False)


class PlaylistDetailView(APIView):
    """
    GET     /api/spotify/playlists/<str:playlist_id>/

    Get a playlist owned by a Spotify user.

    PUT     /api/spotify/playlists/<str:playlist_id>/

    Change a playlist's name and public/private state. (The user must, of course, own the playlist.)

    Reference:
    https://developer.spotify.com/documentation/web-api/reference/get-playlist

    https://developer.spotify.com/documentation/web-api/reference/change-playlist-details
    """

    permission_classes = [IsAuthenticated, HasSpotifyToken]

    @extend_schema(
        parameters=[PlaylistDetailParamsSerializer]
        # todo: response serializer
    )
    def get(self, request: Request, playlist_id: str, *args: Any, **kwargs: Any) -> Response:
        serializer = PlaylistDetailParamsSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)

        client = get_spotify_client(request.user)
        data = client.playlist(
            playlist_id=playlist_id,
            **serializer.validated_data,
        )
        return Response(data, status=status.HTTP_200_OK)

    @extend_schema(
        request=PlaylistDetailUpdateDataSerializer,
        # todo: response serializer
    )
    def put(self, request: Request, playlist_id: str, *args: Any, **kwargs: Any) -> Response:
        serializer = PlaylistDetailUpdateDataSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        client = get_spotify_client(request.user)
        data = client.playlist_change_details(
            playlist_id=playlist_id,
            **serializer.validated_data,
        )
        return Response(data, status=status.HTTP_200_OK)
