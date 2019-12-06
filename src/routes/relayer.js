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


/** @notice Setup relayer's account used for signing the transactions */
const signerAcc = web3.eth.accounts.privateKeyToAccount(config.private_key);

/** @notice Create Smart Contract Wallet object for creating transaction data using the contract's interface. */
const wallet = new web3.eth.Contract(require("wallet-abi"));


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
 * @param Tx Transaction the user wants to submit
 * @param Signature User's EOA signature over the Tx
 * 
 * @todo 1. Add tx validation logic
 * @todo 2. import the private key from env file.
 * @todo 3. Sign transaction and return
 * @todo 4. Error handling in the case of failed transaction on the client
 * @todo 5. Error handling in the case of no funds in the private key
 * @todo 6: Add protection via options to express.json
 */
router.post("/signTx", express.json(), async (req, res) => {

	/**
	 * @notice Psuedo code
	 * 
	 * @Steps 0. Parse the "tx" and "signature" out from request body
	 * @Steps 1. Use signature to verify if Tx is valid
	 *          - Ensure user signed Tx to show intent of execution 
	 *          - Recover the address and check if it is the same as the "signed" attribute in Tx
	 * @Steps 2. Sign on Tx and return it if the signature is valid
	 * 
	 * @Todo Can possibly implement more checks than just the address check
	 */


	const { tx, signature } = req.body;

	// Recover address from the rawTransaction
	const address = await web3.eth.accounts.recoverTransaction(signature.rawTransaction);

	// End cycle and reject user request, if the public address is different
	if (address !== tx.from) {
		res.status(400);
		res.json({ 
			error: true,
			description: "Public address different from recovered public address"
		});
	}


	/** @notice Modify and use original transaction in request body */
	// Modify/Add address so that signing account's address sends the transaction
	tx.from = signerAcc.address;
	// Modify/Add Nonce, where new nonce signing account's nonce
	tx.nonce = web3.utils.toHex(await web3.eth.getTransactionCount(signerAcc.address));

	const signedTx = await signerAcc.signTransaction(tx);

	/** @notice Send back the signed transaction */
	res.json(signedTx);
});


module.exports = router;