<div align="center">
    <h1>Web Player</h1>
    <img alt="Python" src="https://img.shields.io/badge/python%20-%2314354C.svg?&style=for-the-badge&logo=python&logoColor=white"/>
    <img alt="Django" src="https://img.shields.io/badge/django%20-%23092E20.svg?&style=for-the-badge&logo=django&logoColor=white"/>
    <img alt="Typescript" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/>&nbsp;
    <img alt="React" src="https://img.shields.io/badge/react%20-%2320232a.svg?&style=for-the-badge&logo=react&logoColor=%2361DAFB"/>
    <img alt="Spotify" src="https://img.shields.io/badge/Spotify-1ED760?style=for-the-badge&logo=spotify&logoColor=white" />
    <p>Spotify Clone with Django as a backend and React as a frontend.</p>
</div>

## Used frameworks, libraries and tools:

#### Backend:
- Django + Django Rest Framework

#### Frontend:
- React
- Typescript
- Sass
- Axios

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
Run migrations and create superuser:
```shell script
python manage.py migrate  

python manage.py createsuperuser  
```

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

Then collect all static files with Django
```shell script
python manage.py collectstatic
```

Run backend server (while in backend folder). React server is not required because the static files are already there.
```shell script
python manage.py runserver
```

#### Local development
Set DEBUG=False in Django settings. Server's port is 8000 and client's port is 3000.
```shell script
cd frontend
npm start
```

```shell script
cd backend
python manage.py runserver
```
