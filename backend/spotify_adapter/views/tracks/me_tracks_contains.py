from typing import Any

from django.utils.translation import gettext_lazy as _
from drf_spectacular.utils import extend_schema
from rest_framework import serializers, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from spotify_adapter.serializers.spotify import TrackIdsField
from spotify_adapter.utils import get_spotify_client
from spotify_auth.permissions import HasSpotifyToken


class MeTracksContainsParamsSerializer(serializers.Serializer):
    ids = TrackIdsField()


class MeTracksContainsResponseSerializer(serializers.ListSerializer):
    def __init__(self, *args, **kwargs):
        kwargs['child'] = serializers.BooleanField()
        kwargs['max_length'] = 20
        kwargs['help_text'] = _('Array of boolean')
        super().__init__(*args, **kwargs)


class MeTracksContainsView(APIView):
    """
    GET    /api/spotify/me/tracks/contains/

    Check if one or more tracks is already saved in the current Spotify user's 'Your Music' library.

    Reference:
    https://developer.spotify.com/documentation/web-api/reference/check-users-saved-tracks
    """
    permission_classes = [IsAuthenticated, HasSpotifyToken]

    @extend_schema(
        parameters=[MeTracksContainsParamsSerializer],
        responses={status.HTTP_200_OK: MeTracksContainsResponseSerializer}
    )
    def get(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        serializer = MeTracksContainsParamsSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)

        tracks_ids = serializer.validated_data['ids']

        client = get_spotify_client(request.user)
        data = client.current_user_saved_tracks_contains(tracks_ids)
        return Response(data, status=status.HTTP_200_OK)
