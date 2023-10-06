from typing import Any

from rest_framework import status, serializers
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from spotify_adapter.utils import get_spotify_client


class CurrentUserFollowingParamsSerializer(serializers.Serializer):
    after = serializers.CharField(max_length=50, required=False)
    limit = serializers.IntegerField(required=False, min_value=1, max_value=50, default=20)


class CurrentUserFollowing(APIView):
    """
    GET     /api/spotify/me/following/      - Get the current user's followed artists.

    Reference:
    https://developer.spotify.com/documentation/web-api/reference/get-followed
    """

    # todo: response serializer

    def get(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        serializer = CurrentUserFollowingParamsSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)

        after = serializer.validated_data.get('after')
        limit = serializer.validated_data.get('limit')

        client = get_spotify_client(request.user)
        data = client.current_user_followed_artists(
            limit=limit,
            after=after,
        )
        return Response(data, status=status.HTTP_200_OK)
