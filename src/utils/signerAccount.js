"use strict"; // Enforce use of strict verion of JavaScript

/**
 * @title Singelton Signer / relayer account
 * @notice Single account relayer uses to sign all transactions to create meta-tx, paying gas for users
 */

const web3 = require("./web3");
const { PRIVATE_KEY } = require("./env");

// Create signer account from private key
const signerAccount = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);

// Set signerAccount as the default account in web3 to do the .send call on the contract objects
web3.eth.defaultAccount = signerAccount.address;
web3.eth.accounts.wallet.add(signerAccount.privateKey);

module.exports = signerAccount;
