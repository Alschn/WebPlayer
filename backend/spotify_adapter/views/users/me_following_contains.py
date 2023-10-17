from typing import Any

from rest_framework import status, serializers
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from spotify_adapter.utils import get_spotify_client
from spotify_auth.permissions import HasSpotifyToken


class CurrentUserFollowingContainsParamsSerializer(serializers.Serializer):
    ids = serializers.ListField(child=serializers.CharField(max_length=50), allow_empty=False)
    type = serializers.CharField(max_length=20, required=False, default='artist')


class CurrentUserFollowingContainsView(APIView):
    """
    GET     /api/spotify/me/following/contains/

    Check to see if the current user is following one or more artists or other Spotify users.

    Reference:
    https://developer.spotify.com/documentation/web-api/reference/check-current-user-follows
    """
    permission_classes = [IsAuthenticated, HasSpotifyToken]

    # todo: response serializer

    def get(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        serializer = CurrentUserFollowingContainsParamsSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)

        ids = serializer.validated_data['ids']
        type_param = serializer.validated_data.get('type')

        client = get_spotify_client(request.user)

        if type_param == 'artist':
            data = client.current_user_following_artists(ids)
        else:
            data = client.current_user_following_users(ids)

        return Response(data, status=status.HTTP_200_OK)
