from rest_framework import serializers


class AlbumSerializer(serializers.Serializer):
    # todo: add fields
    pass


class NewReleasesSerializer(serializers.Serializer):
    albums = AlbumSerializer(many=True)
