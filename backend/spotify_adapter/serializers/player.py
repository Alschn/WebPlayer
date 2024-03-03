from django.utils.translation import gettext_lazy as _
from rest_framework import serializers

from spotify_adapter.serializers.spotify import LimitField, ExternalURLSerializer
from spotify_adapter.serializers.tracks import TrackSerializer


class DeviceSerializer(serializers.Serializer):
    id = serializers.CharField(
        help_text=_(
            'The device ID. This ID is unique and persistent to some extent. '
            'However, this is not guaranteed and any cached device_id should periodically '
            'be cleared out and refetched as necessary.'
        )
    )
    is_active = serializers.BooleanField(
        help_text=_('If this device is the currently active device.')
    )
    is_private_session = serializers.BooleanField(
        help_text=_('If this device is currently in a private session.')
    )
    is_restricted = serializers.BooleanField(
        help_text=_(
            'If this device is restricted. At present if this is "true" then '
            'no Web API commands will be accepted by this device.'
        )
    )
    name = serializers.CharField(
        help_text=_(
            'A human-readable name for the device. '
            'Some devices have a name that the user can configure (e.g. "Loudest speaker") '
            'and some devices have a generic name associated with the manufacturer or device model.'
        )
    )
    type = serializers.CharField(
        help_text=_(
            'Device type, such as "computer", "smartphone" or "speaker". '
        )
    )
    volume_percent = serializers.IntegerField(
        allow_null=True,
        min_value=0,
        max_value=100,
        help_text=_('The current volume in percent.')
    )
    supports_volume = serializers.BooleanField(
        help_text=_('If this device can be used to set the volume.')
    )


class PlayerContextSerializer(serializers.Serializer):
    type = serializers.CharField(
        help_text=_(
            'The object type, e.g. "artist", "playlist", "album", "show". '
        )
    )
    href = serializers.URLField(
        help_text=_('A link to the Web API endpoint providing full details of the track.')
    )
    external_urls = ExternalURLSerializer(
        help_text=_('External URLs for this context.')
    )
    uri = serializers.CharField(
        help_text=_('The Spotify URI for the context.')
    )


class PlayerActionsSerializer(serializers.Serializer):
    interrupting_playback = serializers.BooleanField(
        required=False,
        help_text=_('Interrupting playback. Optional field.')
    )
    pausing = serializers.BooleanField(
        required=False,
        help_text=_('Pausing. Optional field.')
    )
    resuming = serializers.BooleanField(
        required=False,
        help_text=_('Resuming. Optional field.')
    )
    seeking = serializers.BooleanField(
        required=False,
        help_text=_('Seeking playback location. Optional field.')
    )
    skipping_next = serializers.BooleanField(
        required=False,
        help_text=_('Skipping to the next context. Optional field.')
    )
    skipping_prev = serializers.BooleanField(
        required=False,
        help_text=_('Skipping to the previous context. Optional field.')
    )
    toggling_repeat_context = serializers.BooleanField(
        required=False,
        help_text=_('Toggling repeat context flag. Optional field.')
    )
    toggling_shuffle = serializers.BooleanField(
        required=False,
        help_text=_('Toggling shuffle flag. Optional field.')
    )
    toggling_repeat_track = serializers.BooleanField(
        required=False,
        help_text=_('Toggling repeat track flag. Optional field.')
    )
    transferring_playback = serializers.BooleanField(
        required=False,
        help_text=_('Transferring playback between devices. Optional field.')
    )


class PlayerPlaybackStateSerializer(serializers.Serializer):
    device = DeviceSerializer(
        help_text=_('The device that is currently active.')
    )
    repeat_state = serializers.ChoiceField(
        choices=['track', 'context', 'off'],
        help_text=_(
            'The repeat state. Options are "track", "context" and "off".'
        )
    )
    shuffle_state = serializers.BooleanField(
        help_text=_('If shuffle is on or off.')
    )
    context = PlayerContextSerializer(
        allow_null=True,
        help_text=_('A Context Object. Can be null.')
    )
    timestamp = serializers.IntegerField(
        help_text=_(
            'Unix Millisecond Timestamp when data was fetched.'
        )
    )
    progress_ms = serializers.IntegerField(
        allow_null=True,
        help_text=_(
            'Progress into the currently playing track or episode. Can be null.'
        )
    )
    is_playing = serializers.BooleanField(
        help_text=_('If something is currently playing, return true.')
    )
    item = TrackSerializer(
        allow_null=True,
        help_text=_('The currently playing track or episode. Can be null.')
    )
    currently_playing_type = serializers.ChoiceField(
        choices=['track', 'episode', 'ad', 'unknown'],
        help_text=_(
            'The object type of the currently playing item. '
            'Can be one of "track", "episode", "ad" or "unknown".'
        )
    )
    actions = PlayerActionsSerializer(
        help_text=_(
            'Allows to update the user interface based on which playback actions '
            'are available within the current context.'
        )
    )


class CursorsSerializer(serializers.Serializer):
    after = serializers.CharField(
        help_text=_('The cursor to use as key to find the next page of items.')
    )
    before = serializers.CharField(
        help_text=_('The cursor to use as key to find the previous page of items.')
    )


class PlayHistorySerializer(serializers.Serializer):
    track = TrackSerializer(
        help_text=_('The track the user listened to.')
    )
    played_at = serializers.DateTimeField(
        help_text=_('The date and time the track was played.')
    )
    context = PlayerContextSerializer(
        allow_null=True,
        help_text=_('The context the track was played from. Can be null.')
    )


class RecentlyPlayedTracksSerializer(serializers.Serializer):
    href = serializers.URLField(
        help_text=_('A link to the Web API endpoint returning the full result of the request.')
    )
    limit = LimitField()
    next = serializers.URLField(
        allow_null=True,
        help_text=_('The URL to the next page of items. (null if none)')
    )
    cursors = CursorsSerializer(
        help_text=_('The cursors used to find the next set of items.')
    )
    total = serializers.IntegerField(
        min_value=0,
        help_text=_('The total number of items available to return.')
    )
    items = PlayHistorySerializer(many=True)
