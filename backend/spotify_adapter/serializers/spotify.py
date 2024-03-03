from django.utils.translation import gettext_lazy as _
from rest_framework import serializers


class ExternalURLSerializer(serializers.Serializer):
    spotify = serializers.URLField(
        help_text=_('The Spotify URL for the object.')
    )


class ImageSerializer(serializers.Serializer):
    url = serializers.URLField(
        help_text=_('The source URL of the image.')
    )
    height = serializers.IntegerField(
        allow_null=True,
        help_text=_('The image height in pixels.')
    )
    width = serializers.IntegerField(
        allow_null=True,
        help_text=_('The image width in pixels.')
    )


class RestrictionsSerializer(serializers.Serializer):
    reason = serializers.ChoiceField(
        choices=['market', 'product', 'explicit'],
        help_text=_('The reason for the restriction.')
    )


class SimplifiedArtistSerializer(serializers.Serializer):
    external_urls = ExternalURLSerializer(
        help_text=_('Known external URLs for this artist.')
    )
    href = serializers.URLField(
        help_text=_('A link to the Web API endpoint providing full details of the artist.')
    )
    id = serializers.CharField(
        help_text=_('The Spotify ID for the artist.')
    )
    name = serializers.CharField(
        help_text=_('The name of the artist.')
    )
    type = serializers.CharField(
        default='artist',
        help_text=_('The object type: "artist"')
    )
    uri = serializers.CharField(
        help_text=_('The Spotify URI for the artist.')
    )


class LinkedFromSerializer(serializers.Serializer):
    external_urls = ExternalURLSerializer(
        help_text=_('Known external URLs for this track.')
    )
    href = serializers.URLField(
        help_text=_('A link to the Web API endpoint providing full details of the track.')
    )
    id = serializers.CharField(
        help_text=_('The Spotify ID for the track.')
    )
    type = serializers.CharField(
        default='track',
        help_text=_('The object type: "track"')
    )
    uri = serializers.CharField(
        help_text=_('The Spotify URI for the track.')
    )


class SimplifiedTrackSerializer(serializers.Serializer):
    artists = SimplifiedArtistSerializer(
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


class CopyrightSerializer(serializers.Serializer):
    text = serializers.CharField(
        help_text=_('The copyright text for this content.')
    )
    type = serializers.ChoiceField(
        choices=['C', 'P'],
        help_text=_('The type of copyright: C = the copyright, P = the sound recording (performance) copyright.')
    )


class ExternalIdsSerializer(serializers.Serializer):
    isrc = serializers.CharField(
        help_text='International Standard Recording Code'
    )
    ean = serializers.CharField(
        help_text='International Article Number'
    )
    upc = serializers.CharField(
        help_text='Universal Product Code'
    )


class MarketField(serializers.CharField):
    spotify_help_text = _(
        'An ISO 3166-1 alpha-2 country code. '
        'If a country code is specified, only content that is available in that market will be returned. '
        'If a valid user access token is specified in the request header, '
        'the country associated with the user account will take priority over this parameter. '
        'Note: If neither market or user country are provided, '
        'the content is considered unavailable for the client. '
        'Users can view the country that is associated with their account in the account settings.'
    )

    def __init__(self, *args, **kwargs):
        kwargs['help_text'] = self.spotify_help_text
        kwargs['max_length'] = 2
        super().__init__(*args, **kwargs)


class LimitField(serializers.IntegerField):
    spotify_help_text = _('The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.')

    def __init__(self, *args, **kwargs):
        kwargs.pop('required', None)
        kwargs['min_value'] = 0
        kwargs['max_value'] = 50
        kwargs['default'] = 20
        kwargs['help_text'] = self.spotify_help_text
        super().__init__(*args, **kwargs)


class OffsetField(serializers.IntegerField):
    spotify_help_text = _(
        'The index of the first item to return. Default: 0 (the first object). '
        'Use with limit to get the next set of items.'
    )

    def __init__(self, *args, **kwargs):
        kwargs.pop('required', None)
        kwargs['min_value'] = 0
        kwargs['max_value'] = 50
        kwargs['default'] = 0
        kwargs['help_text'] = self.spotify_help_text
        super().__init__(*args, **kwargs)


class AlbumIdsField(serializers.ListField):
    spotify_help_text = _('A comma-separated list of the Spotify IDs for the albums. Maximum: 20 IDs.')

    def __init__(self, *args, **kwargs):
        kwargs.setdefault('required', True)
        kwargs['child'] = serializers.CharField()
        kwargs['allow_empty'] = False
        kwargs['max_length'] = 20
        kwargs['help_text'] = self.spotify_help_text
        super().__init__(*args, **kwargs)


class ArtistIdsField(serializers.ListField):
    spotify_help_text = _('A comma-separated list of the Spotify IDs for the artists. Maximum: 50 IDs.')

    def __init__(self, *args, **kwargs):
        kwargs.setdefault('required', True)
        kwargs['child'] = serializers.CharField()
        kwargs['allow_empty'] = False
        kwargs['max_length'] = 50
        kwargs['help_text'] = self.spotify_help_text
        super().__init__(*args, **kwargs)


class PageSerializer(serializers.Serializer):
    href = serializers.URLField(
        help_text=_('A link to the Web API endpoint returning the full result of the request.')
    )
    limit = LimitField()
    next = serializers.URLField(
        allow_null=True,
        help_text=_('The URL to the next page of items. (null if none)')
    )
    offset = OffsetField()
    previous = serializers.URLField(
        allow_null=True,
        help_text=_('The URL to the previous page of items. (null if none)')
    )
    total = serializers.IntegerField(
        min_value=0,
        help_text=_('The total number of items available to return.')
    )
    items = None
