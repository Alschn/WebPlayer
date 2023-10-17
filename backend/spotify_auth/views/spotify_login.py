from datetime import timedelta

from allauth.socialaccount.models import SocialToken, SocialAccount, SocialApp
from allauth.socialaccount.providers.spotify.views import SpotifyOAuth2Adapter
from dj_rest_auth.registration.serializers import SocialLoginSerializer
from dj_rest_auth.registration.views import SocialLoginView
from django.utils import timezone
from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response


class SpotifyLoginView(SocialLoginView):
    """
    POST    /api/auth/spotify/login/

    todo: rewrite, better docs, swagger
    """

    adapter_class = SpotifyOAuth2Adapter
    serializer_class = SocialLoginSerializer

    def finalize_response(self, request: Request, response: Response, *args, **kwargs) -> Response:
        """Create social token and update response data if response was successful."""

        if response.status_code != status.HTTP_200_OK:
            return super().finalize_response(request, response, *args, **kwargs)

        raw_response = response.data

        access_token = request.data['access_token']
        refresh_token = request.data['refresh_token']
        expires_in = request.data['expires_in']

        social_account = SocialAccount.objects.get(user=request.user)

        SocialToken.objects.update_or_create(
            app=SocialApp.objects.get(provider='spotify'),
            account=social_account,
            defaults={
                'token': access_token,
                'token_secret': refresh_token,
                'expires_at': timezone.now() + timedelta(seconds=expires_in)
            }
        )
        response.status_code = status.HTTP_201_CREATED
        response.data = {
            'key': raw_response['key'],
            'user': social_account.extra_data
        }
        return super().finalize_response(request, response, *args, **kwargs)

    def get_serializer(self, *args, **kwargs):
        # This fixes issue with login view in the latest version of drf
        serializer_class = self.get_serializer_class()
        kwargs['context'] = self.get_serializer_context()
        return serializer_class(*args, **kwargs)
