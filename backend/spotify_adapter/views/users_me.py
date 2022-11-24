from typing import Any

from allauth.socialaccount.models import SocialAccount
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView


class GetCurrentUserView(APIView):
    """/api/spotify/users"""

    permission_classes = [IsAuthenticated]

    def get(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        user = request.user
        social = SocialAccount.objects.filter(user=user)
        if not social.exists():
            return Response(status=status.HTTP_404_NOT_FOUND)

        social_acc = social.first()
        user_data = social_acc.extra_data
        image = user_data.get('images')
        try:
            image = image[0].get('url')
        except Exception:
            pass

        followers = user_data.get('followers').get('total')

        return Response({
            'username': user_data.get('display_name'),
            'imageURL': image,
            'id': user_data.get('id'),
            'followers': followers,
        }, status=status.HTTP_200_OK)
