from datetime import timedelta
from typing import Any

import requests
import spotipy
from allauth.socialaccount.models import SocialToken
from django.conf import settings
from django.contrib.auth.models import User
from django.utils import timezone


def get_spotify_client(user: User, **kwargs: Any) -> spotipy.Spotify:
    token = get_user_token(user)
    spotify_token = token.token
    return spotipy.Spotify(auth=spotify_token, **kwargs)


def get_user_token(user: User) -> SocialToken | None:
    social_token = SocialToken.objects.filter(account__user=user)

    if not social_token.exists():
        return None

    return social_token.first()


def is_spotify_authenticated(user: User) -> bool:
    token = get_user_token(user)
    if token:
        expiry = token.expires_at
        if expiry <= timezone.now():
            refresh_spotify_token(user)
        return True
    return False


def update_user_token(
    user: User,
    access_token: str,
    expires_in: int,
    refresh_token: str
) -> None:
    token = get_user_token(user)
    if not token:
        return

    token.token = access_token
    token.token_secret = refresh_token
    token.expires_at = timezone.now() + timedelta(seconds=expires_in)
    token.save(update_fields=['token', 'token_secret', 'expires_at'])


def send_spotify_refresh_request(refresh_token: str) -> requests.Response:
    return requests.post(
        'https://accounts.spotify.com/api/token',
        data={
            'grant_type': 'refresh_token',
            'refresh_token': refresh_token,
            'client_id': settings.CLIENT_ID,
            'client_secret': settings.CLIENT_SECRET
        }
    )


def refresh_spotify_token(user: User) -> None:
    token = get_user_token(user)
    if not token:
        return

    refresh_token = token.token_secret

    response = send_spotify_refresh_request(refresh_token)
    response_json = response.json()

    access_token: str = response_json.get('access_token')
    expires_in: int = response_json.get('expires_in')

    update_user_token(user, access_token, expires_in, refresh_token)
