from typing import Any

from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView


class AudioAnalysisDetailView(APIView):

    def get(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        pass
