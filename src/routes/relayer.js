"use strict"; // Enforce use of strict verion of JavaScript

/**
 * Routes for signing transactions
 * @author JJ
 * @module Transactions
 * 
 * @notes This code is created with reference to many sources, links below:
 * @notes https://medium.com/blockchannel/life-cycle-of-an-ethereum-transaction-e5c66bae0f6e
 */

const express = require("express");
const router = express.Router();
const config = require("../config");
const { Web3, web3 } = require("../web3");


/** @notice Setup code */
const signerAcc = web3.eth.accounts.privateKeyToAccount(config.private_key);

// Create contract object
const abi = require("../../build/abi.json");
const contract = new Web3.eth.Contract(abi);


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
 * @name POST /relayer/signTx
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
router.post("/signTx", express.json(), async (req, res) => {

	/** @notice Parse out data from request body */
	const { to } = req.body;

	/** 
	 * @notice Create a raw Transaction first
	 * 
	 * @notice Use transaction count to calculate the nonce
	 * @notice The gasPrice and gasLimit numbers are temporarily hard coded for now
	 * @notice Value will always be 0, because the relayer will not be sending ETH to the contract
	 * 
	 * @Todo Remove the hard coded gasPrice and gasLimit. These values are actually optional
	 */
	const rawTx = {
		nonce: web3.toHex(web3.eth.getTransactionCount(signerAcc)),
		gasPrice: web3.toHex(100000000000),
		gasLimit: web3.toHex(140000),
		to,
		value: web3.toHex(0),
		// Encode the ABI of the method and the arguements
		// data: myContract.methods.myMethod(arg, arg2).encodeABI()
	};

	/** 
	 * @notice Sign the transaction 
	 * @TODO test if this works
	*/
	const signedTx = signerAcc.signTransaction(rawTx);

	/** @notice Send back the signed transaction */
	res.json(signedTx);
});


module.exports = router;