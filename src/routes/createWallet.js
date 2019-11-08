"use strict"; // Enforce use of strict verion of JavaScript

/**
 * Routes for signing transactions
 * @author JJ
 * @module Transactions
 */

const express = require("express");
const router = express.Router();
const { web3 } = require("../web3");


/** @notice Setup codes */
const contract_abi = require("../smart_contract_wallet_abi.json");
const wallet_contract = new web3.eth.Contract(contract_abi);


/**
 * Signs a incoming transaction with private key to pay for user's Gas.
 * @name POST /create-wallet
 * @notice Endpoint with code to create a new wallet and set owner to be the address received.
 * @function
 * @param {string} path relative express path
 * @param {callback} middleware express middleware
 * @returns address Address of the newly created Smart Contract Wallet
 *
 *
 * @notes Created following link below
 * @notes https://web3js.readthedocs.io/en/v1.2.0/web3-eth-contract.html#deploy
 * 
 *  
 * @example
 * const address;
 * const createdWalletAddress = fetch('/create-wallet', {method: POST}).send(address)
 * // {success: true, contract_address: 0x1837506450931524896051948093141}
 *
 *
 * @Todo Testing
 * @Todo optimizing
 */
router.post("/create-wallet", express.json(), async (req, res) => {

	/** @notice Setup code, take all data needed for  */
	const { owner_address } = req.body;

	try {

		/**
		 * @notice After successful deployment the promise will resolve with a new contract instance.
		 * @notice Constructor argument passed in as an Array, and is made sure to be Hex
		 */
		const new_wallet = await wallet_contract.deploy({ arguments: [web3.toHex(owner_address)] });

		/** @notice Return only the address of the Smart Contract Wallet */
		res.end(new_wallet.address);

	} catch (err) {
		console.log(err);
		res.json({ err: true });
	}
});


module.exports = router;