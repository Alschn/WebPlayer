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

from core.schema.views import (
    SchemaAPIView,
    SchemaRedocView,
    SchemaSwaggerView
)
from spotify_auth.views import LogoutView

urlpatterns = [
    path('admin/', admin.site.urls),

    # applications
    path('api/spotify/', include('spotify_adapter.urls')),
    path('api/auth/spotify/', include('spotify_auth.urls')),
    path('api/auth/logout/', LogoutView.as_view(), name='logout'),

    # docs
    path('schema/', SchemaAPIView.as_view(), name='schema'),
    path('schema/swagger/', SchemaSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('schema/redoc/', SchemaRedocView.as_view(url_name='schema'), name='redoc'),
]

if not settings.DEBUG:
    # react static files
    urlpatterns += re_path('.*', TemplateView.as_view(template_name='index.html'))
