from typing import Any

from drf_spectacular.utils import extend_schema
from rest_framework import status, serializers
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from spotify_adapter.serializers.spotify import OffsetField, MarketField, LimitField, TrackIdsField
from spotify_adapter.serializers.tracks import TracksPageSerializer
from spotify_adapter.utils import get_spotify_client
from spotify_auth.permissions import HasSpotifyToken


class CurrentUserSavedTracksParamsSerializer(serializers.Serializer):
    limit = LimitField()
    offset = OffsetField()
    market = MarketField(required=False)


class CurrentUserSavedTracksAddDataSerializer(serializers.Serializer):
    ids = TrackIdsField(max_length=50)


class CurrentUserSavedTracksDeleteDataSerializer(serializers.Serializer):
    ids = TrackIdsField(max_length=50)


class CurrentUserSavedTracksView(APIView):
    """
    GET     /api/spotify/me/tracks/

    Get a list of the songs saved in the current Spotify user's 'Your Music' library.

    PUT     /api/spotify/me/tracks/

    Save one or more tracks to the current Spotify user's 'Your Music' library.

    DELETE  /api/spotify/me/tracks/

    Remove one or more tracks from the current Spotify user's 'Your Music' library.

    Reference:
    https://developer.spotify.com/documentation/web-api/reference/get-users-saved-tracks

    https://developer.spotify.com/documentation/web-api/reference/save-tracks-user

    https://developer.spotify.com/documentation/web-api/reference/remove-tracks-user
    """
    permission_classes = [IsAuthenticated, HasSpotifyToken]

    @extend_schema(
        parameters=[CurrentUserSavedTracksParamsSerializer],
        responses={status.HTTP_200_OK: TracksPageSerializer}
    )
    def get(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        serializer = CurrentUserSavedTracksParamsSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)

        offset = serializer.validated_data.get('offset')
        limit = serializer.validated_data.get('limit')
        market = serializer.validated_data.get('market')

        client = get_spotify_client(request.user)
        data = client.current_user_saved_tracks(limit=limit, offset=offset, market=market)
        return Response(data, status=status.HTTP_200_OK)

    @extend_schema(
        request=CurrentUserSavedTracksAddDataSerializer,
        responses={status.HTTP_200_OK: None}
    )
    def put(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        serializer = CurrentUserSavedTracksAddDataSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        ids = serializer.validated_data['ids']

        client = get_spotify_client(request.user)
        client.current_user_saved_tracks_add(tracks=ids)
        return Response({}, status=status.HTTP_200_OK)

    @extend_schema(
        request=CurrentUserSavedTracksDeleteDataSerializer,
        responses={status.HTTP_200_OK: None}
    )
    def delete(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        serializer = CurrentUserSavedTracksDeleteDataSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        ids = serializer.validated_data['ids']

        client = get_spotify_client(request.user)
        client.current_user_saved_tracks_delete(tracks=ids)
        return Response({}, status=status.HTTP_200_OK)
