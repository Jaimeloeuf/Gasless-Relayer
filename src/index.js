"use strict"; // Enforce use of strict verion of JavaScript

/**
 * @fileOverview Run an express server on 2020
 * @requires NPM:express, NPM:dotenv
 */

// Function returns uptime in ms. Self invoking partial application with startup time
// Start time is recorded before any other code is ran
const uptime = ((start_time) => () => Date.now() - start_time)(Date.now());

const express = require("express");
const app = express();


/** @notice Read environment variables from .env file */
require("dotenv").config();


/** @notice Mount all the middleware onto the Express app */
// if (process.env.NODE_ENV === "development") app.use(morgan("tiny")); // HTTP logging
const { counter, counter_middleware } = require("./middleware/counter");
app.use(counter_middleware);


/** @notice Mount all the routes onto the Express app */
app.use("/relayer", require("./routes/relayer"));


/**
 * @function Ping Route handler to check server status
 * @notice Returns health stats about service, such as uptime and also request count
 * 
 * @Todo Remove the hardcoded status number in the response
 */
app.get("/ping", (req, res) => {
	/*	Things to return to client
        - Request status
        - Uptime of the server instance
    */
	res.json({
		status: 200,
		req_counts: counter, // @Note Values in counter are also updated with calls to "/ping" via counter_middleware
		uptime: uptime()
	});
});


/**
 * @function 404 Handler for all not resource not founds
 * @notice Normal request middleware, called when no other route's are matched
 * @notice Wrapped in try/catch in case response fails.
 * 
 * @Todo Log error either to error logs or to a logging service
 */
app.use((req, res, next) => {
	try {
		/// @Todo Log error either to error logs or to a logging service

		// Set status to indicate resource not found and send back the string representation of the HTTP code, i.e. "Not-Found"
		// res.sendStatus(404);

		// Send without the string representation. End the cycle right after setting with 404
		res.status(404).end();
	} catch (err) {
		// 500 error middleware is called upon catching any errors
		next(err);
	}
});


/**
 * @function 500 internal server error route handler
 * @dev For error status code other than 500, look at example below
 * @dev     res.status(401); // Set statusCode directly with the built in method
 * @dev     OR
 * @dev     err.code = 401; // Set the code as property of the object
 * @dev Note that an Error status code set with res.status() method will have precedence over err.code
 * @dev next(err); // Call the next middleware function with the err object once the code is set.
 * 
 * ----------------------------------------------------------------------------------------------
 * 
 * @dev To send the error message back to the client, and not just the status code with an empty body.
 * @dev Use the "send_msg_back" property. Set it to true to send mesage back to client.
 * @dev err.send_msg_back = true; // Set true to return the error message back to the client
 * 
 * @note Should the error message be sent back to the user?
*/
app.use((err, req, res) => {
	// Increase failure count of the counter object
	++counter.failures;

	// Log error either to error logs or to a logging service
	console.error(err.stack);

	// Make sure that the status code is an error code
	if (res.statusCode < 400)
		res.status(err.code || 500);

	// End the request after making sure status code is set
	res.end(err.send_msg_back ? err.message : undefined);
});


/**
 * @notice Make express server listen on a PORT
 * @notice 'app.listen' call returns the server object, which will be exported for controlling the server programmatically.
 * @notice Exported server will be useful when server is used as a module, such as for unit tests and integrations testing.
 */
const port = process.env.PORT || 2020;
module.exports = app.listen(port, () => console.log(`Server running on port: ${port}`));


/**
 * @notice Experimental feature
 * 
 * @notice Process to kill the server every fixed time,
 * @notice so that it can be restarted to read newly refreshed environmental variables if any.
 * @notice This is currently used instead of an API endpoint for private Key rotation
 * 
 * @todo Check if there are any incoming connections, or if there is any connection being "awaited"
 */
setTimeout(function () {
	console.log("Natural death time");
	process.exit(0); // Exit with no erros and OK error code
}, 1000 * 60 * 60); // Hardcoded to die every hour