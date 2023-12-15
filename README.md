<div align="center">
    <h1>Web Player</h1>
    <p>Spotify Clone with Django as a backend and Next.js as a frontend.</p>
    <img alt="Python" src="https://img.shields.io/badge/python%20-%2314354C.svg?&style=for-the-badge&logo=python&logoColor=white"/>
    <img alt="Django" src="https://img.shields.io/badge/django%20-%23092E20.svg?&style=for-the-badge&logo=django&logoColor=white"/>
    <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt=""/>    
    <img src="https://img.shields.io/badge/Docker-008FCC?style=for-the-badge&logo=docker&logoColor=white" alt=""/>
    <img alt="Typescript" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/>&nbsp;
    <img alt="Next.js" src="https://img.shields.io/badge/Next.js-%23000000.svg?&style=for-the-badge&logo=next.js&logoColor=white"/>    
    <img alt="TailwindCSS" src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"/>
    <img alt="Spotify" src="https://img.shields.io/badge/Spotify-1ED760?style=for-the-badge&logo=spotify&logoColor=white" />
    <img src="https://img.shields.io/badge/Railway-%23000000.svg?&style=for-the-badge&logo=railway&logoColor=white" alt=""/>
    <img src="https://img.shields.io/badge/Vercel-%23000000.svg?&style=for-the-badge&logo=vercel&logoColor=white" alt=""/>
</div>

## Frameworks, libraries and tools:

#### Backend:

- `django`, `djangorestframework`
- `django-all-auth`, `dj-rest-auth`
- `spotipy`
- ...

#### Frontend:

- `next`
- `tailwind-css`, `shadcn`
- `axios`
- `react-spotify-web-playback-sdk`
- ...

#### External APIs:

- [Spotify Web API](https://developer.spotify.com/documentation/web-api/)
- [Spotify Web Playback SDK](https://developer.spotify.com/documentation/web-playback-sdk/)

## Installation

...prerequisites

### Backend Setup

Setup virtual environment and install dependencies:

```shell script
cd backend

mkdir .venv

pipenv shell

pipenv install
```

Create `.env` file in `backend` directory and set following variables in plain text

```shell script
SECRET_KEY=your_secret_key
DEBUG=True
USE_LOCAL_SQLITE_DB=True
CORS_ALLOW_ALL_ORIGINS=True

SPOTIFY_CLIENT_ID='id from spotify dashboard'
SPOTIFY_CLIENT_SECRET='secret from spotify dashboard'
SPOTIFY_REDIRECT_URI='redirect uri set in spotify dashboard (port 3000)'
```

Run migrations and create superuser:

```shell script
python manage.py makemigrations

python manage.py migrate  

python manage.py createsuperuser  
```

Run server, go to admin page and log in with superuser's credentials.
Create new Social Account with **Provider** - Spotify, any **Name**,
**client_id** from Spotify Dashboard and select default **Site**.

### Frontend Setup

Install all dependencies:

```shell script
cd frontend

pnpm install
```

Create `.env` file in `frontend` directory and set following variables:

```dotenv
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Run development server:

```shell script
pnpm dev
```
