from typing import Any

from rest_framework import status, serializers
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from spotify_adapter.utils import get_spotify_client
from spotify_auth.permissions import HasSpotifyToken


class GetPlaylistSerializer(serializers.Serializer):
    market = serializers.CharField(required=False)
    fields = serializers.CharField(required=False)
    # additional_types = serializers.CharField(required=False)


class PlaylistCreateSerializer(serializers.Serializer):
    pass


class GetPlaylistView(APIView):
    """
    GET     /api/spotify/playlists/<str:playlist_id>/       - Get a Playlist
    POST    /api/spotify/playlists/<str:playlist_id>/       - Add Items to a playlist
    PATCH   /api/spotify/playlists/<str:playlist_id>/       - Change a Playlist's Details
    """

    permission_classes = [IsAuthenticated, HasSpotifyToken]

    def get(self, request: Request, playlist_id: str, *args: Any, **kwargs: Any) -> Response:
        serializer = GetPlaylistSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)

        client = get_spotify_client(request.user)
        data = client.playlist(
            playlist_id=playlist_id,
            fields=serializer.validated_data.get('fields'),
            market=serializer.validated_data.get('market'),
        )
        return Response(data, status=status.HTTP_200_OK)

    def post(self, request: Request, playlist_id: str, *args: Any, **kwargs: Any) -> Response:
        """Add Items to a playlist"""

        return Response({}, status=status.HTTP_201_CREATED)

    def patch(self, request: Request, playlist_id: str, *args: Any, **kwargs: Any) -> Response:
        pass
