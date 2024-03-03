from django.utils.translation import gettext_lazy as _
from rest_framework import serializers

from .spotify import (
    ExternalURLSerializer,
    ImageSerializer,
    RestrictionsSerializer,
    SimplifiedArtistSerializer,
    CopyrightSerializer,
    ExternalIdsSerializer,
    PageSerializer,
    SimplifiedTrackSerializer
)


class AlbumTracksPageSerializer(PageSerializer):
    items = SimplifiedTrackSerializer(many=True)


class AlbumSerializer(serializers.Serializer):
    album_type = serializers.ChoiceField(
        choices=['album', 'single', 'compilation'],
        help_text=_('The type of the album.')
    )
    total_tracks = serializers.IntegerField(
        min_value=0,
        help_text=_('The number of tracks in the album.')
    )
    available_markets = serializers.ListField(
        child=serializers.CharField(),
        help_text=_(
            'The markets in which the album is available: ISO 3166-1 alpha-2 country codes. '
            'NOTE: an album is considered available in a market when at least 1 of its tracks is '
            'available in that market.'
        )
    )
    external_urls = ExternalURLSerializer(
        help_text=_('Known external URLs for this album.')
    )
    href = serializers.URLField(
        help_text=_('A link to the Web API endpoint providing full details of the album.')
    )
    id = serializers.CharField(
        help_text=_('The Spotify ID for the album.')
    )
    images = ImageSerializer(
        many=True,
        help_text=_('The cover art for the album in various sizes, widest first.')
    )
    name = serializers.CharField(
        allow_blank=True,
        help_text=_('The name of the album. In case of an album takedown, the value may be an empty string.')
    )
    release_date = serializers.DateField(
        help_text=_('The date the album was first released.')
    )
    release_date_precision = serializers.ChoiceField(
        choices=['year', 'month', 'day'],
        help_text=_('The precision with which release_date value is known.')
    )
    restrictions = RestrictionsSerializer(
        help_text=_('Included in the response when a content restriction is applied.')
    )
    type = serializers.CharField(
        help_text=_('The object type: "album".'),
        default='album'
    )
    uri = serializers.CharField(
        help_text=_('The Spotify URI for the album.')
    )
    artists = SimplifiedArtistSerializer(
        many=True,
        help_text=_(
            'The artists of the album. '
            'Each artist object includes a link in href to more detailed information about the artist.'
        )
    )
    tracks = AlbumTracksPageSerializer(
        help_text=_('The tracks of the album.')
    )
    copyrights = CopyrightSerializer(
        many=True,
        help_text=_('The copyright statements of the album.')
    )
    external_ids = ExternalIdsSerializer(
        help_text=_('Known external IDs for the album.')
    )
    genres = serializers.ListField(
        child=serializers.CharField(),
        help_text=_('A list of the genres the album is associated with. If not yet classified, the array is empty.')
    )
    label = serializers.CharField(
        allow_blank=True,
        help_text=_('The label associated with the album.')
    )
    popularity = serializers.IntegerField(
        min_value=0,
        max_value=100,
        help_text=_(
            'The popularity of the album. '
            'The value will be between 0 and 100, with 100 being the most popular.'
        )
    )


class SimplifiedAlbumSerializer(serializers.Serializer):
    album_type = serializers.ChoiceField(
        choices=['album', 'single', 'compilation'],
        help_text=_('The type of the album.')
    )
    total_tracks = serializers.IntegerField(
        min_value=0,
        help_text=_('The number of tracks in the album.')
    )
    available_markets = serializers.ListField(
        child=serializers.CharField(),
        help_text=_(
            'The markets in which the album is available: ISO 3166-1 alpha-2 country codes. '
            'NOTE: an album is considered available in a market when at least 1 of its tracks is '
            'available in that market.'
        )
    )
    external_urls = ExternalURLSerializer(
        help_text=_('Known external URLs for this album.')
    )
    href = serializers.URLField(
        help_text=_('A link to the Web API endpoint providing full details of the album.')
    )
    id = serializers.CharField(
        help_text=_('The Spotify ID for the album.')
    )
    images = ImageSerializer(
        many=True,
        help_text=_('The cover art for the album in various sizes, widest first.')
    )
    name = serializers.CharField(
        allow_blank=True,
        help_text=_('The name of the album. In case of an album takedown, the value may be an empty string.')
    )
    release_date = serializers.DateField(
        help_text=_('The date the album was first released.')
    )
    release_date_precision = serializers.ChoiceField(
        choices=['year', 'month', 'day'],
        help_text=_('The precision with which release_date value is known.')
    )
    restrictions = RestrictionsSerializer(
        help_text=_('Included in the response when a content restriction is applied.')
    )
    type = serializers.CharField(
        help_text=_('The object type: "album".'),
        default='album'
    )
    uri = serializers.CharField(
        help_text=_('The Spotify URI for the album.')
    )
    artists = SimplifiedArtistSerializer(
        many=True,
        help_text=_(
            'The artists of the album. '
            'Each artist object includes a link in href to more detailed information about the artist.'
        )
    )
    album_group = serializers.ChoiceField(
        choices=['album', 'single', 'compilation', 'appears_on'],
        help_text=_('The field is present when getting an artist’s albums.')
    )
