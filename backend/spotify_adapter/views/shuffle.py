from typing import Any

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from spotify_adapter.utils import set_shuffle
from spotify_auth.permissions import HasSpotifyToken


class SetShuffleView(APIView):
    """/api/spotify/shuffle"""

    permission_classes = [IsAuthenticated, HasSpotifyToken]

    def put(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        sender = request.user
        shuffle = request.data.get('shuffle')
        if shuffle is not None:
            set_shuffle(sender, shuffle)
            return Response({'Message': 'Changed shuffle mode'}, status=status.HTTP_200_OK)
        return Response({'error': 'Shuffle not found in request body!'}, status=status.HTTP_400_BAD_REQUEST)
