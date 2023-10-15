from typing import Any

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from spotify_adapter.utils import get_spotify_client
from spotify_auth.permissions import HasSpotifyToken


class PlaylistsDetailImagesView(APIView):
    """
    GET     /api/spotify/playlists/<str:playlist_id>/images/

    Get the current image associated with a specific playlist.

    PUT     /api/spotify/playlists/<str:playlist_id>/images/

    Replace the image used to represent a specific playlist.

    Reference:
    https://developer.spotify.com/documentation/web-api/reference/get-playlist-cover

    https://developer.spotify.com/documentation/web-api/reference/upload-custom-playlist-cover
    """
    permission_classes = [IsAuthenticated, HasSpotifyToken]

    # todo: response, request serializers

    def get(self, request: Request, playlist_id: str, *args: Any, **kwargs: Any) -> Response:
        client = get_spotify_client(request.user)
        data = client.playlist_cover_image(playlist_id=playlist_id)
        return Response(data, status=status.HTTP_200_OK)

    def put(self, request: Request, playlist_id: str, *args: Any, **kwargs: Any) -> Response:
        client = get_spotify_client(request.user)
        data = client.playlist_upload_cover_image(
            playlist_id=playlist_id,
            image_b64=request.data
        )
        return Response(data, status=status.HTTP_202_ACCEPTED)
