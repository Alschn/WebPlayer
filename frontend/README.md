<<<<<<< HEAD
<div align="center">
    <h1>Web Player</h1>
    <img alt="Python" src="https://img.shields.io/badge/python%20-%2314354C.svg?&style=for-the-badge&logo=python&logoColor=white"/>
    <img alt="Django" src="https://img.shields.io/badge/django%20-%23092E20.svg?&style=for-the-badge&logo=django&logoColor=white"/>
    <img alt="Typescript" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/>&nbsp;
    <img alt="React" src="https://img.shields.io/badge/react%20-%2320232a.svg?&style=for-the-badge&logo=react&logoColor=%2361DAFB"/>
    <img alt="Spotify" src="https://img.shields.io/badge/Spotify-1ED760?style=for-the-badge&logo=spotify&logoColor=white" />
</div>

## Description:
Spotify Clone with Django as a backend and React as a frontend.

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


=======
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
>>>>>>> Initialize project using Create React App
