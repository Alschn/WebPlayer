from typing import Any

from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView


class FollowUsersView(APIView):
    """/api/spotify/follow/{ids}"""

    # to do

    def get(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        # Checks if given artists/users are followed
        return Response({}, status.HTTP_200_OK)

    def put(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        # Follow given artists/users
        return Response({}, status.HTTP_200_OK)

    def delete(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        # Unfollow given artists/users
        return Response({}, status.HTTP_204_NO_CONTENT)
