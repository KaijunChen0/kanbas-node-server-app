// const express = require('express'); //create a instance of express library, require is a function that takes a string and returns a object like import
import express from 'express'; // ES6 syntax to import express library by add `type` in the `package.json` file to `module` to use ES6 syntax rather than the old `require` syntax
import Hello from './Hello.js';
import Lab5 from './Lab5.js';
import CourseRoutes from './Courses/routes.js';
import cors from 'cors'; // import the cors library to allow cross-origin requests
import ModuleRoutes from './Modules/routes.js';
import session from 'express-session';
import SecurityController from './SecurityController.js';
import UserRoutes from './Users/routes.js';
import AssignmentRoutes from './Kanbas/assignments/routes.js';
import mongoose from 'mongoose';// import the mongoose library to connect to the MongoDB database
import "dotenv/config";

// mongoose.connect("mongodb://localhost:27017/kanbas");// connect to the MongoDB database using the mongoose.connect() function and pass the connection string as an argument with port and database name
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://localhost:27017/kanbas';// or 'mongodb://127.0.0.1:27017/kanbas'
mongoose.connect(CONNECTION_STRING);

const corsOptions = {
    origin: [process.env.FRONTEND_URL, "http://localhost:3000"], // allow requests from this origin
    credentials: true, // allow cookies to be sent with the request
};
console.log("corsOptions origin:", corsOptions.origin);

const app = express();
app.use(cors(corsOptions)); // use the cors() middleware to allow cross-origin requests, must be before the express.json() middleware, order matters!!!
app.use(express.json()); // use the express.json() middleware to parse the json body of the request
// const session = require('express-session');
// app.set('trust proxy', 1); // trust first proxy
const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
      sameSite: "none",
      secure: true,
    };
};  
app.use(session(sessionOptions));
SecurityController(app); // call the function `SecurityController` and pass the `app` object to it

Hello(app); // call the function `Hello` and pass the `app` object to it
Lab5(app); // call the function `Lab5` and pass the `app` object to it
CourseRoutes(app); // call the function `CourseRoutes` and pass the `app` object to it
ModuleRoutes(app); // call the function `ModuleRoutes` and pass the `app` object to it
UserRoutes(app); // call the function `UserRoutes` and pass the `app` object to it
AssignmentRoutes(app); // call the function `AssignmentRoutes` and pass the `app` object to it

// port 4000 to avoid repeating port since we already have used 3000 in the previous web react application
app.listen(process.env.PORT || 4000);
// next is to run `node app.js` in the terminal to start the server, then go to the browser and type `localhost:4000/hello` to see the response
// to stop the server, press `ctrl + c` in the terminal, then restart the server by running `node app.js` again, then go to the browser and type `localhost:4000/` to see the response

