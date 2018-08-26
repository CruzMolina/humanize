const Web3 = require("web3");

let web3;

const isWeb3ProviderInstalled = () => {
  if (typeof window.web3 !== "undefined") {
    web3 = new Web3(window.web3.currentProvider);
    return true;
  } else {
    const provider = new Web3.providers.HttpProvider(
      "https://rinkeby.infura.io/DZQCAMdvawWxFyA6OOtD"
    );
    web3 = new Web3(provider);
    document.getElementById("web-3").innerHTML =
      "<h3 class='display-10 alert alert-danger'>Error: Web3 Provider not found!</h3> Read-only mode. A Web3 Provider is needed to write data to the blockchain.";
    return false;
  }
};

const isWeb3ProviderLocked = async () => {
  await web3.eth.getAccounts((err, accounts) => {
    if (err || !accounts[0]) {
      document.getElementById("web-3").innerHTML =
        "<h3 class='display-10 alert alert-danger'>Error: Web3 Provider locked!</h3> Please unlock your Web3 Provider to write data to the blockchain.";
      return false;
    } else {
      return true;
    }
  });
};

const isValidWeb3NetworkId = async () => {
  await web3.version.getNetwork((err, network) => {
    if (network !== "4" || err) {
      document.getElementById("web-3").innerHTML =
        "<h3 class='display-10 alert alert-danger'>Error: Web3 Provider not connected to Rinkeby!</h3> Please connect to the Rinkeby Test Network to write data to the blockchain.";
      return false;
    } else {
      return true;
    }
  });
};

const validateWeb3Provider = async () => {
  let web3Unlocked = await isWeb3ProviderLocked();
  let correctNetwork = await isValidWeb3NetworkId();

  return web3Unlocked && correctNetwork;
};

if (!isWeb3ProviderInstalled()) {
} else {
  validateWeb3Provider();

  // reload page if Web3 Provider is locked or configured to the wrong network
  web3.currentProvider.publicConfigStore.on("update", result => {
    if (document.getElementById("web-3").innerHTML) {
      location.reload();
    }
  });
}

export default web3;
