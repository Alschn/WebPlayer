from typing import Any

from drf_spectacular.utils import extend_schema
from rest_framework import serializers, status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from spotify_adapter.utils import get_spotify_client


class PlaylistDetailFollowersContainsParamsSerializer(serializers.Serializer):
    ids = serializers.ListField(
        child=serializers.CharField(max_length=50),
        allow_empty=False,
        help_text=(
            "A comma-separated list of Spotify User IDs ; "
            "the ids of the users that you want to check to see if they follow the playlist. "
            "Maximum: 5 ids."
        )
    )


class PlaylistDetailFollowersContainsView(APIView):
    """
    GET     /api/spotify/playlists/<str:playlist_id>/followers/contains/

    Check to see if one or more Spotify users are following a specified playlist.

    Reference:
    https://developer.spotify.com/documentation/web-api/reference/check-if-user-follows-playlist
    """

    # todo: response serializer

    @extend_schema(
        parameters=[PlaylistDetailFollowersContainsParamsSerializer]
    )
    def get(self, request: Request, playlist_id: str, *args: Any, **kwargs: Any) -> Response:
        serializer = PlaylistDetailFollowersContainsParamsSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)

        ids = serializer.validated_data['ids']

        client = get_spotify_client(request.user)
        data = client.playlist_is_following(playlist_id=playlist_id, user_ids=ids)
        return Response(data, status=status.HTTP_200_OK)
