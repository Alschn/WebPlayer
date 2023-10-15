from typing import Any, TypedDict

from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import exception_handler as drf_exception_handler, APIView
from spotipy import SpotifyException


class ExceptionHandlerContext(TypedDict):
    view: APIView
    args: tuple[Any, ...]
    kwargs: dict[str, Any]
    request: Request


def exception_handler(exc: Any, context: ExceptionHandlerContext) -> Response | None:
    if type(exc) == SpotifyException:
        spotipy_exc: SpotifyException = exc
        response = Response(
            {
                'status_code': spotipy_exc.http_status,
                'code': spotipy_exc.code,
                'message': spotipy_exc.msg,
                'reason': spotipy_exc.reason,
            },
            status=status.HTTP_503_SERVICE_UNAVAILABLE
        )
        return response

    return drf_exception_handler(exc, context)
