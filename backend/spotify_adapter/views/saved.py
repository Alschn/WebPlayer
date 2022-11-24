from typing import Any

from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from spotify_adapter.utils import get_saved_items, get_next_items


class GetSavedItemsView(APIView):
    """/api/spotify/saved/"""

    def get(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        sender = request.user
        saved_tracks = get_saved_items(sender)
        return Response(saved_tracks, status=status.HTTP_200_OK)

    def put(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        sender = request.user
        next_tracks = request.data.get('next')
        if next_tracks:
            tracks = get_next_items(sender, href=next_tracks)
            return Response(tracks, status=status.HTTP_200_OK)
        return Response({'error': 'Next parameter not found in request body!'}, status=status.HTTP_400_BAD_REQUEST)
