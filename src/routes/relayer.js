'use strict'; // Enforce use of strict verion of JavaScript

/**
 * Routes for signing transactions
 * @author JJ
 * @module Transactions
 */

const express = require("express");
const router = express.Router();


/**
 * Base API point, Ping endpoint
 * @name GET /relayer
 * @function
 * @param {string} path relative express path
 * @param {callback} middleware express middleware
 * @returns {string} Simple message
 *
 * 
 * @example
 * fetch('/relayer')
 * // "Relayer base API endpoint"
 */
router.get("/", (req, res) => {
    res.send("Relayer base API endpoint");
});


/**
 * Signs a incoming transaction with private key to pay for user's Gas.
 * @name POST /relayer
 * @function
 * @param {string} path relative express path
 * @param {callback} middleware express middleware
 * @returns {object} Signed transaction is returned to the user
 *
 * 
 * @example
 * const Tx = { to: ..., ... }
 * const signedTx = fetch('/relayer', {method: POST}).send(Tx)
 * // {success: true}
 *
 *
 * @todo 1. Add tx validation logic
 * @todo 2. import the private key from env file.
 * @todo 3. Sign transaction and return
 * @todo 4. Error handling in the case of failed transaction on the client
 * @todo 5. Error handling in the case of no funds in the private key
 * @todo 6: Add protection via options to express.json
 */
router.post("/", express.json(), async (req, res) => {
    res.json(req.body);
});


module.exports = router;