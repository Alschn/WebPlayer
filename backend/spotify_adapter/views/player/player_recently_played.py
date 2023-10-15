from typing import Any

from drf_spectacular.utils import extend_schema
from rest_framework import serializers, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from spotify_adapter.utils import get_spotify_client
from spotify_auth.permissions import HasSpotifyToken


class PlayerRecentlyPlayedParamsSerializer(serializers.Serializer):
    limit = serializers.IntegerField(
        required=False, allow_null=True, default=None
    )
    after = serializers.IntegerField(
        required=False, allow_null=True, default=None
    )
    before = serializers.IntegerField(
        required=False, allow_null=True, default=None
    )


class PlayerRecentlyPlayedView(APIView):
    """
    GET     /api/spotify/me/player/recently-played/

    Get tracks from the current user's recently played tracks.
    Note: Currently doesn't support podcast episodes.

    Reference:
    https://developer.spotify.com/documentation/web-api/reference/get-recently-played
    """
    permission_classes = [IsAuthenticated, HasSpotifyToken]

    # todo: response serializer

    @extend_schema(
        parameters=[PlayerRecentlyPlayedParamsSerializer]
    )
    def get(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        serializer = PlayerRecentlyPlayedParamsSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)

        limit = serializer.validated_data['limit']
        after = serializer.validated_data['after']
        before = serializer.validated_data['before']

        client = get_spotify_client(request.user)
        data = client.current_user_recently_played(
            limit=limit,
            after=after,
            before=before
        )
        return Response(data, status=status.HTTP_200_OK)
