# Express.js Tutorial Server

A minimal Node.js server built with [Express.js](https://expressjs.com/) that demonstrates basic HTTP routing with two endpoints. This project serves as a simple tutorial for getting started with Express.js.

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher

## Installation

Clone the repository and install the dependencies:

```bash
npm install
```

## Starting the Server

Start the server using the npm start script:

```bash
npm start
```

The server will start listening on port **3000** by default. You can override the port by setting the `PORT` environment variable:

```bash
PORT=8080 npm start
```

## Available Endpoints

| Method | Path       | Response         | Status Code |
|--------|------------|------------------|-------------|
| GET    | `/`        | `Hello world`    | 200         |
| GET    | `/evening` | `Good evening`   | 200         |

## Response Examples

### GET /

```
$ curl http://localhost:3000/
Hello world
```

### GET /evening

```
$ curl http://localhost:3000/evening
Good evening
```
