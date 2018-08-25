pragma solidity ^0.4.24;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Humanize.sol";

contract TestHumanize {

  function testStoreHash() public {
    Humanize humanize = Humanize(DeployedAddresses.Humanize());

    humanize.storeHash("89");

    string memory expected = "89";

    Assert.equal(humanize.ipfsHash(), expected, "It should store the string value 89.");
  }

}
