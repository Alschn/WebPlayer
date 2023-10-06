from typing import Any

from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from spotify_adapter.utils import get_spotify_client


class TrackDetailView(APIView):
    """
    GET     /api/spotify/tracks/<str:track_id>/

    Get Spotify catalog information for a single track identified by its unique Spotify ID.

    Reference:
    https://developer.spotify.com/documentation/web-api/reference/get-track
    """

    # todo: params, response serializer

    def get(self, request: Request, track_id: str, *args: Any, **kwargs: Any) -> Response:
        client = get_spotify_client(request.user)
        data = client.track(track_id)
        return Response(data, status=status.HTTP_200_OK)
