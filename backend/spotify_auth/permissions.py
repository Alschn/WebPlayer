from rest_framework.permissions import BasePermission
from rest_framework.request import Request
from rest_framework.views import APIView

from spotify_adapter.utils import is_spotify_authenticated


class HasSpotifyToken(BasePermission):

    def has_permission(self, request: Request, view: APIView) -> bool:
        return is_spotify_authenticated(request.user)
