"use strict"; // Enforce use of strict verion of JavaScript

/**
 * @function Start time is recorded before any other code is ran
 * @returns Uptime in ms. Self invoking partial application with startup time
*/
const uptime = ((startTime) => () => Date.now() - startTime)(Date.now());

module.exports = uptime;