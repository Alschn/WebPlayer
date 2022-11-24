from typing import Any

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from spotify_adapter.utils import get_user_devices, select_device
from spotify_auth.permissions import HasSpotifyToken


class AvailableDevicesView(APIView):
    """/api/spotify/devices"""

    permission_classes = [IsAuthenticated, HasSpotifyToken]

    def get(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        user = request.user
        devices = get_user_devices(user)
        return Response(devices, status=status.HTTP_200_OK)

    def put(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        user = request.user
        device_id = request.data.get('device_id')
        if device_id:
            device = select_device(user, device_id)
            return Response(device, status=status.HTTP_200_OK)
        return Response({'error': 'Device_id not found in request body'}, status=status.HTTP_400_BAD_REQUEST)
