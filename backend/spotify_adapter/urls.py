from django.urls import path

from spotify_adapter.views.albums import (
    AlbumsDetailView,
    AlbumsDetailTracksView,
    AlbumsView,
    CurrentUserAlbumsView,
    CurrentUserAlbumsContainsView,
    NewReleasesView,
)
from spotify_adapter.views.artists import (
    ArtistsView,
    ArtistsDetailView,
    ArtistsDetailAlbumsView,
    ArtistsDetailRelatedArtistsView,
    ArtistsDetailTracks
)
from spotify_adapter.views.player import (
    PlayerView,
    PlayerRecentlyPlayedView,
    PlayerCurrentlyPlayingView,
    PlayerDevices,
    PlayerSkipToNextView,
    PlayerPausePlaybackView,
    PlayerStartResumePlayback,
    PlayerSkipToPreviousView,
    PlayerQueueView,
    PlayerRepeatView,
    PlayerSeekPositionView,
    PlayerShuffleView,
    PlayerVolumeView,
)
from spotify_adapter.views.playlists import (
    CategoriesDetailPlaylistsView,
    FeaturedPlaylistsView,
    PlaylistsDetailImagesView,
    PlaylistsDetailTracksView,
    UsersPlaylistsView,
    PlaylistDetailView,
    CurrentUserPlaylistsView,
)
from spotify_adapter.views.search import SearchView
from spotify_adapter.views.tracks import (
    TrackDetailView,
    TracksView,
    MeTracksContainsView,
    AudioFeaturesDetailView,
    AudioFeaturesView,
    AudioAnalysisDetailView,
    RecommendationsView,
    CurrentUserSavedTracksView,
)
from spotify_adapter.views.users import (
    CurrentUserFollowing,
    CurrentUserFollowingContainsView,
    UsersDetailView,
    CurrentUserView,
    CurrentUserTopTracksView,
    PlaylistDetailFollowersContainsView,
    PlaylistDetailFollowersView,
)
from spotify_adapter.views.users.me_top_artists import CurrentUserTopArtistsView

urlpatterns = [
    # Albums
    path('albums/', AlbumsView.as_view()),
    path('albums/<str:album_id>/', AlbumsDetailView.as_view()),
    path('albums/<str:album_id>/tracks/', AlbumsDetailTracksView.as_view()),
    path('me/albums/', CurrentUserAlbumsView.as_view()),
    path('me/albums/contains/', CurrentUserAlbumsContainsView.as_view()),
    path('browse/new-releases/', NewReleasesView.as_view()),

    # Artists
    path('artists/', ArtistsView.as_view()),
    path('artists/<str:artist_id>/', ArtistsDetailView.as_view()),
    path('artists/<str:artist_id>/albums/', ArtistsDetailAlbumsView.as_view()),
    path('artists/<str:artist_id>/top-tracks/', ArtistsDetailTracks.as_view()),
    path('artists/<str:artist_id>/related-artists/', ArtistsDetailRelatedArtistsView.as_view()),

    # Audiobooks
    # todo: implement

    # Categories
    # todo: implement

    # Chapters
    # todo: implement

    # Episodes
    # todo: implement

    # Genres
    # todo: implement

    # Markets
    # todo: implement

    # Player
    path('me/player/', PlayerView.as_view()),
    path('me/player/devices/', PlayerDevices.as_view()),
    path('me/player/currently-playing/', PlayerCurrentlyPlayingView.as_view()),
    path('me/player/play/', PlayerStartResumePlayback.as_view()),
    path('me/player/pause/', PlayerPausePlaybackView.as_view()),
    path('me/player/next/', PlayerSkipToNextView.as_view()),
    path('me/player/previous/', PlayerSkipToPreviousView.as_view()),
    path('me/player/seek/', PlayerSeekPositionView.as_view()),
    path('me/player/repeat/', PlayerRepeatView.as_view()),
    path('me/player/volume/', PlayerVolumeView.as_view()),
    path('me/player/shuffle/', PlayerShuffleView.as_view()),
    path('me/player/recently-played/', PlayerRecentlyPlayedView.as_view()),
    path('me/player/queue/', PlayerQueueView.as_view()),

    # Playlists
    path('me/playlists/', CurrentUserPlaylistsView.as_view()),
    path('playlists/<str:playlist_id>/', PlaylistDetailView.as_view()),
    path('playlists/<str:playlist_id>/tracks/', PlaylistsDetailTracksView.as_view()),
    path('playlists/<str:playlist_id>/images/', PlaylistsDetailImagesView.as_view()),
    path('users/<str:user_id>/playlists/', UsersPlaylistsView.as_view()),
    path('browse/featured-playlists/', FeaturedPlaylistsView.as_view()),
    path('browse/categories/<str:category_id>/playlists/', CategoriesDetailPlaylistsView.as_view()),

    # Search
    path('search/', SearchView.as_view()),

    # Shows
    # todo: implement

    # Tracks
    path('me/tracks/', CurrentUserSavedTracksView.as_view()),
    path('me/tracks/contains/', MeTracksContainsView.as_view()),
    path('tracks/', TracksView.as_view()),
    path('tracks/<str:track_id>/', TrackDetailView.as_view()),
    path('audio-features/', AudioFeaturesView.as_view()),
    path('audio-features/<str:track_id>/', AudioFeaturesDetailView.as_view()),
    path('audio-analysis/<str:track_id>/', AudioAnalysisDetailView.as_view()),
    path('recommendations/', RecommendationsView.as_view()),

    # Users
    path('me/', CurrentUserView.as_view()),
    path('me/top/artists/', CurrentUserTopArtistsView.as_view()),
    path('me/top/tracks/', CurrentUserTopTracksView.as_view()),
    path('me/following/', CurrentUserFollowing.as_view()),
    path('me/following/contains/', CurrentUserFollowingContainsView.as_view()),
    path('users/<str:user_id>/', UsersDetailView.as_view()),
    path('playlists/<str:playlist_id>/followers/', PlaylistDetailFollowersView.as_view()),
    path('playlists/<str:playlist_id>/followers/contains/', PlaylistDetailFollowersContainsView.as_view()),
]
