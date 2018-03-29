# geekplanet [![Build Status](https://travis-ci.org/r3dDoX/geekplanet.svg?branch=develop)](https://travis-ci.org/r3dDoX/geekplanet)
An online store app written in React with a backend in NodeJS using a MongoDb.

# Running it
The easiest way is through Docker. If you run ```docker-compose up``` in the repo, there will be two docker containers started.
One with a MongoDB on Port 27017 and the other with the node app running in development mode.

Don't worry about ```npm install```. This will be run on start of the node container.

# Running tests for TDD
To have Jest running in watch mode you can also start it with a docker node since integration tests also have to run pdftk.

```docker run --rm -it -v "$(pwd)":/usr/app -w /usr/app r3ddox/node-pdftk npm run test:watch```

Or run the already set up npm task for this:

```npm run test:watch:docker```

Running tests like this will not run npm install though. Either run ```npm install``` in the same docker container or first run it with docker-compose.

# Technology Stack
## Backend
* NodeJS
* Express
* JWT
* Mongoose

## Frontend
* React
* Redux
* Webpack
* Babel

## Authentication Provider
* Auth0

## Payment Provider
* Stripe
