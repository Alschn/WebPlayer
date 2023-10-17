from typing import Any

from rest_framework import status, serializers
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from spotify_adapter.utils import get_user_token
from spotify_auth.permissions import HasSpotifyToken


class SpotifyTokenSerializer(serializers.Serializer):
    token = serializers.CharField()


class GetCurrentSpotifyTokenView(APIView):
    """
    GET     /api/auth/spotify/token/    - Get the current user's Spotify token
    """

    permission_classes = [IsAuthenticated, HasSpotifyToken]
    serializer_class = SpotifyTokenSerializer

    def get(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        token = get_user_token(request.user)
        return Response({'token': token.token}, status=status.HTTP_200_OK)
