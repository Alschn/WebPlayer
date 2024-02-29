from rest_framework import serializers

from .albums import AlbumSerializer


class NewReleasesSerializer(serializers.Serializer):
    albums = AlbumSerializer(many=True)
