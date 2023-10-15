from typing import Any

from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from spotify_adapter.utils import get_spotify_client


class AudioAnalysisDetailView(APIView):
    """
    GET     /api/spotify/audio-analysis/<str:track_id>/

    Get a low-level audio analysis for a track in the Spotify catalog.
    The audio analysis describes the track’s structure and musical content, including rhythm, pitch, and timbre.

    Reference:
    https://developer.spotify.com/documentation/web-api/reference/get-audio-analysis
    """

    def get(self, request: Request, track_id: str, *args: Any, **kwargs: Any) -> Response:
        client = get_spotify_client(request.user)
        data = client.audio_analysis(track_id)
        return Response(data, status=status.HTTP_200_OK)
