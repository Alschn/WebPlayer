from django.utils.translation import gettext_lazy as _
from rest_framework import serializers


class AudioFeatureSerializer(serializers.Serializer):
    acousticness = serializers.FloatField(
        min_value=0.0,
        max_value=1.0,
        help_text=_(
            'A confidence measure from 0.0 to 1.0 of whether the track is acoustic. '
            '1.0 represents high confidence the track is acoustic.'
        ),
    )
    analysis_url = serializers.URLField(
        help_text=_(
            'A URL to access the full audio analysis of this track. '
            'An access token is required to access this data. '
            'Example: "https://api.spotify.com/v1/audio-analysis/2takcwOaAZWiXQijPHIx7B"'
        ),
    )
    danceability = serializers.FloatField(
        min_value=0.0,
        max_value=1.0,
        help_text=_(
            'Danceability describes how suitable a track is for dancing based on a combination of musical elements '
            'including tempo, rhythm stability, beat strength, and overall regularity. '
            'A value of 0.0 is least danceable and 1.0 is most danceable.'
        ),
    )
    duration_ms = serializers.IntegerField(
        min_value=0,
        help_text=_(
            'The duration of the track in milliseconds.'
        ),
    )
    energy = serializers.FloatField(
        min_value=0.0,
        max_value=1.0,
        help_text=_(
            'Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. '
            'Typically, energetic tracks feel fast, loud, and noisy. '
            'For example, death metal has high energy, while a Bach prelude scores low on the scale. '
            'Perceptual features contributing to this attribute include dynamic range, perceived loudness, '
            'timbre, onset rate, and general entropy.'
        )
    )
    id = serializers.CharField(
        help_text=_(
            'The Spotify ID for the track.'
        )
    )
    instrumentalness = serializers.FloatField(
        min_value=0.0,
        max_value=1.0,
        help_text=_(
            'Predicts whether a track contains no vocals. '
            'The closer the instrumentalness value is to 1.0, '
            'the greater likelihood the track contains no vocal content. '
            'Values above 0.5 are intended to represent instrumental tracks, '
            'but confidence is higher as the value approaches 1.0.'
        )
    )
    key = serializers.IntegerField(
        min_value=-1,
        max_value=11,
        help_text=_(
            'The key the track is in. '
            'Integers map to pitches using standard Pitch Class notation. '
            'E.g. 0 = C, 1 = C♯/D♭, 2 = D, and so on.'
        )
    )
    liveness = serializers.FloatField(
        min_value=0.0,
        max_value=1.0,
        help_text=_(
            'Detects the presence of an audience in the recording. '
            'Higher liveness values represent an increased probability that the track was performed live. '
            'A value above 0.8 provides strong likelihood that the track is live.'
        )
    )
    loudness = serializers.FloatField(
        help_text=_(
            'The overall loudness of a track in decibels (dB). '
            'Loudness values are averaged across the entire track and '
            'are useful for comparing relative loudness of tracks. '
            'Loudness is the quality of a sound that is the primary '
            'psychological correlate of physical strength (amplitude). '
            'Values typical range between -60 and 0 db.'
        )
    )
    mode = serializers.IntegerField(
        min_value=0,
        max_value=1,
        help_text=_(
            'Mode indicates the modality (major or minor) of a track, '
            'the type of scale from which its melodic content is derived. '
            'Major is represented by 1 and minor is 0.'
        )
    )
    speechiness = serializers.FloatField(
        min_value=0.0,
        max_value=1.0,
        help_text=_(
            'Speechiness detects the presence of spoken words in a track. '
            'The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), '
            'the closer to 1.0 the attribute value. '
            'Values above 0.66 describe tracks that are probably made entirely of spoken words, '
            'values between 0.33 and 0.66 describe tracks that may contain both music and speech, '
            'and values below 0.33 most likely represent music and other non-speech-like tracks.'
        )
    )
    tempo = serializers.FloatField(
        help_text=_(
            'The overall estimated tempo of a track in beats per minute (BPM). '
            'In musical terminology, tempo is the speed or pace of a given piece '
            'and derives directly from the average beat duration.'
        )
    )
    time_signature = serializers.IntegerField(
        min_value=3,
        max_value=7,
        help_text=_(
            'An estimated time signature. The time signature (meter) is a notational convention '
            'to specify how many beats are in each bar (or measure). '
            'The time signature ranges from 3 to 7 indicating time signatures of "3/4", to "7/4".'
        )
    )
    track_href = serializers.URLField(
        help_text=_(
            'A link to the Web API endpoint providing full details of the track.'
        )
    )
    type = serializers.CharField(
        default='audio_features',
        help_text=_('The object type: "audio_features"')
    )
    uri = serializers.CharField(
        help_text=_(
            'The Spotify URI for the track.'
        )
    )
    valance = serializers.FloatField(
        min_value=0.0,
        max_value=1.0,
        help_text=_(
            'A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. '
            'Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), '
            'while tracks with low valence sound more negative (e.g. sad, depressed, angry).'
        )
    )


class AudioFeaturesSerializer(serializers.Serializer):
    audio_features = AudioFeatureSerializer(
        help_text=_('A set of audio features'),
        many=True
    )
