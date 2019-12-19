"use strict"; // Enforce use of strict verion of JavaScript

/** @title Exports object to track the count of items like number of requests */

const counter = { req: 0, failures: 0 };

module.exports = counter;