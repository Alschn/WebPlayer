from typing import Any

from django.utils.translation import gettext_lazy as _
from drf_spectacular.utils import extend_schema
from rest_framework import status, serializers
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from spotify_adapter.serializers.artists import ArtistAlbumsPageSerializer
from spotify_adapter.serializers.spotify import MarketField, LimitField, OffsetField
from spotify_adapter.utils import get_spotify_client
from spotify_auth.permissions import HasSpotifyToken


class ArtistsDetailAlbumsParamsSerializer(serializers.Serializer):
    include_groups = serializers.MultipleChoiceField(
        required=False,
        choices=['album', 'single', 'appears_on', 'compilation'],
        help_text=_(
            'A comma-separated list of keywords that will be used to filter the response. '
            'If not supplied, all album types will be returned.'
        )
    )
    market = MarketField()
    limit = LimitField()
    offset = OffsetField()


class ArtistsDetailAlbumsView(APIView):
    """
    GET     /api/spotify/artists/<str:artist_id>/albums/    - get artist's albums

    Reference:
    https://developer.spotify.com/documentation/web-api/reference/get-an-artists-albums
    """
    permission_classes = [IsAuthenticated, HasSpotifyToken]

    @extend_schema(
        parameters=[ArtistsDetailAlbumsParamsSerializer],
        responses={status.HTTP_200_OK: ArtistAlbumsPageSerializer},
    )
    def get(self, request: Request, artist_id: str, *args: Any, **kwargs: Any) -> Response:
        serializer = ArtistsDetailAlbumsParamsSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)

        album_type = serializer.validated_data.get('include_groups')
        market = serializer.validated_data.get('market')
        limit = serializer.validated_data.get('limit')
        offset = serializer.validated_data.get('offset')

        client = get_spotify_client(request.user)
        data = client.artist_albums(
            artist_id,
            album_type=album_type,
            country=market,
            limit=limit,
            offset=offset
        )
        return Response(data, status=status.HTTP_200_OK)
