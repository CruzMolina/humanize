pragma solidity ^0.4.24;

/** @title The Humanize Project Smart Contract */
/*
Acts as the bridge between the web application, IPFS,
and the Ethereum blockchain.
Handles the logic of storing and returning the IPFS hash
of each media file on the blockchain.
*/
contract Humanize {

 // string variable holding the IPFS hash on the blockchain
 string public ipfsHash;

 /** @dev Stores the IPFS hash returned from
     adding a file on the IPFS network into ipfsHash.
   * @param x The hash returned from the IPFS network.
   */
 function storeHash(string x) public {
   ipfsHash = x;
 }

}
