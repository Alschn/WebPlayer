from django.utils.translation import gettext_lazy as _
from rest_framework import serializers


class DeviceSerializer(serializers.Serializer):
    id = serializers.CharField(
        allow_null=True,
        help_text=_(
            'The device ID. This ID is unique and persistent to some extent. '
            'However, this is not guaranteed and any cached device_id should periodically '
            'be cleared out and refetched as necessary.'
        )
    )
    is_active = serializers.BooleanField(
        help_text=_(
            'If this device is the currently active device.'
        )
    )
    is_private_session = serializers.BooleanField(
        help_text=_(
            'If this device is in a private session.'
        )
    )
    is_restricted = serializers.BooleanField(
        help_text=_(
            'If this device is not controllable by the current user.'
        )
    )
    name = serializers.CharField(
        allow_null=True,
        help_text=_(
            'A human-readable name for the device. '
            'Some devices have a name that the user can configure (e.g. "Loudest speaker") '
            'and some devices have a generic name associated with the manufacturer or device model.'
        )
    )
    type = serializers.CharField(
        allow_null=True,
        help_text=_(
            'Device type, such as "computer", "smartphone" or "speaker".'
        )
    )
    volume_percent = serializers.IntegerField(
        allow_null=True,
        min_value=0,
        max_value=100,
        help_text=_(
            'The current volume in percent.'
        )
    )
    supports_volume = serializers.BooleanField(
        help_text=_(
            'If this device can be used to set the volume.'
        )
    )


class DevicesResponseSerializer(serializers.Serializer):
    devices = DeviceSerializer(many=True)
