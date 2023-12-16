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
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include

from core.schema.views import (
    SchemaAPIView,
    SchemaRedocView,
    SchemaSwaggerView
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('accounts.urls')),
    path('api/spotify/', include('spotify_adapter.urls')),
    path('api/auth/spotify/', include('spotify_auth.urls')),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

if settings.DEBUG:
    urlpatterns += [
        # docs
        path('schema/', SchemaAPIView.as_view(), name='schema'),
        path('schema/swagger/', SchemaSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
        path('schema/redoc/', SchemaRedocView.as_view(url_name='schema'), name='redoc'),
    ]
