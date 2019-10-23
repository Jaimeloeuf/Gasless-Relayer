'use strict'; // Enforce use of strict verion of JavaScript

/**
 * @fileOverview Run an express server on 2020
 * @requires NPM:express
 */
const express = require("express");
const app = express();

// Read environment variables from .env file
require("dotenv").config();

/* Mount all the middleware onto the Express app */


/* Mount all the routes onto the Express app */
app.use("/relayer", require('./routes/relayer'));


const port = process.env.PORT || 2020;
app.listen(port, () => console.log(`Server running on port: ${port}`));