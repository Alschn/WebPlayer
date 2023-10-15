from typing import Any

from drf_spectacular.utils import extend_schema
from rest_framework import status, serializers
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from spotify_adapter.utils import get_spotify_client
from spotify_auth.permissions import HasSpotifyToken


class AudioFeaturesParamsSerializers(serializers.Serializer):
    ids = serializers.ListField(
        child=serializers.CharField(max_length=22),
        allow_empty=False,
        max_length=100,
        help_text=(
            "A comma-separated list of the Spotify IDs for the tracks. "
            "Maximum: 100 IDs."
        )
    )


class AudioFeaturesView(APIView):
    """
    GET    /api/spotify/audio-features/

    Get audio feature information for a single track identified by its unique Spotify ID.

    Reference:
    https://developer.spotify.com/documentation/web-api/reference/get-audio-features
    """
    permission_classes = [IsAuthenticated, HasSpotifyToken]

    @extend_schema(
        parameters=[AudioFeaturesParamsSerializers],
        # todo: add response serializer
    )
    def get(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        serializer = AudioFeaturesParamsSerializers(data=request.query_params)
        serializer.is_valid(raise_exception=True)

        tracks_ids = serializer.validated_data['ids']

        client = get_spotify_client(request.user)
        data = client.audio_features(tracks_ids)
        return Response(data, status=status.HTTP_200_OK)
