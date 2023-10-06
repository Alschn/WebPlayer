from typing import Any

from rest_framework import status, serializers
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from spotify_adapter.utils import get_spotify_client
from spotify_auth.permissions import HasSpotifyToken


class CurrentUserTopArtistsSerializer(serializers.Serializer):
    time_range = serializers.CharField(max_length=20, required=False, default='short_term')
    limit = serializers.IntegerField(required=False, min_value=1, max_value=50, default=20)
    offset = serializers.IntegerField(required=False, default=0)


class CurrentUserTopArtistsView(APIView):
    """
    GET     /api/spotify/me/top/artists/   -  Get current user's top artists

    Reference:
    https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
    """

    permission_classes = [IsAuthenticated, HasSpotifyToken]

    def get(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        serializer = CurrentUserTopArtistsSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)

        client = get_spotify_client(request.user)
        data = client.current_user_top_artists(**serializer.validated_data)
        return Response(data, status=status.HTTP_200_OK)
