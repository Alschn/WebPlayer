import os

from django.conf import settings
from dotenv import load_dotenv

load_dotenv()

REDIRECT_URI = os.environ.get('REDIRECT_URI_DEV') if settings.DEBUG else os.environ.get('REDIRECT_URI')
CLIENT_ID = os.environ.get('CLIENT_ID')
CLIENT_SECRET = os.environ.get('CLIENT_SECRET')
DOMAIN_URL = 'http://localhost:8000' if settings.DEBUG else ''
