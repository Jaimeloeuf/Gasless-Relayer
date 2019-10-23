'use strict'; // Enforce use of strict verion of JavaScript

/**
 * @fileOverview Run an express server on 2020
 * @requires NPM:express
 */

// Function returns uptime in ms. Self invoking partial application with startup time
// Start time is recorded before any other code is ran
const uptime = ((start_time) => () => Date.now() - start_time)(Date.now());

const express = require("express");
const app = express();

// Read environment variables from .env file
require("dotenv").config();

/* Mount all the middleware onto the Express app */
// if (process.env.NODE_ENV === "development") app.use(morgan("tiny")); // HTTP logging


/* Mount all the routes onto the Express app */
app.use("/relayer", require('./routes/relayer'));


// Ping Route to check server status
app.get('/ping', (req, res) => {
	/*	Things to return to client
        - Request status
        - Uptime of the server instance
    */
    res.json({
        // @TODO Remove the hardcoded status number
        status: 200,
        uptime: uptime()
    });
});


const port = process.env.PORT || 2020;
app.listen(port, () => console.log(`Server running on port: ${port}`));