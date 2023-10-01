"""
Open API schema generation related code.
https://drf-spectacular.readthedocs.io/en/latest/
"""
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView
)


class SchemaAPIView(SpectacularAPIView):
    pass


class SchemaSwaggerView(SpectacularSwaggerView):
    pass


class SchemaRedocView(SpectacularRedocView):
    pass
