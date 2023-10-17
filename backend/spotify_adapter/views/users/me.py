from typing import Any

from allauth.socialaccount.models import SocialAccount
from rest_framework import status, serializers
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView


class CurrentUserSerializer(serializers.Serializer):
    display_name = serializers.CharField()
    external_urls = serializers.DictField()
    id = serializers.CharField()
    images = serializers.ListField()
    type = serializers.CharField()
    uri = serializers.CharField()
    followers = serializers.DictField()
    country = serializers.CharField()
    product = serializers.CharField()
    explicit_content = serializers.DictField()
    email = serializers.EmailField()


class CurrentUserView(APIView):
    """
    GET     /api/spotify/me/

    Get current user's data from the social account stored in the database.
    """

    permission_classes = [IsAuthenticated]
    serializer_class = CurrentUserSerializer

    def get(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        social_account = SocialAccount.objects.filter(
            user=request.user,
            provider='spotify',
        )

        if not social_account.exists():
            return Response(status=status.HTTP_404_NOT_FOUND)

        social_account = social_account.first()
        json_data = social_account.extra_data
        return Response(json_data, status=status.HTTP_200_OK)
