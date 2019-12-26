"use strict"; // Enforce use of strict verion of JavaScript

/**
 * @fileOverview Run an express server on 2020
 * @requires NPM:express, NPM:dotenv
 */

/** @notice Read environment variables from .env file */
require("dotenv").config();
const env = require("./utils/env");

// Require it to start the timing
// eslint-disable-next-line no-unused-vars
const uptime = require("./utils/uptime");

const express = require("express");
const app = express();


/** @notice Mount middlewares that should run before the routes here */
// if (process.env.NODE_ENV === "development") app.use(morgan("tiny")); // HTTP logging
if (env.logging)
	app.use(require("./middleware/logger"));
app.use(require("./middleware/counter"));

/**
 * @notice Mount all the routes onto the Express app
 * @notice Mount the default route the last, where the 404 and 500 handlers are
 */
app.use("/", require("./routes/default"));
app.use("/relayer", require("./routes/relayer"));
app.use(require("./routes/createWallet"));

/** @notice Mount middlewares that should run after the routes here */
// Error handling middleware needs to be at the end of the file so that whatever route that is not matched, it will be catched here.
app.use(require("./middleware/error_handling"));


/**
 * @notice 'app.listen' call returns the server object, which will be exported for controlling the server programmatically.
 * @notice Exported server will be useful when server is used as a module, such as for unit tests and integrations testing.
 */
const port = process.env.PORT || 2020;
module.exports = app.listen(port, () => console.log(`Server running on port: ${port}`));