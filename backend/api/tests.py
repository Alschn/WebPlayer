from django.test import TestCase
from rest_framework.test import APIClient

API_URL = 'http://localhost:8000/api'


class APIViews(TestCase):
    def setUp(self) -> None:
        self.client = APIClient()

    def test_simple(self):
        self.assertTrue(1 == 1)
