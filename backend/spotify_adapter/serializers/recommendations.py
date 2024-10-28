from django.utils.translation import gettext_lazy as _
from rest_framework import serializers

from spotify_adapter.serializers.spotify import LimitField, MarketField
from spotify_adapter.serializers.tracks import TrackSerializer

GENERIC_MIN_PARAM_HELP_TEXT = _(
    "For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. "
    "See tunable track attributes below for the list of available options. "
    "For example, `min_tempo`=140 would restrict results to only those tracks "
    "with a tempo of greater than 140 beats per minute."
)
GENERIC_MAX_PARAM_HELP_TEXT = _(
    "For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. "
    "See tunable track attributes below for the list of available options. "
    "For example, `max_instrumentalness`=0.35 would filter out most tracks that are likely to be instrumental."
)
GENERIC_TARGET_PARAM_HELP_TEXT = _(
    "For each of the tunable track attributes (below) a target value may be provided. "
    "Tracks with the attribute values nearest to the target values will be preferred. "
    "For example, you might request `target_energy`=0.6 and `target_danceability`=0.8. "
    "All target values will be weighed equally in ranking results."
)


class NormalizedFloatField(serializers.FloatField):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.min_value = 0.0
        self.max_value = 1.0


class RecommendationsParamsSerializer(serializers.Serializer):
    limit = LimitField(max_value=100, default=20)
    market = MarketField(required=False)
    seed_artists = serializers.ListField(
        child=serializers.CharField(max_length=22),
        required=False,
        help_text=_(
            "A comma separated list of Spotify IDs for seed artists. "
            "Up to 5 seed values may be provided in any combination of "
            "`seed_artists`, `seed_genres` and `seed_tracks`. "
            "Note: only required if seed_genres and seed_tracks are not set."
        )
    ),
    seed_genres = serializers.ListField(
        child=serializers.CharField(max_length=20),
        required=False,
        help_text=_(
            "A comma separated list of any genres in the set of available genre seeds. "
            "Up to 5 seed values may be provided in any combination "
            "of `seed_artists`, `seed_genres` and `seed_tracks`. "
            "Note: only required if seed_artists and seed_tracks are not set."
        )
    ),
    seed_tracks = serializers.ListField(
        child=serializers.CharField(max_length=22),
        required=False,
        help_text=_(
            "A comma separated list of Spotify IDs for a seed track. "
            "Up to 5 seed values may be provided in any combination of "
            "`seed_artists`, `seed_genres` and `seed_tracks`. "
            "Note: only required if seed_artists and seed_genres are not set."
        )
    ),
    min_acousticness = NormalizedFloatField(
        required=False,
        help_text=GENERIC_MIN_PARAM_HELP_TEXT
    )
    max_acousticness = NormalizedFloatField(
        required=False,
        help_text=GENERIC_MAX_PARAM_HELP_TEXT
    )
    target_acousticness = NormalizedFloatField(
        required=False,
        help_text=GENERIC_TARGET_PARAM_HELP_TEXT
    )
    min_danceability = NormalizedFloatField(
        required=False,
        help_text=GENERIC_MIN_PARAM_HELP_TEXT
    )
    max_danceability = NormalizedFloatField(
        required=False,
        help_text=GENERIC_MAX_PARAM_HELP_TEXT
    )
    target_danceability = NormalizedFloatField(
        required=False,
        help_text=GENERIC_TARGET_PARAM_HELP_TEXT
    )
    min_duration_ms = serializers.IntegerField(
        required=False,
        min_value=1,
        help_text=GENERIC_MIN_PARAM_HELP_TEXT
    )
    max_duration_ms = serializers.IntegerField(
        required=False,
        min_value=1,
        help_text=GENERIC_MAX_PARAM_HELP_TEXT
    )
    target_duration_ms = serializers.IntegerField(
        required=False,
        min_value=1,
        help_text=_("Target duration of the track (ms)")
    )
    min_energy = serializers.FloatField(
        required=False,
        min_value=0,
        max_value=1,
        help_text=GENERIC_MIN_PARAM_HELP_TEXT
    )
    max_energy = serializers.FloatField(
        required=False,
        min_value=0,
        max_value=1,
        help_text=GENERIC_MAX_PARAM_HELP_TEXT
    )
    target_energy = serializers.FloatField(
        required=False,
        min_value=0,
        max_value=1,
        help_text=GENERIC_TARGET_PARAM_HELP_TEXT
    )
    min_instrumentalness = NormalizedFloatField(
        required=False,
        help_text=GENERIC_MIN_PARAM_HELP_TEXT
    )
    max_instrumentalness = NormalizedFloatField(
        required=False,
        help_text=GENERIC_MAX_PARAM_HELP_TEXT
    )
    target_instrumentalness = NormalizedFloatField(
        required=False,
        help_text=GENERIC_TARGET_PARAM_HELP_TEXT
    )
    min_key = serializers.IntegerField(
        required=False,
        min_value=0,
        max_value=11,
        help_text=GENERIC_MIN_PARAM_HELP_TEXT
    )
    max_key = serializers.IntegerField(
        required=False,
        min_value=0,
        max_value=11,
        help_text=GENERIC_MAX_PARAM_HELP_TEXT
    )
    target_key = serializers.IntegerField(
        required=False,
        min_value=0,
        max_value=11,
        help_text=GENERIC_TARGET_PARAM_HELP_TEXT
    )
    min_liveness = serializers.FloatField(
        required=False,
        help_text=GENERIC_MIN_PARAM_HELP_TEXT
    )
    max_liveness = serializers.FloatField(
        required=False,
        help_text=GENERIC_MAX_PARAM_HELP_TEXT
    )
    target_liveness = serializers.FloatField(
        required=False,
        help_text=GENERIC_TARGET_PARAM_HELP_TEXT
    )
    min_loudness = serializers.FloatField(
        required=False,
        help_text=GENERIC_MIN_PARAM_HELP_TEXT
    )
    max_loudness = serializers.FloatField(
        required=False,
        help_text=GENERIC_MAX_PARAM_HELP_TEXT
    )
    target_loudness = serializers.FloatField(
        required=False,
        help_text=GENERIC_TARGET_PARAM_HELP_TEXT
    )
    min_mode = serializers.IntegerField(
        required=False,
        min_value=0,
        max_value=1,
        help_text=GENERIC_MIN_PARAM_HELP_TEXT
    )
    max_mode = serializers.IntegerField(
        required=False,
        min_value=0,
        max_value=1,
        help_text=GENERIC_MAX_PARAM_HELP_TEXT
    )
    target_mode = serializers.IntegerField(
        required=False,
        min_value=0,
        max_value=1,
        help_text=GENERIC_TARGET_PARAM_HELP_TEXT
    )
    min_popularity = serializers.IntegerField(
        required=False,
        min_value=0,
        max_value=100,
        help_text=GENERIC_MIN_PARAM_HELP_TEXT
    )
    max_popularity = serializers.IntegerField(
        required=False,
        min_value=0,
        max_value=100,
        help_text=GENERIC_MAX_PARAM_HELP_TEXT
    )
    target_popularity = serializers.IntegerField(
        required=False,
        min_value=0,
        max_value=100,
        help_text=GENERIC_TARGET_PARAM_HELP_TEXT
    )
    min_speechiness = NormalizedFloatField(
        required=False,
        help_text=GENERIC_MIN_PARAM_HELP_TEXT
    )
    max_speechiness = serializers.FloatField(
        required=False,
        help_text=GENERIC_MAX_PARAM_HELP_TEXT
    )
    target_speechiness = NormalizedFloatField(
        required=False,
        help_text=GENERIC_TARGET_PARAM_HELP_TEXT
    )
    min_tempo = serializers.IntegerField(
        required=False,
        min_value=1,
        help_text=GENERIC_MIN_PARAM_HELP_TEXT
    )
    max_tempo = serializers.IntegerField(
        required=False,
        min_value=1,
        help_text=GENERIC_MAX_PARAM_HELP_TEXT
    )
    target_tempo = serializers.IntegerField(
        required=False,
        min_value=1,
        help_text=_("Target tempo (BPM)")
    )
    min_time_signature = serializers.IntegerField(
        required=False,
        min_value=0,
        max_value=5,
        help_text=GENERIC_MIN_PARAM_HELP_TEXT
    )
    max_time_signature = serializers.IntegerField(
        required=False,
        min_value=0,
        max_value=5,
        help_text=GENERIC_MAX_PARAM_HELP_TEXT
    )
    target_time_signature = serializers.IntegerField(
        required=False,
        min_value=0,
        max_value=5,
        help_text=GENERIC_TARGET_PARAM_HELP_TEXT
    )
    min_valence = NormalizedFloatField(
        required=False,
        help_text=GENERIC_MIN_PARAM_HELP_TEXT
    )
    max_valence = NormalizedFloatField(
        required=False,
        help_text=GENERIC_MAX_PARAM_HELP_TEXT
    )
    target_valence = NormalizedFloatField(
        required=False,
        help_text=GENERIC_TARGET_PARAM_HELP_TEXT
    )

    def validate(self, attrs: dict) -> dict:
        seed_artists = attrs.get("seed_artists")
        seed_genres = attrs.get("seed_genres")
        seed_tracks = attrs.get("seed_tracks")

        if not any([seed_artists, seed_genres, seed_tracks]):
            message = _("At least one of `seed_artists`, `seed_genres`, `seed_tracks` is required")
            raise serializers.ValidationError(
                {key: message for key in ("seed_artists", "seed_genres", "seed_tracks")}
            )

        return attrs


class RecommendationSeedSerializer(serializers.Serializer):
    afterFilteringSize = serializers.IntegerField(min_value=0)
    afterRelinkingSize = serializers.IntegerField(min_value=0)
    href = serializers.URLField()
    id = serializers.CharField()
    initialPoolSize = serializers.IntegerField(min_value=0)
    type = serializers.ChoiceField(choices={"artist", "track", "genre"})


class RecommendationsSerializer(serializers.Serializer):
    seeds = RecommendationSeedSerializer(many=True)
    tracks = TrackSerializer(many=True)
