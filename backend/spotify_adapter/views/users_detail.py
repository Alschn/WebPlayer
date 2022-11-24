from typing import Any

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from spotify_adapter.utils import get_user_by_id
from spotify_auth.permissions import HasSpotifyToken


class GetUserView(APIView):
    """/api/spotify/users/{user_id}"""

    permission_classes = [IsAuthenticated, HasSpotifyToken]

    def get(self, request: Request, user_id: str, *args: Any, **kwargs: Any) -> Response:
        sender = request.user
        if user_id:
            user = get_user_by_id(sender, user_id)
            return Response(user, status=status.HTTP_200_OK)
        return Response({'error': 'User id not found in query parameters!'}, status=status.HTTP_400_BAD_REQUEST)
