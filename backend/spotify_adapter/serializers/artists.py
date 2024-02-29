from django.utils.translation import gettext_lazy as _
from rest_framework import serializers

from spotify_adapter.serializers.albums import SimplifiedAlbumSerializer
from spotify_adapter.serializers.spotify import (
    ExternalURLSerializer,
    ImageSerializer,
    PageSerializer
)
from spotify_adapter.serializers.tracks import SimplifiedTrackSerializer


class FollowersSerializer(serializers.Serializer):
    href = serializers.URLField(
        help_text=_('This will always be set to null, as the Web API does not support it at the moment.')
    )
    total = serializers.IntegerField(
        help_text=_('The total number of followers.')
    )


class ArtistSerializer(serializers.Serializer):
    external_urls = ExternalURLSerializer(
        help_text=_('Known external URLs for this artist.')
    )
    followers = FollowersSerializer(
        help_text=_('Information about the followers of the artist.')
    )
    genres = serializers.ListField(
        child=serializers.CharField(),
        allow_empty=True,
        help_text=_('A list of the genres the artist is associated with. If not yet classified, the array is empty.')
    )
    href = serializers.URLField(
        help_text=_('A link to the Web API endpoint providing full details of the artist.')
    )
    id = serializers.CharField(
        help_text=_('The Spotify ID for the artist.')
    )
    images = ImageSerializer(
        many=True,
        help_text=_('Images of the artist in various sizes, widest first.')
    )
    name = serializers.CharField(
        help_text=_('The name of the artist.')
    )
    popularity = serializers.IntegerField(
        min_value=0,
        max_value=100,
        help_text=_(
            'The popularity of the artist. '
            'The value will be between 0 and 100, with 100 being the most popular. '
            'The artist\'s popularity is calculated from the popularity of all the artist\'s tracks.'
        )
    )
    type = serializers.CharField(
        default='artist',
        help_text=_('The object type: "artist"')
    )
    uri = serializers.CharField(
        help_text=_('The Spotify URI for the artist.')
    )


class ArtistAlbumsPageSerializer(PageSerializer):
    items = SimplifiedAlbumSerializer(many=True)


class ArtistTopTracksPageSerializer(serializers.Serializer):
    tracks = SimplifiedTrackSerializer(many=True)


class ArtistRelatedArtistsPageSerializer(serializers.Serializer):
    artists = ArtistSerializer(many=True)
