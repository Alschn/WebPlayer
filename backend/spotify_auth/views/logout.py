from dj_rest_auth.views import LogoutView as BaseLogoutView
from rest_framework.permissions import IsAuthenticated


class LogoutView(BaseLogoutView):
    """
    POST    /api/auth/logout/   - Logs out current user
    """
    permission_classes = [IsAuthenticated]
