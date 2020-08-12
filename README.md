# jamie-office-choice

Functionality:

This project features Jamie's Office change App - her vacation is about to end and she needs to choose another office from where she can work. She is at an international company and has a choice to fly to any 3 cities as follows:

1. Amsterdam
2. Budapest
3. Madrid

We give her the city respective weather forecast and cheap flight details so she can choose her city.
The LIVE version of this page is hosted on githubPages on this [link](https://1274558.github.io/Jamie_Vacation/index.html)

The application is built in Vue.js and Vue CLI is used to run the application.
Vuetify which is a Vue UI library is used in the application to provide material components.
Fontawesome is used to provide icons
Axios is used for making server calls.

Pre-requisite:

Nodejs (You need to have nodejs installed on your machine in order to run the application. You can download nodejs from https://nodejs.org/en/download/)

The possible areas of improvement could be:

1. Allow the user to enter the source city only from a list of international countries as she is at an international office currently.
2. Provide secure encryption by encrypting the API key and caching the response from the service.
3. UI responsiveness on various devices.
4. Improve code coverage by writing more unit tests.
5. An addition can be that she can be shown her new office details in the city that she chooses to go to.
6. A loader can be added to show the delay in the service response.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
