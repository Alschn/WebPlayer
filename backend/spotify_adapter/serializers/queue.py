from rest_framework import serializers

from spotify_adapter.serializers.tracks import TrackSerializer


class BaseQueueSerializer(serializers.Serializer):
    currently_playing = None
    queue = None


class TracksQueueSerializer(BaseQueueSerializer):
    currently_playing = TrackSerializer()
    queue = TrackSerializer(many=True)


class EpisodesQueueSerializer(BaseQueueSerializer):
    # todo: implement later
    currently_playing = None
    queue = None
