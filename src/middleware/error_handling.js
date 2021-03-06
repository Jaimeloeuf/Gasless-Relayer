"use strict"; // Enforce use of strict verion of JavaScript

/** @title Middleware and counter object to track request and error request numbers since server start */

const router = require("express").Router();
const counter = require("../utils/counter");

/**
 * @function 404 Handler for all not resource not founds
 * @notice Normal request middleware, called when no other route's are matched
 * @notice Wrapped in try/catch in case response fails.
 * 
 * @Todo Log error either to error logs or to a logging service
 */
router.use((req, res, next) => {
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
router.use((err, req, res) => {
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


module.exports = router;