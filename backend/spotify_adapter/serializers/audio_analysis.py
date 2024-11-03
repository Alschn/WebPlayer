from django.utils.translation import gettext_lazy as _
from rest_framework import serializers

from spotify_adapter.serializers.spotify import NormalizedFloatField


class AnalyzerMetaSerializer(serializers.Serializer):
    analyzer_version = serializers.CharField(
        help_text=_(
            'The analyzer version that analyzed the track.'
        )
    )
    platform = serializers.CharField(
        help_text=_(
            'The platform the analyzer ran on.'
        )
    )
    detailed_status = serializers.CharField(
        help_text=_(
            'A detailed status code for this track. '
            'If analysis data is missing, this code may explain why'
        )
    )
    status_code = serializers.ChoiceField(
        choices=[(0, 'success'), (1, 'error')],
        help_text=_(
            'The return code of the analyzer process. '
            '0 if successful, 1 if any errors occurred.'
        )
    )
    timestamp = serializers.IntegerField(
        help_text=_(
            'The Unix timestamp (in seconds) at which this track was analyzed.'
        )
    )
    analysis_time = serializers.FloatField(
        help_text=_(
            'The Unix timestamp (in seconds) at which this track was analyzed.'
        )
    )
    input_process = serializers.CharField(
        help_text=_(
            'The method used to read the track\'s audio data. '
            'Example: "libvorbisfile L+R 44100->22050"'
        )
    )


class TrackAnalysisSerializer(serializers.Serializer):
    num_samples = serializers.IntegerField(
        help_text=_(
            "The exact number of audio samples analyzed from this track. "
            "See also `analysis_sample_rate`."
        )
    )
    duration = serializers.FloatField(
        help_text=_("The duration of the track in seconds.")
    )
    sample_md5 = serializers.CharField(
        help_text=_("This field will always contain the empty string.")
    )
    offset_seconds = serializers.IntegerField(
        help_text=_(
            "An offset to the start of the region of the track that was analyzed. "
            "(As the entire track is analyzed, this should always be 0.)"
        )
    )
    window_seconds = serializers.IntegerField(
        help_text=_(
            "The sample rate used to decode and analyze this track. "
            "May differ from the actual sample rate of this track available on Spotify."
        )
    )
    analysis_sample_rate = serializers.IntegerField(
        help_text=_(
            "The sample rate used to decode and analyze this track. "
            "May differ from the actual sample rate of this track available on Spotify."
        )
    )
    analysis_channels = serializers.IntegerField(
        help_text=_(
            "The number of channels used for analysis. "
            "If 1, all channels are summed together to mono before analysis."
        )
    )
    end_of_fade_in = serializers.FloatField(
        help_text=_(
            "The time, in seconds, at which the track's fade-in period ends. "
            "If the track has no fade-in, this will be 0.0."
        )
    )
    start_of_fade_out = serializers.FloatField(
        help_text=_(
            "The time, in seconds, at which the track's fade-out period starts. "
            "If the track has no fade-out, this should match the track's length."
        )
    )
    loudness = serializers.FloatField(
        help_text=_(
            "The overall loudness of the section in decibels (dB). "
            "Loudness values are useful for comparing relative loudness "
            "of sections within tracks."
        )
    )
    tempo = serializers.FloatField(
        help_text=_(
            "The overall estimated tempo of the section in beats per minute (BPM). "
            "In musical terminology, tempo is the speed or pace of a given piece and "
            "derives directly from the average beat duration."
        )
    )
    tempo_confidence = NormalizedFloatField(
        help_text=_(
            "The confidence, from 0.0 to 1.0, of the reliability of the `tempo`."
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
    time_signature_confidence = NormalizedFloatField(
        help_text=_(
            "The confidence, from 0.0 to 1.0, of the reliability of the `time_signature`."
        )
    )
    key = serializers.IntegerField(
        min_value=-1,
        max_value=11,
        help_text=_(
            "The key the track is in. "
            "Integers map to pitches using standard Pitch Class notation. "
            "E.g. 0 = C, 1 = C♯/D♭, 2 = D, and so on. "
            "If no key was detected, the value is -1."
        )
    )
    key_confidence = serializers.FloatField(
        help_text=_(
            "The confidence, from 0.0 to 1.0, of the reliability of the `key`."
        )
    )
    mode = serializers.ChoiceField(
        choices={(0, 'minor'), (1, 'major')},
        help_text=_(
            "Mode indicates the modality (major or minor) of a track, "
            "the type of scale from which its melodic content is derived. "
            "Major is represented by 1 and minor is 0."
        )
    )
    mode_confidence = NormalizedFloatField(
        help_text=_(
            "The confidence, from 0.0 to 1.0, of the reliability of the `mode`."
        )
    )
    codestring = serializers.CharField(
        help_text=_(
            "An [Echo Nest Musical Fingerprint (ENMFP)](https://academiccommons.columbia.edu/doi/10.7916/D8Q248M4) "
            "codestring for this track."
        )
    )
    code_version = serializers.FloatField(
        help_text=_(
            "A version number for the Echo Nest Musical Fingerprint format used in the codestring field. "
            "Example: 3.15"
        )
    )
    echoprintstring = serializers.CharField(
        help_text=_(
            "An [EchoPrint](https://github.com/spotify/echoprint-codegen) "
            "string for this track."
        )
    )
    echoprint_version = serializers.FloatField(
        help_text=_(
            "A version number for the Echo Nest echoprint format used in the echoprintstring field. "
            "Example: 4.15"
        )
    )
    synchstring = serializers.CharField(
        help_text=_(
            "A [Synchstring](https://github.com/echonest/synchdata) for this track."
        )
    )
    synch_version = serializers.FloatField(
        help_text=_(
            "A version number for the Synchstring used in the synchstring field. "
            "Example: 1"
        )
    )
    rhythmstring = serializers.CharField(
        help_text=_(
            "A Rhythmstring for this track. "
            "The format of this string is similar to the Synchstring."
        )
    )
    rhythm_version = serializers.FloatField(
        help_text=_(
            "A version number for the Rhythmstring used in the rhythmstring field. "
            "Example: 1"
        )
    )


class IntervalAnalysisSerializer(serializers.Serializer):
    start = serializers.FloatField(
        min_value=0.0,
        help_text=_("The starting point (in seconds) of the time interval.")
    )
    duration = serializers.FloatField(
        min_value=0.0,
        help_text=_("The duration (in seconds) of the time interval.")
    )
    confidence = NormalizedFloatField(
        help_text=_(
            "The confidence, from 0.0 to 1.0, of the reliability of the interval."
        )
    )


class BarSerializer(IntervalAnalysisSerializer):
    pass


class BeatSerializer(IntervalAnalysisSerializer):
    pass


class TatumSerializer(IntervalAnalysisSerializer):
    pass


class SectionSerializer(IntervalAnalysisSerializer):
    loudness = serializers.FloatField(
        help_text=_(
            "The overall loudness of the section in decibels (dB). "
            "Loudness values are useful for comparing relative loudness "
            "of sections within tracks."
        )
    )
    tempo = serializers.FloatField(
        help_text=_(
            "The overall estimated tempo of the section in beats per minute (BPM). "
            "In musical terminology, tempo is the speed or pace of a given piece and "
            "derives directly from the average beat duration."
        )
    )
    tempo_confidence = NormalizedFloatField(
        help_text=_(
            "The confidence, from 0.0 to 1.0, of the reliability of the `tempo`."
        )
    )
    key = serializers.IntegerField(
        min_value=-1,
        max_value=11,
        help_text=_(
            "The key the track is in. "
            "Integers map to pitches using standard Pitch Class notation. "
            "E.g. 0 = C, 1 = C♯/D♭, 2 = D, and so on. "
            "If no key was detected, the value is -1."
        )
    )
    key_confidence = NormalizedFloatField(
        help_text=_(
            "The confidence, from 0.0 to 1.0, of the reliability of the `key`."
        )
    )
    mode = serializers.ChoiceField(
        choices={(0, 'minor'), (1, 'major'), (-1, 'no result')},
        help_text=_(
            "Mode indicates the modality (major or minor) of a track, "
            "the type of scale from which its melodic content is derived. "
            "Major is represented by 1 and minor is 0."
        )
    )
    mode_confidence = NormalizedFloatField(
        help_text=_(
            "The confidence, from 0.0 to 1.0, of the reliability of the `mode`."
        )
    )
    time_signature = serializers.IntegerField(
        min_value=3,
        max_value=7,
        help_text=_(
            "An estimated time signature. "
            "The time signature (meter) is a notational convention to specify "
            "how many beats are in each bar (or measure). "
            "The time signature ranges from 3 to 7 indicating time signatures of `3/4`, to `7/4`."
        )
    )
    time_signature_confidence = NormalizedFloatField(
        help_text=_(
            "The confidence, from 0.0 to 1.0, of the reliability of the `time_signature`."
        )
    )


class SegmentSerializer(IntervalAnalysisSerializer):
    loudness_start = serializers.FloatField(
        help_text=_(
            "The onset loudness of the segment in decibels (dB). "
            "Combined with `loudness_max` and `loudness_max_time`, "
            "these components can be used to describe the 'attack' of the segment."
        )
    )
    loudness_max = serializers.FloatField(
        help_text=_(
            "The peak loudness of the segment in decibels (dB). "
            "Combined with `loudness_start` and `loudness_max_time`, "
            "these components can be used to describe the 'attack' of the segment."
        )
    )
    loudness_max_time = serializers.FloatField(
        help_text=_(
            "The segment-relative offset of the segment peak loudness in seconds. "
            "Combined with `loudness_start` and `loudness_max`, "
            "these components can be used to describe the 'attack' of the segment."
        )
    )
    loudness_end = serializers.FloatField(
        help_text=_(
            "The offset loudness of the segment in decibels (dB). "
            "This value should be equivalent to the `loudness_start` of the following segment."
        )
    )
    pitches = serializers.ListField(
        child=serializers.FloatField(),
        help_text=_(
            "Pitch content is given by a “chroma” vector, "
            "corresponding to the 12 pitch classes C, C#, D to B, "
            "with values ranging from 0 to 1 that describe the relative "
            "dominance of every pitch in the chromatic scale. "
            "For example a C Major chord would likely be represented "
            "by large values of C, E and G (i.e. classes 0, 4, and 7).\n"
            "Vectors are normalized to 1 by their strongest dimension, "
            "therefore noisy sounds are likely represented by values that are all close to 1, "
            "while pure tones are described by one value at 1 (the pitch) and others near 0. "
            "As can be seen below, the 12 vector indices are a combination of low-power "
            "spectrum values at their respective pitch frequencies.\n"
            "![Pitch vector image](https://developer.spotify.com/assets/audio/Pitch_vector.png)"
        )
    )
    timbre = serializers.ListField(
        child=serializers.FloatField(),
        help_text=_(
            "Timbre is the quality of a musical note or sound that distinguishes "
            "different types of musical instruments, or voices. "
            "It is a complex notion also referred to as sound color, texture, or tone quality, "
            "and is derived from the shape of a segment’s spectro-temporal surface, "
            "independently of pitch and loudness. The timbre feature is a vector "
            "that includes 12 unbounded values roughly centered around 0. "
            "Those values are high level abstractions of the spectral surface, ordered by degree of importance.\n"
            "For completeness however, the first dimension represents the average loudness of the segment; "
            "second emphasizes brightness; third is more closely correlated to the flatness of a sound; "
            "fourth to sounds with a stronger attack; etc. "
            "See an image below representing the 12 basis functions (i.e. template segments).\n"
            "![Timbre vector image](https://developer.spotify.com/assets/audio/Timbre_basis_functions.png)"
            "The actual timbre of the segment is best described as a linear combination of these 12 basis "
            "functions weighted by the coefficient values: timbre = c1 x b1 + c2 x b2 + ... + c12 x b12, "
            "where c1 to c12 represent the 12 coefficients and b1 to b12 the 12 basis functions as displayed below. "
            "Timbre vectors are best used in comparison with each other."
        )
    )


class AudioAnalysisSerializer(serializers.Serializer):
    meta = AnalyzerMetaSerializer()
    track = TrackAnalysisSerializer()
    bars = serializers.ListField(
        child=BarSerializer(),
        help_text=_(
            "The time intervals of the bars throughout the track. "
            "A bar (or measure) is a segment of time defined "
            "as a given number of beats."
        )
    )
    beats = serializers.ListField(
        child=BeatSerializer(),
        help_text=_(
            "The time intervals of beats throughout the track. "
            "A beat is the basic time unit of a piece of music; "
            "for example, each tick of a metronome. "
            "Beats are typically multiples of tatums."
        )
    )
    sections = serializers.ListField(
        child=SectionSerializer(),
        help_text=_(
            "Sections are defined by large variations in rhythm or timbre, "
            "e.g. chorus, verse, bridge, guitar solo, etc. "
            "Each section contains its own descriptions of "
            "tempo, key, mode, time_signature, and loudness."
        )
    )
    segments = serializers.ListField(
        child=SegmentSerializer(),
        help_text=_("Each segment contains a roughly consistent sound throughout its duration.")
    )
    tatums = serializers.ListField(
        child=TatumSerializer(),
        help_text=_(
            "A tatum represents the lowest regular pulse train that a listener intuitively infers "
            "from the timing of perceived musical events (segments)."
        )
    )


class AudioFeatureSerializer(serializers.Serializer):
    acousticness = NormalizedFloatField(
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
    danceability = NormalizedFloatField(
        help_text=_(
            'Danceability describes how suitable a track is for dancing based on a combination of musical elements '
            'including tempo, rhythm stability, beat strength, and overall regularity. '
            'A value of 0.0 is least danceable and 1.0 is most danceable.'
        ),
    )
    duration_ms = serializers.IntegerField(
        min_value=0,
        help_text=_('The duration of the track in milliseconds.'),
    )
    energy = NormalizedFloatField(
        help_text=_(
            'Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. '
            'Typically, energetic tracks feel fast, loud, and noisy. '
            'For example, death metal has high energy, while a Bach prelude scores low on the scale. '
            'Perceptual features contributing to this attribute include dynamic range, perceived loudness, '
            'timbre, onset rate, and general entropy.'
        )
    )
    id = serializers.CharField(
        help_text=_('The Spotify ID for the track.')
    )
    instrumentalness = NormalizedFloatField(
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
    liveness = NormalizedFloatField(
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
    speechiness = NormalizedFloatField(
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
        help_text=_('The Spotify URI for the track.')
    )
    valance = NormalizedFloatField(
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
