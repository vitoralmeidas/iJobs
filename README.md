## Getting Started

This repository aims to assist you in keeping track of your job applications. The inputs is most manual, but it is a good way to hold your applications closer . To get started make a copy of this template repo for your project teams.

https://i-jobs.onrender.com/landing

Since this project will hold both the client application and the server application there will be node modules in two different places. First run `npm install` from the root. After this you will go to client folder and run `npm install` . Then you will go back to root and run `npm start`.  Your Application will working on development mode .

This app can be deployed directly to **render.com** since there is a script defined in `package.json` which will automatically handle building and deploying the app. For more information on deploying to **render** scroll down to see the reference the extra resources at the bottom of this file. 

#### _**IMPORTANT NOTE**_ - 

This project does not have a mongoDB connection setup. Setup the connection based on the environments below.

- local development: create a `.env` file in the root folder, which exports your MONGO_URL connection. This file will be ignored by git so your db credentials will be kept safe when the app is deployed.

## File structure

#### `client` - Holds the client application

- #### `public` - This holds all of our static files

- #### `src`

  - #### `assets` - This folder holds assets such as images, docs, and fonts

  - #### `components` - This folder holds all of the different components that will make up our views

  - #### `pages` - These represent a unique page on the website i.e. Home or About. These are still normal react components.

  - #### `context` - This folder holds the Global Context functionality 

  - #### `utils` - This holds all of our `JavaScript` helpers' functions 

  - #### `App.js` - This is what renders all of our browser routes and different views

  - #### `index.js` - This is what renders the react app by rendering App.js, should not change

- #### `package.json` - Defines npm behaviors and packages for the client

#### `server` - Holds the server application

- #### `db` - This holds our configuration files, like mongoDB uri

- #### `controllers` - These hold all of the callback functions that each route will call

- #### `models` - This holds all of our data models

- #### `routes` - This holds all of our HTTP to URL path associations for each unique url

- #### `middleware` - This holds all of our Express Middleware's 

- #### `errors` - This holds all of our Errors' handling  

- #### `utils` - This holds all of our `JavaScript` helpers' functions 

- #### `server.js` - Defines npm behaviors and packages for the client

- #### `package.json` - Defines npm behaviors like the scripts defined in the next section of the README

- #### `.gitignore` - Tells git which files to ignore

- #### `README` - This file!


## Clone or download 

# Dependencies(tech-stacks)

| Server-side                    | Client-side              |
| ------------------------------ | ------------------------ |
| bcrypt-nodejs: ^2.4.3          | axios: ^1.2.2            |
| cors: ^2.8.5                   | styled-components ^5.3.6 |
| dotenv: ^16.0.3                | react: ^18.2.0           |
| express: ^4.18.2               | react-dom: ^18.2.0       |
| mongoose: ^6.8.3               | react-router-dom: ^6.6.1 |
| morgan: ^1.10.0                | recharts: ^2.3.2         |
| validator: ^13.7.0             | react-icons: ^4.7.1      |
| xss-clean: ^0.1.1              | moment: ^2.29.4          |
| moment:  ^2.29.4               | history: ^5.3.0          |
| jsonwebtoken: ^9.0.0           | normalize.css: ^8.0.1    |
| http-status-codes": ^2.2.0     |                          |
| helmet: ^6.0.1                 |                          |
| express-rate-limit: ^6.7.0     |                          |
| express-mongo-sanitize: ^2.2.0 |                          |
| express-async-errors: ^3.1.1   |                          |
| cookie-parser": ^1.4.6         |                          |
|                                |                          |

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs both the client app and the server app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view the client in the browser.

### `npm run client`

Runs just the client app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view the client in the browser.


### `npm run server`

Runs just the server in development mode.<br>


### `npm run build-client`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn how to setup a local MongoDB instance for testing, check out how to [Connect to MongoDB](https://docs.mongodb.com/guides/server/drivers/).

To learn React, check out the [React documentation](https://reactjs.org/).

