from datetime import timedelta

from allauth.socialaccount.models import SocialToken
# noinspection PyUnresolvedReferences
from config import CLIENT_ID, CLIENT_SECRET
from django.utils import timezone
from requests import post


def get_user_token(user):
    """:returns SocialToken object || None"""
    user_tokens = SocialToken.objects.filter(user=user)
    if user_tokens.exists():
        return user_tokens.first()
    return None


def is_spotify_authenticated(user):
    token = get_user_token(user)
    if token:
        expiry = token.expires_in
        if expiry <= timezone.now():
            refresh_spotify_token(user)
        return True
    return False


def update_user_token(user, access_token, expires_in, refresh_token):
    tokens = get_user_token(user)
    if not tokens:
        return
    tokens.token = access_token
    tokens.token_secret = refresh_token
    tokens.expires_at = timezone.now() + timedelta(seconds=expires_in)
    tokens.save(update_fields=['token', 'token_secret', 'expires_at'])


def refresh_spotify_token(user):
    refresh_token = get_user_token(user).token_secret

    response = post('https://accounts.spotify.com/api/token', data={
        'grant_type': 'refresh_token',
        'refresh_token': refresh_token,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
    }).json()

    access_token = response.get('access_token')
    expires_in = response.get('expires_in')

    update_user_token(user, access_token, expires_in, refresh_token)
