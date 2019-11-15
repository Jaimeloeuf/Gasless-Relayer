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
const walletABI = require("wallet-abi");
const wallet = new web3.eth.Contract(walletABI);


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
 * @param scw_address Address of the user's own Smart Contract Wallet
 * @param to The address to make the transaction to from the wallet
 * @param value The value to sent over from the user's smart contract wallet to the 
 * @param data The data to be sent over to the contract the wallet is interacting with
 * @param txHash The hash of the original transaction to be signed over
 * @param sigs The signature(s) of the txHash which will be sent over to the wallet for verification
 *
 * @todo 1. Add tx validation logic
 * @todo 2. import the private key from env file.
 * @todo 3. Sign transaction and return
 * @todo 4. Error handling in the case of failed transaction on the client
 * @todo 5. Error handling in the case of no funds in the private key
 * @todo 6: Add protection via options to express.json
 */
router.post("/signTx", express.json(), async (req, res) => {

	/** @notice Parse out data from request body for the Expected params specified in docs above */
	const { scw_address, to, value, data, txHash, sigs } = req.body;

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
		nonce: web3.utils.toHex(web3.eth.getTransactionCount(signerAcc.address)),
		gasPrice: web3.utils.toHex(100000000000),
		gasLimit: web3.utils.toHex(140000),
		scw_address,
		value: web3.utils.toHex(0),
		// Data is used to call the function on the user's SCW which is encoded using the contract object
		data: wallet.methods.execute(to, value, data, txHash, sigs).encodeABI()
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