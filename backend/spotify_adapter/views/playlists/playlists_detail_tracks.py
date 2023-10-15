from drf_spectacular.utils import extend_schema
from rest_framework import status, serializers
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from spotify_adapter.utils import get_spotify_client
from spotify_auth.permissions import HasSpotifyToken


class PlaylistsDetailsTracksParamsSerializer(serializers.Serializer):
    market = serializers.CharField(required=False)
    fields = serializers.CharField(required=False)
    limit = serializers.IntegerField(required=False, min_value=1, max_value=100, default=100)
    offset = serializers.IntegerField(required=False, min_value=0, default=0)
    additional_types = serializers.CharField(required=False)


class PlaylistsDetailsTracksAddDataSerializer(serializers.Serializer):
    position = serializers.IntegerField(
        required=False, min_value=0,
        help_text=(
            "The position to insert the items, a zero-based index. "
            "For example, to insert the items in the first position: position=0; "
            "to insert the items in the third position: position=2. "
            "If omitted, the items will be appended to the playlist. "
            "Items are added in the order they are listed in the query string or request body."
        )
    )
    uris = serializers.ListField(
        child=serializers.CharField(),
        required=True,
        help_text=(
            "A comma-separated list of Spotify URIs to add, can be track or episode URIs. "
            "For example: uris=spotify:track:4iV5W9uYEdYUVa79Axb7Rh,spotify:track:1301WleyT98MSxVHPZCA6M "
            "A maximum of 100 items can be added in one request."
        )
    )


class PlaylistsDetailsTracksUpdateDataSerializer(serializers.Serializer):
    uris = serializers.ListField(
        child=serializers.CharField(),
        required=False,
    )
    range_start = serializers.IntegerField(required=False)
    insert_before = serializers.IntegerField(required=False)
    range_length = serializers.IntegerField(required=False)
    snapshot_id = serializers.CharField(required=False)


class TracksSerializer(serializers.Serializer):
    uri = serializers.CharField()


class PlaylistsDetailsTracksRemoveDataSerializer(serializers.Serializer):
    tracks = TracksSerializer(many=True)
    snapshot_id = serializers.CharField(required=False)


class PlaylistsDetailTracksView(APIView):
    """
    GET     /api/spotify/playlists/<str:playlist_id>/tracks/

    Get full details of the items of a playlist owned by a Spotify user.

    POST    /api/spotify/playlists/<str:playlist_id>/tracks/

    Add one or more items to a user's playlist.

    PUT     /api/spotify/playlists/<str:playlist_id>/tracks/

    Either reorder or replace items in a playlist depending on the request's parameters.
    To reorder items, include range_start, insert_before, range_length and snapshot_id in the request's body.
    To replace items, include uris as either a query parameter or in the request's body.
    Replacing items in a playlist will overwrite its existing items.
    This operation can be used for replacing or clearing items in a playlist.

    DELETE  /api/spotify/playlists/<str:playlist_id>/tracks/

    Remove one or more items from a user's playlist.

    Reference:
    https://developer.spotify.com/documentation/web-api/reference/get-playlists-tracks

    https://developer.spotify.com/documentation/web-api/reference/add-tracks-to-playlist

    https://developer.spotify.com/documentation/web-api/reference/reorder-or-replace-playlists-tracks

    https://developer.spotify.com/documentation/web-api/reference/remove-tracks-playlist
    """
    permission_classes = [IsAuthenticated, HasSpotifyToken]

    @extend_schema(
        parameters=[PlaylistsDetailsTracksParamsSerializer],
        # todo: response seriarlizer
    )
    def get(self, request: Request, playlist_id: str, *args, **kwargs) -> Response:
        serializer = PlaylistsDetailsTracksParamsSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)

        client = get_spotify_client(request.user)
        data = client.playlist_items(playlist_id, **serializer.validated_data)
        return Response(data, status=status.HTTP_200_OK)

    @extend_schema(
        request=PlaylistsDetailsTracksAddDataSerializer,
        # todo: response serializer
    )
    def post(self, request: Request, playlist_id: str, *args, **kwargs) -> Response:
        serializer = PlaylistsDetailsTracksAddDataSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        client = get_spotify_client(request.user)
        data = client.playlist_add_items(playlist_id, **serializer.validated_data)
        return Response(data, status=status.HTTP_201_CREATED)

    @extend_schema(
        request=PlaylistsDetailsTracksUpdateDataSerializer,
        # todo: response serializer
    )
    def put(self, request: Request, playlist_id: str, *args, **kwargs) -> Response:
        serializer = PlaylistsDetailsTracksUpdateDataSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        uris = serializer.validated_data.pop('uris', None)

        client = get_spotify_client(request.user)

        if uris:
            data = client.playlist_replace_items(
                playlist_id, items=uris
            )
        else:
            data = client.playlist_reorder_items(
                playlist_id, **serializer.validated_data
            )

        return Response(data, status=status.HTTP_200_OK)

    @extend_schema(
        request=PlaylistsDetailsTracksRemoveDataSerializer,
        # todo: response serializer
    )
    def delete(self, request: Request, playlist_id: str, *args, **kwargs) -> Response:
        serializer = PlaylistsDetailsTracksRemoveDataSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        client = get_spotify_client(request.user)
        data = client.playlist_remove_all_occurrences_of_items(
            playlist_id, **serializer.validated_data
        )
        return Response(data, status=status.HTTP_200_OK)
