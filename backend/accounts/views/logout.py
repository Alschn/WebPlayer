from dj_rest_auth.views import LogoutView as BaseLogoutView
from rest_framework.permissions import IsAuthenticated


class LogoutAPIView(BaseLogoutView):
    """
    POST    /api/auth/logout/   - Logs out current user
    """
    permission_classes = [IsAuthenticated]
    http_method_names = ('post',)
