from typing import Any

from drf_spectacular.utils import extend_schema
from rest_framework import serializers, status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from spotify_adapter.utils import get_spotify_client


class RecommendationsParamsSerializer(serializers.Serializer):
    limit = serializers.IntegerField(min_value=1, max_value=100, default=20)
    market = serializers.CharField(max_length=2, required=False)
    seed_artists = serializers.ListField(
        child=serializers.CharField(max_length=22), required=False
    ),
    seed_genres = serializers.ListField(
        child=serializers.CharField(max_length=20), required=False
    ),
    seed_tracks = serializers.ListField(
        child=serializers.CharField(max_length=22), required=False
    ),
    min_acousticness = serializers.FloatField(required=False)
    max_acousticness = serializers.FloatField(required=False)
    target_acousticness = serializers.FloatField(required=False)
    min_danceability = serializers.FloatField(required=False)
    max_danceability = serializers.FloatField(required=False)
    target_danceability = serializers.FloatField(required=False)
    min_duration_ms = serializers.IntegerField(required=False)
    max_duration_ms = serializers.IntegerField(required=False)
    target_duration_ms = serializers.IntegerField(required=False)
    min_energy = serializers.FloatField(required=False)
    max_energy = serializers.FloatField(required=False)
    target_energy = serializers.FloatField(required=False)
    min_instrumentalness = serializers.FloatField(required=False)
    max_instrumentalness = serializers.FloatField(required=False)
    target_instrumentalness = serializers.FloatField(required=False)
    min_key = serializers.IntegerField(required=False, min_value=0, max_value=11)
    max_key = serializers.IntegerField(required=False, min_value=0, max_value=11)
    target_key = serializers.IntegerField(required=False, min_value=0, max_value=11)
    min_liveness = serializers.FloatField(required=False)
    max_liveness = serializers.FloatField(required=False)
    target_liveness = serializers.FloatField(required=False)
    min_loudness = serializers.FloatField(required=False)
    max_loudness = serializers.FloatField(required=False)
    target_loudness = serializers.FloatField(required=False)
    min_mode = serializers.IntegerField(required=False, min_value=0, max_value=1)
    max_mode = serializers.IntegerField(required=False, min_value=0, max_value=1)
    target_mode = serializers.IntegerField(required=False, min_value=0, max_value=1)
    min_popularity = serializers.IntegerField(required=False, min_value=0, max_value=100)
    max_popularity = serializers.IntegerField(required=False, min_value=0, max_value=100)
    target_popularity = serializers.IntegerField(required=False, min_value=0, max_value=100)
    min_speechiness = serializers.FloatField(required=False)
    max_speechiness = serializers.FloatField(required=False)
    target_speechiness = serializers.FloatField(required=False)
    min_tempo = serializers.FloatField(required=False)
    max_tempo = serializers.FloatField(required=False)
    target_tempo = serializers.FloatField(required=False)
    min_time_signature = serializers.IntegerField(required=False, min_value=0, max_value=5)
    max_time_signature = serializers.IntegerField(required=False, min_value=0, max_value=5)
    target_time_signature = serializers.IntegerField(required=False, min_value=0, max_value=5)
    min_valence = serializers.FloatField(required=False, min_value=0, max_value=1)
    max_valence = serializers.FloatField(required=False, min_value=0, max_value=1)
    target_valence = serializers.FloatField(required=False, min_value=0, max_value=1)


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

    @extend_schema(
        parameters=[RecommendationsParamsSerializer],
        # todo: response serializer
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
