from datetime import timedelta

from allauth.socialaccount.models import SocialToken
# noinspection PyUnresolvedReferences
from config import CLIENT_ID, CLIENT_SECRET
from django.utils import timezone
from requests import post, put, get

BASE_URL = "https://api.spotify.com/v1/"
BASE_URL_ME = "https://api.spotify.com/v1/me/"


def get_user_token(user):
    """:returns SocialToken object || None"""
    user_tokens = SocialToken.objects.filter(account__user=user)
    if user_tokens.exists():
        return user_tokens.first()
    return None


def is_spotify_authenticated(user):
    token = get_user_token(user)
    if token:
        expiry = token.expires_at
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


def execute_spotify_api_call(user, endpoint, post_=False, put_=False, other_base_url=None):
    spotify_token = get_user_token(user).token
    headers = {'Content-Type': 'application/json', 'Authorization': "Bearer " + spotify_token}

    url = BASE_URL_ME if not other_base_url else other_base_url

    if post_:
        response = post(url + endpoint, headers=headers)
    elif put_:
        response = put(url + endpoint, headers=headers)
    else:
        response = get(url + endpoint, {}, headers=headers)

    # received empty object
    if not response.text:
        return response

    try:
        return response.json()
    except Exception as e:
        return {'Error': f"{e}"}


def play_song(user):
    return execute_spotify_api_call(user, "player/play", put_=True)


def pause_song(user):
    return execute_spotify_api_call(user, "player/pause", put_=True)


def prev_song(user):
    return execute_spotify_api_call(user, "player/previous", post_=True)


def skip_song(user):
    return execute_spotify_api_call(user, "player/next", post_=True)


def set_volume(user, value):
    return execute_spotify_api_call(user, f"player/volume?volume_percent={value}", put_=True)


def search_for_items(user, query, types, limit=20):
    return execute_spotify_api_call(
        user,
        endpoint=f"search?q={query}&type={types}&limit={limit}",
        other_base_url=BASE_URL
    )


def add_to_queue(user, uri):
    return execute_spotify_api_call(user, f"player/queue?uri={uri}", post_=True)


def get_recommendations(user, track_id, limit=20):
    return execute_spotify_api_call(user, f"recommendations?seed_tracks={track_id}&limit={limit}",
                                    other_base_url=BASE_URL)


def get_user_playlists(user, limit=20):
    return execute_spotify_api_call(user, f"playlists?limit={limit}")


def get_playlist(user, playlist_id):
    return execute_spotify_api_call(user, endpoint=f"playlists/{playlist_id}", other_base_url=BASE_URL)


def get_next_items(user, href):
    return execute_spotify_api_call(user, endpoint="", other_base_url=href)


def get_user_by_id(user, user_id):
    return execute_spotify_api_call(user, endpoint=f"users/{user_id}", other_base_url=BASE_URL)


def get_saved_items(user):
    return execute_spotify_api_call(user, endpoint=f"tracks?limit=30")
