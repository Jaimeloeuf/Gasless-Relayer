"use strict"; // Enforce use of strict verion of JavaScript

/**
 * Default and Misc API routes
 * @author JJ
 * @module Default and Misc routes
 */

const router = require("express").Router();
const counter = require("../utils/counter");
const uptime = require("../utils/uptime");

/**
 * Base GET route of the relayer
 * @function GET /
 * @returns Message and link to the project
 */
router.get("/", (req, res) => {
	res.setHeader("Content-Type", "text/html");
	res.end("Gasless Relayer API endpoint <br />" +
		"<a href='https://github.com/Jaimeloeuf/Gasless-Relayer' target='_blank'>Link to the project</a>");
});

/**
 * Ping Route handler to check server status
 * @function GET /ping
 * @returns Health stats about service, such as uptime and also request count
 * 
 * Things to return to client
 * - Request status
 * - Uptime of the server instance
 * 
 * @Todo Remove the hardcoded status number in the response
 */
router.get("/ping", (req, res) => {
	res.json({
		status: 200,
		reqCounts: counter, // @Note Values in counter are also updated with calls to "/ping" via counterMiddleware
		uptime: uptime()
	});
});

module.exports = router;