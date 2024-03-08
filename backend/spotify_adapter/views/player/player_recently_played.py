from typing import Any

from django.utils.translation import gettext_lazy as _
from drf_spectacular.utils import extend_schema
from rest_framework import serializers, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from spotify_adapter.serializers.player import RecentlyPlayedTracksSerializer
from spotify_adapter.serializers.spotify import LimitField
from spotify_adapter.utils import get_spotify_client
from spotify_auth.permissions import HasSpotifyToken


class PlayerRecentlyPlayedParamsSerializer(serializers.Serializer):
    limit = LimitField()
    after = serializers.IntegerField(
        default=None,
        help_text=_(
            'A Unix timestamp in milliseconds. '
            'Returns all items after (but not including) this cursor position. '
            'If after is specified, before must not be specified.'
        )
    )
    before = serializers.IntegerField(
        default=None,
        help_text=_(
            'A Unix timestamp in milliseconds. '
            'Returns all items before (but not including) this cursor position. '
            'If before is specified, after must not be specified.'
        )
    )

    def validate(self, attrs: dict) -> dict:
        after = attrs.get('after')
        before = attrs.get('before')

        if after is not None and before is not None:
            raise serializers.ValidationError("You can't specify both `after` and `before`")

        return attrs


class PlayerRecentlyPlayedView(APIView):
    """
    GET     /api/spotify/me/player/recently-played/

    Get tracks from the current user's recently played tracks.
    Note: Currently doesn't support podcast episodes.

    Reference:
    https://developer.spotify.com/documentation/web-api/reference/get-recently-played
    """
    permission_classes = [IsAuthenticated, HasSpotifyToken]

    @extend_schema(
        parameters=[PlayerRecentlyPlayedParamsSerializer],
        responses={status.HTTP_200_OK: RecentlyPlayedTracksSerializer}
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
