"use strict"; // Enforce use of strict verion of JavaScript

/** @title Logging and analytics middleware */

const router = require("express").Router();
const { logging } = require("../utils/env");

const loggingMiddleware = (req, res, next) => {
	console.log("headers: ", req.headers);
	console.log("rawHeaders: ", req.rawHeaders);
	console.log("method: ", req.method);
	console.log("originalUrl: ", req.originalUrl);
	console.log("url: ", req.url);
	console.log("baseUrl: ", req.baseUrl);
	next();
};

const emptyMiddleware = (req, res, next) => next();

const middleware = logging ? loggingMiddleware : emptyMiddleware;

/**
 * @notice Log the request headers
 * @notice Log the request method
 * @notice Log the request URL and related
 */
router.use(middleware);


module.exports = router;