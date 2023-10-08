from drf_spectacular.utils import extend_schema
from rest_framework import status, serializers
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from spotify_adapter.utils import get_spotify_client


class PlaylistsDetailsTracksParamsSerializer(serializers.Serializer):
    market = serializers.CharField(required=False)
    fields = serializers.CharField(required=False)
    limit = serializers.IntegerField(required=False, min_value=1, max_value=100, default=100)
    offset = serializers.IntegerField(required=False, min_value=0, default=0)
    additional_types = serializers.CharField(required=False)


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

    )
    def post(self, request: Request, playlist_id: str, *args, **kwargs) -> Response:
        # todo: add items to playlist
        pass

    @extend_schema(

    )
    def put(self, request: Request, playlist_id: str, *args, **kwargs) -> Response:
        # todo: update playlist items
        pass

    @extend_schema(

    )
    def delete(self, request: Request, playlist_id: str, *args, **kwargs) -> Response:
        # todo: remove items from playlist
        pass
