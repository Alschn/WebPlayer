from django.urls import path

from .views import *

urlpatterns = [
    # auth endpoints
    path('spotify-url', GetSpotifyAuthURL.as_view()),
    path('auth/spotify-token', GetSpotifyAccessToken.as_view()),
    path('auth/spotify-login', SpotifyLoginHandler.as_view()),
    path('auth/login', SpotifyLogin.as_view()),
    # Spotify endpoints
    path('spotify/playlists', GetUserPlaylists.as_view()),
    path('spotify/playlists/<str:id>', GetPlaylist.as_view()),
    path('spotify/play', PlaySong.as_view()),
    path('spotify/pause', PauseSong.as_view()),
    path('spotify/skip', SkipSong.as_view()),
    path('spotify/volume', SetVolume.as_view()),
    path('spotify/playback', SetPlaybackMode.as_view()),
    path('spotify/repeat', SetRepeatMode.as_view()),
    path('spotify/queue', AddToQueue.as_view()),
    path('spotify/recommendations', GetRecommendations.as_view()),
    path('spotify/song', GetCurrentSong.as_view()),
    path('spotify/user', GetCurrentUser.as_view()),
    path('spotify/library', GetUserLibrary.as_view()),
    path('spotify/devices', GetAvailableDevices.as_view()),
]
