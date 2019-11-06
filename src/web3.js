"use strict"; // Enforce use of strict verion of JavaScript

/**
 * @title Web3 object
 * @notice Module to create and export the web3 object, so that all modules have access to the same instance.
 */


const { web3_provider_url } = require("./config");
const Web3 = require("web3");


/** @notice Create new Web3 object with URL from environment variables */
const web3 = new Web3(new Web3.providers.HttpProvider(web3_provider_url));


/** @notice Export both the Web3 class and the created web3 object */
module.exports = { Web3, web3 };