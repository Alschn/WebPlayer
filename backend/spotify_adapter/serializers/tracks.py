from django.utils.translation import gettext_lazy as _
from rest_framework import serializers

from .albums import AlbumSerializer
from .artists import ArtistSerializer
from .spotify import (
    ExternalURLSerializer,
    RestrictionsSerializer,
    LinkedFromSerializer, PageSerializer,
)


class TrackSerializer(serializers.Serializer):
    album = AlbumSerializer(
        help_text=_(
            'The album on which the track appears. '
            'The album object includes a link in href to full information about the album.'
        )
    )
    artists = ArtistSerializer(
        many=True,
        help_text=_(
            'The artists who performed the track. '
            'Each artist object includes a link in href to more detailed information about the artist.'
        )
    )
    available_markets = serializers.ListField(
        child=serializers.CharField(),
        help_text=_(
            'A list of the countries in which the track can be played, '
            'identified by their ISO 3166-1 alpha-2 code.'
        )
    )
    disc_number = serializers.IntegerField(
        help_text=_('The disc number (usually 1 unless the album consists of more than one disc).')
    )
    duration_ms = serializers.IntegerField(
        help_text=_('The track length in milliseconds.')
    )
    explicit = serializers.BooleanField(
        help_text=_(
            'Whether or not the track has explicit lyrics ( true = yes it does; false = no it does not OR unknown).'
        )
    )
    external_urls = ExternalURLSerializer(
        help_text=_('External URLs for this track.')
    )
    href = serializers.URLField(
        help_text=_('A link to the Web API endpoint providing full details of the track.')
    )
    id = serializers.CharField(
        help_text=_('The Spotify ID for the track.')
    )
    is_playable = serializers.BooleanField(
        help_text=_(
            'Part of the response when Track Relinking is applied. '
            'If true, the track is playable in the given market. Otherwise false.'
        )
    )
    linked_from = LinkedFromSerializer(
        help_text=_(
            'Part of the response when Track Relinking is applied and is only part of the response '
            'if the track linking, in fact, exists. '
            'The requested track has been replaced with a different track. '
            'The track in the linked_from object contains information about the originally requested track.'
        )
    )
    restrictions = RestrictionsSerializer(
        help_text=_('Included in the response when a content restriction is applied.')
    )
    name = serializers.CharField(
        help_text=_('The name of the track.')
    )
    popularity = serializers.IntegerField(
        min_value=0,
        max_value=100,
        help_text=_(
            'The popularity of the track. The value will be between 0 and 100, with 100 being the most popular. '
            'The popularity is calculated by algorithm and is based, in the most part, '
            'on the total number of plays the track has had and how recent those plays are. '
            'Generally speaking, songs that are being played a lot now will have a higher popularity '
            'than songs that were played a lot in the past. '
            'Duplicate tracks (e.g. the same track from a single and an album) are rated independently. '
            'Artist and album popularity is derived mathematically from track popularity. '
            'Note: the popularity value may lag actual popularity by a few days: the value is not updated in real time.'
        )
    )
    preview_url = serializers.URLField(
        allow_null=True,
        help_text=_('A URL to a 30 second preview (MP3 format) of the track.')
    )
    track_number = serializers.IntegerField(
        help_text=_(
            'The number of the track. If an album has several discs, '
            'the track number is the number on the specified disc.'
        )
    )
    type = serializers.CharField(
        default='track',
        help_text=_('The object type: "track".'),
    )
    uri = serializers.CharField(
        help_text=_('The Spotify URI for the track.')
    )
    is_local = serializers.BooleanField(
        help_text=_('Whether or not the track is from a local file.')
    )


class TracksSerializer(serializers.Serializer):
    tracks = TrackSerializer(many=True)


class TracksPageSerializer(PageSerializer):
    items = TrackSerializer(many=True)
