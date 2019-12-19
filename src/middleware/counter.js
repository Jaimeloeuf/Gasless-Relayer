"use strict"; // Enforce use of strict verion of JavaScript

/**
 *@title Middleware and counter object to track request and error request numbers since server start
 */

const router = require("express").Router();
const counter = require("../utils/counter");

// Middleware to increase count of req, on each request received
router.use((req, res, next) => {
	++counter.req;
	next();
});

// Used named exports to export these objects
module.exports = router;