from typing import Any

from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from spotify_adapter.serializers.recommendations import (
    RecommendationsParamsSerializer,
    RecommendationsSerializer
)
from spotify_adapter.utils import get_spotify_client
from spotify_auth.permissions import HasSpotifyToken


class RecommendationsView(APIView):
    """
    GET     /api/spotify/recommendations/

    Recommendations are generated based on the available information for a given seed entity
    and matched against similar artists and tracks. If there is sufficient information about the provided seeds,
    a list of tracks will be returned together with pool size details.

    For artists and tracks that are very new or obscure there might not be enough data to generate a list of tracks.

    Reference:
    https://developer.spotify.com/documentation/web-api/reference/get-recommendations
    """
    permission_classes = [IsAuthenticated, HasSpotifyToken]

    @extend_schema(
        parameters=[RecommendationsParamsSerializer],
        responses={status.HTTP_200_OK: RecommendationsSerializer}
    )
    def get(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        serializer = RecommendationsParamsSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)

        validated_data = serializer.validated_data
        country = validated_data.pop("market", None)

        client = get_spotify_client(request.user)
        data = client.recommendations(
            country=country,
            **validated_data
        )
        return Response(data, status=status.HTTP_200_OK)
