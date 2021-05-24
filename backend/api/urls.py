from django.urls import path

from .views import GetSpotifyAuthURL, GetSpotifyAccessToken, SpotifyLogin, SpotifyLoginHandler

urlpatterns = [
    path('spotify-url', GetSpotifyAuthURL.as_view()),
    path('auth/spotify-token', GetSpotifyAccessToken.as_view()),
    path('auth/spotify-login', SpotifyLoginHandler.as_view()),
    path('auth/login', SpotifyLogin.as_view())
]
