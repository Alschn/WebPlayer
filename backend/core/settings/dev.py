"""
Django settings for backend project.

Generated by 'django-admin startproject' using Django 4.2.2.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""
import os
from pathlib import Path

from environ import Env

BASE_DIR = Path(__file__).resolve().parent.parent.parent

env = Env()
env.read_env(BASE_DIR / '.env')

ROOT_DIR = BASE_DIR.parent

SECRET_KEY = env('SECRET_KEY')

DEBUG = env.bool('DEBUG', default=False)

ALLOWED_HOSTS = env.list('ALLOWED_HOSTS', default=[])

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',

    # rest_framework
    'rest_framework',
    'rest_framework.authtoken',

    # django utils
    'django_filters',
    'django_extensions',

    # cors headers
    'corsheaders',

    # rest_auth
    'dj_rest_auth',
    'dj_rest_auth.registration',

    # all_auth
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.spotify',

    # openapi documentation
    'drf_spectacular',

    # apps
    'accounts',
    'spotify_adapter',
    'spotify_auth',
]

MIDDLEWARE = [
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'allauth.account.middleware.AccountMiddleware'
]

ROOT_URLCONF = 'core.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'core.wsgi.application'

# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

IS_GITHUB_WORKFLOW = env('GITHUB_WORKFLOW', default=None)

USE_LOCAL_SQLITE_DB = env.bool('USE_LOCAL_SQLITE_DB', default=False)

DATABASE_URL = env('DATABASE_URL', default=None)

if IS_GITHUB_WORKFLOW:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': 'github_actions',
            'USER': 'postgres',
            'PASSWORD': 'postgres',
            'HOST': '127.0.0.1',
            'PORT': '5432',
        }
    }

elif DATABASE_URL:
    db_from_env = dj_database_url.config(
        default=DATABASE_URL,
        conn_max_age=500,
        conn_health_checks=True,
        ssl_require=True
    )
    DATABASES = {
        'default': db_from_env
    }

elif USE_LOCAL_SQLITE_DB:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
            'TEST': {
                'NAME': BASE_DIR / 'test_db.sqlite3',
            }
        }
    }

else:
    DATABASES = {
        'default': {
            'ENGINE': env('DB_ENGINE'),
            'NAME': env('DB_NAME'),
            'USER': env('DB_USER'),
            'PASSWORD': env('DB_PASSWORD'),
            'HOST': env('DB_HOST'),
            'PORT': env.int('DB_PORT'),
        }
    }

# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Europe/Warsaw'

USE_I18N = True

USE_L10N = True

USE_TZ = True

# Custom user
# https://docs.djangoproject.com/en/4.2/topics/auth/customizing/

AUTH_USER_MODEL = 'accounts.User'

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = '/static/'

STATIC_ROOT = os.path.join(ROOT_DIR, 'staticfiles')

STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Authentication backends
# https://django-allauth.readthedocs.io/en/latest/configuration.html

AUTHENTICATION_BACKENDS = [
    # Needed to log in by username in Django admin, regardless of `allauth`
    'django.contrib.auth.backends.ModelBackend',

    # `allauth` specific authentication methods, such as login by e-mail
    'allauth.account.auth_backends.AuthenticationBackend',
]

# Django REST Framework settings
# https://www.django-rest-framework.org/api-guide/settings/

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': (
        ('rest_framework.permissions.AllowAny',)
    ),

    'DEFAULT_AUTHENTICATION_CLASSES': (
        ('rest_framework.authentication.TokenAuthentication',)
    ),

    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',

    'EXCEPTION_HANDLER': 'core.shared.exceptions.exception_handler'
}

# django-allauth settings
# https://docs.allauth.org/en/latest/account/configuration.html
# https://docs.allauth.org/en/latest/socialaccount/configuration.html

ACCOUNT_ADAPTER = 'accounts.adapters.AccountAdapter'

ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_EMAIL_VERIFICATION = 'none'  # do not send email confirmation

SOCIALACCOUNT_ADAPTER = 'accounts.adapters.SocialAccountAdapter'

# dj-rest-auth settings
# https://dj-rest-auth.readthedocs.io/en/latest/configuration.html#configuration

REST_AUTH = {

}

# DRF spectacular settings
# https://drf-spectacular.readthedocs.io/en/latest/settings.html

SPECTACULAR_SETTINGS = {
    'TITLE': 'WebPlayer API',
    'DESCRIPTION': 'Spotify Web API adapter built with Django Rest Framework.',
    'VERSION': '1.0.0',
    'SERVE_INCLUDE_SCHEMA': False,
    'SCHEMA_PATH_PREFIX': '/api/',
}

# CORS headers
# https://pypi.org/project/django-cors-headers/

CORS_ALLOW_ALL_ORIGINS = env.bool('CORS_ALLOW_ALL_ORIGINS', default=False)

CORS_ALLOWED_ORIGINS = env.list('CORS_ALLOWED_ORIGINS', default=[])

CORS_ORIGIN_WHITELIST = env.list('CORS_ORIGIN_WHITELIST', default=[])

CORS_ORIGIN_REGEX_WHITELIST = env.list('CORS_ORIGIN_REGEX_WHITELIST', default=[])

# django.contrib.sites settings
# https://docs.djangoproject.com/en/4.2/ref/contrib/sites/

SITE_ID = 1

# Spotify API related settings
# https://developer.spotify.com/documentation/general/guides/authorization-guide/

SPOTIFY_REDIRECT_URI = env('SPOTIFY_REDIRECT_URI')

SPOTIFY_CLIENT_ID = env('SPOTIFY_CLIENT_ID')

SPOTIFY_CLIENT_SECRET = env('SPOTIFY_CLIENT_SECRET')
