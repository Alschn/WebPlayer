from datetime import timedelta
from typing import Optional

from allauth.socialaccount.models import SocialToken, SocialAccount
from allauth.socialaccount.providers.spotify.views import SpotifyOAuth2Adapter
# noinspection PyUnresolvedReferences
from config import REDIRECT_URI, CLIENT_ID, CLIENT_SECRET, DOMAIN_URL
from django.utils import timezone
from requests import Request, post
from rest_auth.registration.serializers import SocialLoginSerializer
from rest_auth.registration.views import SocialLoginView
from rest_auth.views import LogoutView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .permissions import HasSpotifyToken
from .utils import (
    get_user_by_id,
    get_user_playlists,
    get_users_playlists,
    get_users_top_tracks,
    get_users_top_artists,
    get_user_devices,
    get_next_items,
    get_playlist,
    get_saved_items,
    get_album,
    get_user_token,
    set_repeat_mode,
    set_shuffle,
    set_volume,
    play_song_with_uri,
    prev_song,
    skip_song,
    pause_song,
    play_song,
    seek_position,
    select_device,
    create_playlist,
    update_playlist,
    get_artist,
)

SCOPES = [
    # listening history
    'user-read-recently-played', 'user-top-read', 'user-read-playback-position',
    # spotify connect
    "user-read-playback-state", "user-modify-playback-state", "user-read-currently-playing",
    # playback
    "app-remote-control", "streaming",
    # playlists
    "playlist-modify-public", "playlist-modify-private",
    "playlist-read-private", "playlist-read-collaborative",
    # follow
    "user-follow-modify", "user-follow-read",
    # library
    "user-library-modify", "user-library-read",
    # users
    "user-read-email", "user-read-private",
]


class GetSpotifyAuthURL(APIView):
    """api/spotify-url"""

    def get(self, request):
        """Client requests spotify url prepared by the backend."""

        scopes = ' '.join(SCOPES)
        url = Request('GET', 'https://accounts.spotify.com/authorize', params={
            'scope': scopes,
            'response_type': 'code',
            'redirect_uri': REDIRECT_URI,
            'client_id': CLIENT_ID
        }).prepare().url
        return Response({'url': url}, status=status.HTTP_200_OK)


class GetSpotifyAccessToken(APIView):
    """api/auth/spotify-token"""

    def post(self, request):
        """Sends authorization code to Spotify api endpoint.
        Responds with access_token, refresh_token, expires_in, token_type."""
        code = request.data.get('code')

        if code:
            response = post('https://accounts.spotify.com/api/token', data={
                'grant_type': 'authorization_code',
                'code': code,
                'redirect_uri': REDIRECT_URI,
                'client_id': CLIENT_ID,
                'client_secret': CLIENT_SECRET
            }).json()
            return Response(response, status=status.HTTP_200_OK)
        return Response({'Error': 'Code not found in request'}, status=status.HTTP_400_BAD_REQUEST)


class SpotifyLogin(SocialLoginView):
    """api/auth/login"""
    adapter_class = SpotifyOAuth2Adapter
    serializer_class = SocialLoginSerializer

    def post(self, request, *args, **kwargs):
        login_response = super(SpotifyLogin, self).post(request, *args, **kwargs)
        access_token = request.data.get("access_token")
        refresh_token = request.data.get("refresh_token")
        expires_in = request.data.get("expires_in")

        if not login_response.data.get('key'):
            return Response({'Error': "Key was not returned in response"}, status=status.HTTP_404_NOT_FOUND)

        token = SocialToken.objects.get(token=access_token)
        token.token_secret = refresh_token
        token.expires_at = timezone.now() + timedelta(seconds=expires_in)
        token.save(update_fields=['token_secret', 'expires_at'])
        return Response(login_response.data, status=status.HTTP_201_CREATED)

    # This fixes issue with login view in the latest version of drf
    def get_serializer(self, *args, **kwargs):
        serializer_class = self.get_serializer_class()
        kwargs['context'] = self.get_serializer_context()
        return serializer_class(*args, **kwargs)


class Logout(LogoutView):
    """api/auth/logout"""
    permission_classes = [IsAuthenticated]


class GetCurrentSpotifyToken(APIView):
    """api/spotify/token"""
    permission_classes = [IsAuthenticated, HasSpotifyToken]

    def get(self, request, *args, **kwargs):
        # permission granted, it means there is a token
        user = request.user
        token = get_user_token(user)
        return Response({'token': token.token}, status=status.HTTP_200_OK)


class PlaySong(APIView):
    """api/spotify/play"""
    permission_classes = [IsAuthenticated, HasSpotifyToken]

    def post(self, request, *args, **kwargs):
        sender = request.user
        uris = request.data.get('uris')
        context_uri = request.data.get('context_uri')
        if not uris:
            return Response({"error": 'Uri not found in request body!'}, status=status.HTTP_400_BAD_REQUEST)

        if context_uri:
            play_song_with_uri(sender, uris)
        else:
            play_song_with_uri(sender, uris, context_uri)
        return Response({'Success': f'Playing with uris: {str(uris)}'}, status=status.HTTP_204_NO_CONTENT)

    def put(self, request, *args, **kwargs):
        sender = request.user
        play_song(sender)
        return Response({'Success': 'Playing song'}, status=status.HTTP_204_NO_CONTENT)


class PauseSong(APIView):
    """api/spotify/pause"""
    permission_classes = [IsAuthenticated, HasSpotifyToken]

    def put(self, request, *args, **kwargs):
        sender = request.user
        pause_song(sender)
        return Response({'Success': 'Paused song'}, status=status.HTTP_204_NO_CONTENT)


class SkipSong(APIView):
    """api/spotify/skip"""
    permission_classes = [IsAuthenticated, HasSpotifyToken]

    def post(self, request, *args, **kwargs):
        sender = request.user
        if request.data['forward'] is False:
            prev_song(sender)
            return Response({'Message': 'Skipped song'}, status.HTTP_204_NO_CONTENT)

        skip_song(sender)
        return Response({'Message': 'Skipped song'}, status.HTTP_204_NO_CONTENT)


class SetVolume(APIView):
    """api/spotify/volume"""
    permission_classes = [IsAuthenticated, HasSpotifyToken]

    def put(self, request, *args, **kwargs):
        sender = request.user
        volume = request.data.get('volume')
        if isinstance(volume, int) and 0 <= volume <= 100:
            set_volume(sender, volume)
            return Response({"Message": f"Changed volume to {volume}"}, status=status.HTTP_204_NO_CONTENT)
        return Response({"error": 'Invalid volume parameter'}, status=status.HTTP_400_BAD_REQUEST)


class SetShuffle(APIView):
    """api/spotify/shuffle"""
    permission_classes = [IsAuthenticated, HasSpotifyToken]

    def put(self, request, *args, **kwargs):
        sender = request.user
        shuffle = request.data.get('shuffle')
        if shuffle is not None:
            set_shuffle(sender, shuffle)
            return Response({'Message': 'Changed shuffle mode'}, status=status.HTTP_200_OK)
        return Response({'error': 'Shuffle not found in request body!'}, status=status.HTTP_400_BAD_REQUEST)


class SetRepeatMode(APIView):
    """api/spotify/repeat"""
    permission_classes = [IsAuthenticated, HasSpotifyToken]

    def put(self, request, *args, **kwargs):
        sender = request.user
        mode = request.data.get('mode')
        if mode and mode in ['off', 'track', 'context']:
            set_repeat_mode(sender, mode)
            return Response({'Message': 'Changed repeat mode!'}, status=status.HTTP_200_OK)
        return Response({'error': 'Mode not found in request body!'}, status=status.HTTP_400_BAD_REQUEST)


class SeekPosition(APIView):
    """api/spotify/seek"""
    permission_classes = [IsAuthenticated, HasSpotifyToken]

    def put(self, request, *args, **kwargs):
        sender = request.user
        position_ms = request.data.get('position_ms')
        if isinstance(position_ms, int) and 0 <= position_ms:
            seek_position(sender, position_ms)
            return Response({'Message': f'Changed current position to {position_ms} [ms]!'}, status=status.HTTP_200_OK)
        return Response({'error': 'Position_ms not found in request body!'}, status=status.HTTP_400_BAD_REQUEST)


class AvailableDevices(APIView):
    """api/spotify/devices"""
    permission_classes = [IsAuthenticated, HasSpotifyToken]

    def get(self, request, *args, **kwargs):
        user = request.user
        devices = get_user_devices(user)
        return Response(devices, status=status.HTTP_200_OK)

    def put(self, request, *args, **kwargs):
        user = request.user
        device_id = request.data.get('device_id')
        if device_id:
            device = select_device(user, device_id)
            return Response(device, status=status.HTTP_200_OK)
        return Response({'error': 'Device_id not found in request body'}, status=status.HTTP_400_BAD_REQUEST)


class SearchForItems(APIView):
    pass


class AddToQueue(APIView):
    pass


class GetCurrentSong(APIView):
    pass


class GetPlaylist(APIView):
    """api/spotify/playlists/{playlist_id}"""
    permission_classes = [IsAuthenticated, HasSpotifyToken]

    def get(self, request, playlist_id):
        """Get a Playlist"""
        sender = request.user
        if playlist_id:
            playlist = get_playlist(sender, playlist_id)
            return Response(playlist, status=status.HTTP_200_OK)
        return Response({'error': 'Playlist id not found in query parameters!'}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, playlist_id, *args, **kwargs):
        """Add Items to a playlist"""
        return Response({}, status=status.HTTP_201_CREATED)

    def patch(self, request, playlist_id, *args, **kwargs):
        """Change a Playlist's Details"""
        sender = request.user
        req_data = request.data
        name: Optional[str] = req_data.get('name')
        public: Optional[bool] = req_data.get('public')
        collaborative: Optional[bool] = req_data.get('collaborative')
        description: Optional[str] = req_data.get('description')

        payload = {}

        if name and isinstance(name, str):
            payload['name'] = name
        if public is not None and isinstance(public, bool):
            payload['public'] = public
        if collaborative is not None and isinstance(public, bool):
            payload['collaborative'] = public
        if description and isinstance(description, str):
            payload['description'] = description

        update = update_playlist(sender, playlist_id, payload=payload)
        return Response(update, status=status.HTTP_200_OK)

    def put(self, request, playlist_id):
        sender = request.user
        next_tracks = request.data.get('next')
        if next_tracks:
            more_tracks = get_next_items(sender, next_tracks)
            return Response(more_tracks, status=status.HTTP_200_OK)
        return Response({'error': 'Next parameter not found in request body!'}, status=status.HTTP_400_BAD_REQUEST)


class GetRecommendations(APIView):
    pass


class GetUserPlaylists(APIView):
    """api/spotify/playlists"""
    permission_classes = [IsAuthenticated, HasSpotifyToken]

    def get(self, request):
        sender = request.user
        playlists = get_user_playlists(sender)
        return Response(playlists, status=status.HTTP_200_OK)

    def put(self, request):
        sender = request.user
        next_playlists = request.data.get('next')
        if next_playlists:
            playlists = get_next_items(sender, href=next_playlists)
            return Response(playlists, status=status.HTTP_200_OK)
        return Response({'error': 'Next parameter not found in request body!'}, status=status.HTTP_400_BAD_REQUEST)


class GetSavedItems(APIView):
    """api/spotify/saved"""
    def get(self, request):
        sender = request.user
        saved_tracks = get_saved_items(sender)
        return Response(saved_tracks, status=status.HTTP_200_OK)

    def put(self, request):
        sender = request.user
        next_tracks = request.data.get('next')
        if next_tracks:
            tracks = get_next_items(sender, href=next_tracks)
            return Response(tracks, status=status.HTTP_200_OK)
        return Response({'error': 'Next parameter not found in request body!'}, status=status.HTTP_400_BAD_REQUEST)


class GetCurrentUser(APIView):
    """api/spotify/users"""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        social = SocialAccount.objects.filter(user=user)
        if social.exists():
            social_acc = social.first()
            user_data = social_acc.extra_data
            image = user_data.get('images')
            try:
                image = image[0].get('url')
            except Exception:
                pass
            followers = user_data.get('followers').get('total')
            return Response({
                'username': user_data.get('display_name'),
                'imageURL': image,
                'id': user_data.get('id'),
                'followers': followers,
            }, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_404_NOT_FOUND)


class GetUser(APIView):
    """api/spotify/users/{user_id}"""
    permission_classes = [IsAuthenticated, HasSpotifyToken]

    def get(self, request, user_id):
        sender = request.user
        if user_id:
            user = get_user_by_id(sender, user_id)
            return Response(user, status=status.HTTP_200_OK)
        return Response({'error': 'User id not found in query parameters!'}, status=status.HTTP_400_BAD_REQUEST)


class UsersPlaylists(APIView):
    """api/spotify/users/{user_id}/playlists"""
    permission_classes = [IsAuthenticated, HasSpotifyToken]

    def get(self, request, user_id, *args, **kwargs):
        sender = request.user
        playlists = get_users_playlists(sender, user_id)
        return Response(playlists, status=status.HTTP_200_OK)

    def post(self, request, user_id, *args, **kwargs):
        sender = request.user
        playlist_name = request.data.get('name')
        if not playlist_name:
            return Response({'error': 'Playlist name not found in request!'}, status=status.HTTP_400_BAD_REQUEST)
        new_playlist = create_playlist(sender, user_id, playlist_name)
        return Response(new_playlist, status=status.HTTP_201_CREATED)


class FollowOthers(APIView):
    """api/spotify/follow/{ids}"""
    # to do

    def get(self):
        # Checks if given artists/users are followed
        return Response({}, status.HTTP_200_OK)

    def put(self):
        # Follow given artists/users
        return Response({}, status.HTTP_200_OK)

    def delete(self):
        # Unfollow given artists/users
        return Response({}, status.HTTP_204_NO_CONTENT)


class GetArtist(APIView):
    """api/spotify/artists/{artist_id}"""
    permission_classes = [IsAuthenticated, HasSpotifyToken]

    def get(self, request, artist_id, *args, **kwargs):
        artist = get_artist(request.user, artist_id)
        return Response(artist, status=status.HTTP_200_OK)


class GetArtistsTopTracks(APIView):
    """api/spotify/artists/{artist_id}/tracks"""
    permission_classes = [IsAuthenticated, HasSpotifyToken]

    def get(self, request, artist_id, *args, **kwargs):
        artist_top = get_artist(request.user, artist_id, endpoint_type='/top-tracks')
        return Response(artist_top, status=status.HTTP_200_OK)


class GetArtistsAlbums(APIView):
    """api/spotify/artists/{artist_id}/albums"""
    permission_classes = [IsAuthenticated, HasSpotifyToken]

    def get(self, request, artist_id, *args, **kwargs):
        include_groups = request.query_params.get('include_groups')

        artist_albums = get_artist(
            request.user, artist_id, endpoint_type='/albums',
            include_groups=include_groups
        )
        return Response(artist_albums, status=status.HTTP_200_OK)


class GetRelatedArtists(APIView):
    """api/spotify/artists/{artist_id}/related-artists"""
    permission_classes = [IsAuthenticated, HasSpotifyToken]

    def get(self, request, artist_id, *args, **kwargs):
        related_artists = get_artist(request.user, artist_id, endpoint_type='/related-artists')
        return Response(related_artists, status=status.HTTP_200_OK)


class GetAlbum(APIView):
    """api/spotify/albums/{album_id}"""
    permission_classes = [IsAuthenticated, HasSpotifyToken]

    def get(self, request, album_id):
        sender = request.user
        saved_tracks = get_album(sender, album_id)
        return Response(saved_tracks, status=status.HTTP_200_OK)

    def put(self, request, album_id):
        sender = request.user
        next_tracks = request.data.get('next')
        if next_tracks and album_id:
            more_tracks = get_next_items(sender, href=next_tracks)
            return Response(more_tracks, status=status.HTTP_200_OK)
        return Response({'error': 'Album id not found in query parameters!'}, status=status.HTTP_400_BAD_REQUEST)


class GetTopTracks(APIView):
    """api/spotify/top/tracks"""
    permission_classes = [IsAuthenticated, HasSpotifyToken]

    def get(self, request, *args, **kwargs):
        limit = request.query_params.get('limit')
        sender = request.user
        tracks = get_users_top_tracks(sender, limit=limit) if limit else get_users_top_tracks(sender)
        return Response(tracks, status=status.HTTP_200_OK)

    def put(self, request, *args, **kwargs):
        return Response({}, status=status.HTTP_200_OK)


class GetTopArtists(APIView):
    """api/spotify/top/artists"""
    permission_classes = [IsAuthenticated, HasSpotifyToken]

    def get(self, request, *args, **kwargs):
        limit = request.query_params.get('limit')
        sender = request.user
        artists = get_users_top_artists(sender, limit=limit) if limit else get_users_top_artists(sender)
        return Response(artists, status=status.HTTP_200_OK)

    def put(self, request, *args, **kwargs):
        return Response({}, status=status.HTTP_200_OK)
