from typing import Any

from drf_spectacular.utils import extend_schema
from rest_framework import serializers, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from spotify_adapter.utils import get_spotify_client
from spotify_auth.permissions import HasSpotifyToken


class MeTracksContainsParamsSerializer(serializers.Serializer):
    ids = serializers.ListField(
        child=serializers.CharField(max_length=22),
        max_length=50,
        allow_empty=False,
    )


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
        # todo: response serializer
    )
    def get(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        serializer = MeTracksContainsParamsSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)

        tracks_ids = serializer.validated_data['ids']

        client = get_spotify_client(request.user)
        data = client.current_user_saved_tracks_contains(tracks_ids)
        return Response(data, status=status.HTTP_200_OK)
