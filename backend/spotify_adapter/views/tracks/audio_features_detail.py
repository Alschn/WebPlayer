from typing import Any

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from spotify_adapter.serializers.audio_analysis import AudioFeatureSerializer
from spotify_adapter.utils import get_spotify_client
from spotify_auth.permissions import HasSpotifyToken


class AudioFeaturesDetailView(APIView):
    """
    GET    /api/spotify/audio-features/<str:track_id>/

    Get audio feature information for a single track identified by its unique Spotify ID.

    Reference:
    https://developer.spotify.com/documentation/web-api/reference/get-audio-features
    """
    permission_classes = [IsAuthenticated, HasSpotifyToken]
    serializer_class = AudioFeatureSerializer

    def get(self, request: Request, track_id: str, *args: Any, **kwargs: Any) -> Response:
        client = get_spotify_client(request.user)
        data = client.audio_features([track_id])
        return Response(data, status=status.HTTP_200_OK)
