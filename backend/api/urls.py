from django.urls import path

from .views import *

urlpatterns = [
    # auth endpoints
    path('spotify-url', GetSpotifyAuthURL.as_view()),
    path('auth/spotify-token', GetSpotifyAccessToken.as_view()),
    path('auth/login', SpotifyLogin.as_view()),
    path('auth/logout', Logout.as_view()),
    # Spotify token used to initialize SDK
    path('spotify/token', GetCurrentSpotifyToken.as_view()),
    # Spotify endpoints
    path('spotify/playlists', GetUserPlaylists.as_view()),
    path('spotify/playlists/<str:id>', GetPlaylist.as_view()),
    path('spotify/users', GetCurrentUser.as_view()),
    path('spotify/users/<str:id>', GetUser.as_view()),
    path('spotify/users/<str:id>/playlists', UsersPlaylists.as_view()),

    path('spotify/artists/<str:artist_id>', GetArtist.as_view()),
    path('spotify/artists/<str:artist_id>/tracks', GetArtistsTopTracks.as_view()),
    path('spotify/artists/<str:artist_id>/albums', GetArtistsAlbums.as_view()),
    path('spotify/artists/<str:artist_id>/related-artists', GetRelatedArtists.as_view()),

    path('spotify/albums/<str:id>', GetAlbum.as_view()),

    path('spotify/top/artists', GetTopArtists.as_view()),
    path('spotify/top/tracks', GetTopTracks.as_view()),

    path('spotify/saved', GetSavedItems.as_view()),
    path('spotify/recommendations', GetRecommendations.as_view()),

    # SDK performs these operations below faster
    path('spotify/play', PlaySong.as_view()),
    path('spotify/pause', PauseSong.as_view()),
    path('spotify/skip', SkipSong.as_view()),
    path('spotify/seek', SeekPosition.as_view()),

    path('spotify/volume', SetVolume.as_view()),
    path('spotify/shuffle', SetShuffle.as_view()),
    path('spotify/repeat', SetRepeatMode.as_view()),

    path('spotify/song', GetCurrentSong.as_view()),

    path('spotify/queue', AddToQueue.as_view()),
    path('spotify/devices', AvailableDevices.as_view()),
]
