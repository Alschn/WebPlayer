from django.urls import path

from accounts.views import LogoutAPIView

urlpatterns = [
    path('auth/logout/', LogoutAPIView.as_view(), name='logout'),
]
