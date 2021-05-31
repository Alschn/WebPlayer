from datetime import timedelta

from allauth.socialaccount.models import SocialToken, SocialAccount
from allauth.socialaccount.providers.spotify.views import SpotifyOAuth2Adapter
# noinspection PyUnresolvedReferences
from config import REDIRECT_URI, CLIENT_ID, CLIENT_SECRET, DOMAIN_URL
from django.utils import timezone
from requests import Request, post
from rest_auth.registration.serializers import SocialLoginSerializer
from rest_auth.registration.views import SocialLoginView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .permissions import HasSpotifyToken
from .utils import get_user_playlists, get_next_items, get_playlist, get_user_by_id

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
        code = request.data.get('code', None)

        if code:
            response = post('https://accounts.spotify.com/api/token', data={
                'grant_type': 'authorization_code',
                'code': code,
                'redirect_uri': REDIRECT_URI,
                'client_id': CLIENT_ID,
                'client_secret': CLIENT_SECRET
            }).json()
            return Response(response, status=status.HTTP_200_OK)
        else:
            return Response({'Error': 'Code not found in request'}, status=status.HTTP_400_BAD_REQUEST)


class SpotifyLoginHandler(APIView):
    """api/auth/spotify-login.
    SpotifyLogin wrapper"""

    def post(self, request):
        access_token = request.data.get("access_token")
        refresh_token = request.data.get("refresh_token")
        expires_in = request.data.get("expires_in")

        auth_response = post(f'{DOMAIN_URL}/api/auth/login', data={
            'access_token': access_token,
            'refresh_token': refresh_token,
            'expires_in': expires_in,
        })

        if not auth_response.ok:
            return Response(auth_response, status=status.HTTP_400_BAD_REQUEST)

        response = auth_response.json()
        if 'key' in response:
            token = SocialToken.objects.get(token=access_token)
            token.token_secret = refresh_token
            token.expires_at = timezone.now() + timedelta(seconds=expires_in)
            token.save()
            return Response(response, status=status.HTTP_201_CREATED)
        return Response({'Error': "Key was not returned in response"}, status=auth_response.status_code)


class SpotifyLogin(SocialLoginView):
    """api/auth/login"""
    adapter_class = SpotifyOAuth2Adapter
    serializer_class = SocialLoginSerializer

    # This fixes issue with login view in the latest version of drf
    def get_serializer(self, *args, **kwargs):
        serializer_class = self.get_serializer_class()
        kwargs['context'] = self.get_serializer_context()
        return serializer_class(*args, **kwargs)


class PlaySong(APIView):
    pass


class PauseSong(APIView):
    pass


class SkipSong(APIView):
    pass


class SetVolume(APIView):
    pass


class SetPlaybackMode(APIView):
    pass


class SetRepeatMode(APIView):
    pass


class GetAvailableDevices(APIView):
    pass


class SearchForItems(APIView):
    pass


class AddToQueue(APIView):
    pass


class GetCurrentSong(APIView):
    pass


class GetPlaylist(APIView):
    permission_classes = [IsAuthenticated, HasSpotifyToken]

    def get(self, request, id):
        sender = request.user
        playlist_id = id
        if playlist_id:
            playlist = get_playlist(sender, playlist_id)
            return Response(playlist, status=status.HTTP_200_OK)
        return Response({'error': 'Playlist id not found in request body!'}, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id):
        sender = request.user
        playlist_id = id
        next_tracks = request.data.get('next', None)
        if next_tracks and playlist_id:
            more_tracks = get_next_items(sender, next_tracks)
            return Response(more_tracks, status=status.HTTP_200_OK)
        return Response({'error': 'Playlist id not found in request body!'}, status=status.HTTP_400_BAD_REQUEST)


class GetRecommendations(APIView):
    pass


class GetUserPlaylists(APIView):
    permission_classes = [IsAuthenticated, HasSpotifyToken]

    def get(self, request):
        sender = request.user
        playlists = get_user_playlists(sender)

        return Response(playlists, status=status.HTTP_200_OK)

    def put(self, request):
        sender = request.user
        next = request.data.get('next', None)
        if next:
            playlists = get_next_items(sender, href=next)
            return Response(playlists, status=status.HTTP_200_OK)
        return Response({'error': 'Next parameter not found in request body!'}, status=status.HTTP_400_BAD_REQUEST)


class GetUserLibrary(APIView):
    pass


class GetCurrentUser(APIView):
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
                'username': user_data.get('display_name', None),
                'imageURL': image,
                'id': user_data.get('id', None),
                'followers': followers,
            }, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_404_NOT_FOUND)


class GetUser(APIView):
    permission_classes = [IsAuthenticated, HasSpotifyToken]

    def get(self, request, id):
        sender = request.user
        user_id = id
        if user_id:
            user = get_user_by_id(sender, user_id)
            return Response(user, status=status.HTTP_200_OK)
        return Response({'error': 'User id not found in request!'}, status=status.HTTP_400_BAD_REQUEST)


class GetArtist(APIView):
    pass


class GetTopTracks(APIView):
    pass


class GetTopArtists(APIView):
    pass
