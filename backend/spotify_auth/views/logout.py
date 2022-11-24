from dj_rest_auth.views import LogoutView as BaseLogoutView
from rest_framework.permissions import IsAuthenticated


class LogoutView(BaseLogoutView):
    """/api/auth/logout/"""

    permission_classes = [IsAuthenticated]
