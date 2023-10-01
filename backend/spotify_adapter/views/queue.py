from typing import Any

from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView


class QueueView(APIView):
    """/api/spotify/queue/"""

    def get(self, request: Request, playlist_id: str, *args: Any, **kwargs: Any) -> Response:
        pass

    def put(self, request: Request, playlist_id: str, *args: Any, **kwargs: Any) -> Response:
        pass
