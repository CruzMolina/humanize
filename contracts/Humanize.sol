pragma solidity ^0.4.24;

/** @title The Humanize Project Smart Contract */
/*
Acts as the bridge between the web application, IPFS,
and the Ethereum blockchain.
Handles the logic of storing and returning the IPFS hash
of each media file on the blockchain.
*/
contract Humanize {

 // mapping for holding the IPFS hash of a given
 // user's address on the blockchain
 mapping (address => string) public ipfsHash;

 /** @dev Stores the IPFS hash returned from adding a file
     on the IPFS network into the msg.sender's ipfsHash mapping.
   * @param x The hash returned from the IPFS network.
   */
 function storeHash(string x) public {
   ipfsHash[msg.sender] = x;
 }

}
