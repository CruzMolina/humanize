pragma solidity ^0.4.24;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Humanize.sol";

contract TestHumanize {

  // test to ensure storeHash can store string values for caller
  function testStoreHashStoresStrings() public {
    Humanize humanize = new Humanize();

    // storeHash called by the contract
    humanize.storeHash("89");

    string memory expected = "89";

    // returns correctly because "this" is the mapping for the earlier contract storeHash call
    Assert.equal(humanize.ipfsHash(this), expected, "It should store the string value 89.");

  }

  // test to ensure storeHash stores string values ONLY for caller
  function testIpfsHashMapping() public {
    Humanize humanize = new Humanize();

    // storeHash called by the contract
    humanize.storeHash("89");

    // Empty string expected
    string memory expected = "";

    // returns correctly by msg.sender did not call storeHash and did not store a string value (yet)
    Assert.equal(humanize.ipfsHash(msg.sender), expected, "It should store string values ONLY for the caller");

  }

}
