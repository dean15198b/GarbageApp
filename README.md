# GarbageApp

GarbagesApp is a web app that control garbages on a real world map.
All the commands have to run in the GarbageApp folder.
To run this app just run every command.

## Database Deployment

I used MongoDB as the DB of the app.
You can easily deploy it with Docker:

```bash
docker run --name db -v ~/test/mongo/data:/data/db -p 27017:27017 mongo:latest
```

## Installation

```bash
cd api && npm install
cd frontend && npm install
```

## Backend Unit Testing and Sample Data Inserting:

I Used Mocha.js.
There is test for every function and api call.

To run all the tests and insert the data samples to the DB:

```bash
cd api && npm test
```

## Backend Explanation and Deployment

I used Express.js as the backend framework.
For the simplicity I deploy it on port 4000.

The server contain four independent layers:

1. dal: Currently responsible only for the garbages DB.
2. controllers: Responsible for the BI.
3. routes: Responsible for routing and calling the relevent controller's function

importand nodes:

- Every request and error are logs to STDOUT.
- CORS is disable on development mode only (env).
- There is mechanizem for error handlerization.

```bash
cd api && node app.js
```

## Frontend Deployment

I used react.js as the backend framework and react hook context as the state manager.
For the simplicity I deploy it on port 4000.

```bash
cd frontend && npm start
```
