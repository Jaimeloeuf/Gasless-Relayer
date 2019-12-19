"use strict"; // Enforce use of strict verion of JavaScript

/**
 * @title Singelton Web3 object
 * @notice Module to create and export the web3 object, so all modules have access to the same instance.
 */


const { WEB3_PROVIDER_URL = "http://localhost:8545" } = require("./env");
const Web3 = require("web3");

/** @notice Create new Web3 object with URL from environment variables */
const web3 = new Web3(new Web3.providers.HttpProvider(WEB3_PROVIDER_URL));

module.exports = web3;