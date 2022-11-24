from django.urls import path

from .views import (
    GetPlaylistView, GetUserPlaylistsView, GetCurrentUserView, GetUserView, UsersPlaylistsView, FollowUsersView,
    GetArtistView, PlaySongView, PauseSongView, SkipSongView, SeekPositionView, SetVolumeView, SetShuffleView,
    SetRepeatModeView, GetCurrentSongView, QueueView, AvailableDevicesView, RecommendationsView, GetSavedItemsView,
    GetTopTracksView, GetTopArtistsView, GetAlbumView, GetArtistsTopTracksView, GetArtistsAlbumsView,
    GetRelatedArtistsView, NewReleasesView
)

urlpatterns = [
    # Spotify endpoints
    path('playlists/', GetUserPlaylistsView.as_view()),
    path('playlists/<str:playlist_id>/', GetPlaylistView.as_view()),

    path('users/', GetCurrentUserView.as_view()),
    path('users/<str:user_id>/', GetUserView.as_view()),
    path('users/<str:user_id>/playlists/', UsersPlaylistsView.as_view()),

    path('follow/<str:ids>', FollowUsersView.as_view()),

    path('artists/<str:artist_id>/', GetArtistView.as_view()),
    path('artists/<str:artist_id>/tracks/', GetArtistsTopTracksView.as_view()),
    path('artists/<str:artist_id>/albums/', GetArtistsAlbumsView.as_view()),
    path('artists/<str:artist_id>/related-artists/', GetRelatedArtistsView.as_view()),

    path('albums/<str:album_id>/', GetAlbumView.as_view()),

    path('top/artists/', GetTopArtistsView.as_view()),
    path('top/tracks/', GetTopTracksView.as_view()),

    path('saved/', GetSavedItemsView.as_view()),
    path('recommendations/', RecommendationsView.as_view()),
    path('new-releases/', NewReleasesView.as_view()),

    path('devices/', AvailableDevicesView.as_view()),

    # SDK operations
    path('player/', GetCurrentSongView.as_view()),

    path('player/play/', PlaySongView.as_view()),
    path('player/pause/', PauseSongView.as_view()),
    path('player/skip/', SkipSongView.as_view()),
    path('player/seek/', SeekPositionView.as_view()),

    path('player/volume/', SetVolumeView.as_view()),
    path('player/shuffle/', SetShuffleView.as_view()),
    path('player/repeat/', SetRepeatModeView.as_view()),

    path('player/queue/', QueueView.as_view()),
]
