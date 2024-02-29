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
        kwargs.setdefault('required', False)
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
        kwargs.setdefault('required', False)
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
