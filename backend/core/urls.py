"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions

from spotify_auth.views import LogoutView

schema_view = get_schema_view(
    openapi.Info(
        title="WebPlayer API",
        default_version='v1',
        description="Spotify Web API adapter built with Django Rest Framework.",
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    path('admin/', admin.site.urls),
    # applications
    path('api/spotify/', include('spotify_adapter.urls')),
    path('api/auth/spotify/', include('spotify_auth.urls')),
    path('api/auth/logout', LogoutView.as_view(), name='logout'),
    # rest auth, all auth
    path('rest-auth/', include('dj_rest_auth.urls')),
    path('rest-auth/registration/', include('dj_rest_auth.registration.urls')),
    path('accounts/', include('allauth.urls')),
    # docs
    path(r'docs/swagger', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path(r'docs/redoc', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]

if not settings.DEBUG:
    # react static files
    urlpatterns += re_path('.*', TemplateView.as_view(template_name='index.html'))
