<div align="center">
    <h1>Web Player</h1>
    <p>Spotify Clone with Django as a backend and React as a frontend.</p>
    <img alt="Python" src="https://img.shields.io/badge/python%20-%2314354C.svg?&style=for-the-badge&logo=python&logoColor=white"/>
    <img alt="Django" src="https://img.shields.io/badge/django%20-%23092E20.svg?&style=for-the-badge&logo=django&logoColor=white"/>
    <img alt="Typescript" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/>&nbsp;
    <img alt="React" src="https://img.shields.io/badge/react%20-%2320232a.svg?&style=for-the-badge&logo=react&logoColor=%2361DAFB"/>
    <img alt="SCSS" src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white"/>
    <img alt="Spotify" src="https://img.shields.io/badge/Spotify-1ED760?style=for-the-badge&logo=spotify&logoColor=white" />
</div>

## Used frameworks, libraries and tools:

#### Backend:
- Django + Django Rest Framework
- django-all-auth, django-rest-auth

#### Frontend:
- React
- React-router-dom
- Typescript
- Sass
- Material UI
- Axios
- react-spotify-web-playback-sdk

#### External APIs:
- Spotify Web API
- Spotify Web Playback SDK

## Installation:

### Django Setup
Setup virtual environment (Windows) and install dependencies:
```shell script
cd backend

py -3 -m venv venv  

venv\Scripts\activate  

pip install -r requirements.txt  
```
Create `.env` file in `backend` directory and set following variables in plain text
```shell script
CLIENT_ID='id from spotify dashboard'
CLIENT_SECRET='secret from spotify dashboard'
REDIRECT_URI='redirect uri set in spotify dashboard (port 8000)'
REDIRECT_URI_DEV='other direct uri for development (port 3000)'
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

### React Setup
Install all dependencies:
```shell script
cd frontend

npm i
```

## Run application

#### Production build
First build React files
```shell script
npm run build
```

Then collect all static files with Django. 
If you want to avoid user prompt use one following flags: `--noinput`, `--no-input` with a command below.
```shell script
python manage.py collectstatic
```

Run backend server (while in backend folder). React server is not required because the static files are already there.
```shell script
python manage.py runserver
```

#### Local development
Client in development mode runs on port 3000. In order to access API, server has to be running as well, 
otherwise any request fired at localhost will fail.
```shell script
cd frontend
npm start
```

Set DEBUG=True in Django's settings. Server by default runs on port 8000.
```shell script
cd backend
python manage.py runserver
```
