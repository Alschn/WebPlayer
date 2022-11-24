from django.urls import path

from spotify_auth.views.spotify_access import GetSpotifyAccessTokenView
from spotify_auth.views.spotify_login import SpotifyLoginView
from spotify_auth.views.spotify_token import GetCurrentSpotifyTokenView
from spotify_auth.views.spotify_url import GetSpotifyAuthURLView

urlpatterns = [
    # auth endpoints
    path('url', GetSpotifyAuthURLView.as_view()),
    path('access', GetSpotifyAccessTokenView.as_view()),
    path('login', SpotifyLoginView.as_view()),

    # Spotify token used to initialize SDK
    path('token', GetCurrentSpotifyTokenView.as_view()),
]
