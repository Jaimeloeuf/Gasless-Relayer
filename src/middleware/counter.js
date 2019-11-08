"use strict"; // Enforce use of strict verion of JavaScript

/**
 *@title Middleware and counter object to track request and error request numbers since server start
 */

const router = require("express").Router();

// Counter object to track number of occurences for different events
const counter = { req: 0, failures: 0 };

// Middleware to increase count of req, on each request received
router.use((req, res, next) => {
	++counter.req;
	next();
});


// Used named exports to export these objects
module.exports = {
	counter,
	counter_middleware: router
};