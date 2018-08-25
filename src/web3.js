const Web3 = require("web3");

let web3;

const isMetamaskInstalled = () => {
  if (typeof window.web3 !== "undefined") {
    web3 = new Web3(window.web3.currentProvider);
    return true;
  } else {
    const provider = new Web3.providers.HttpProvider(
      "https://rinkeby.infura.io/DZQCAMdvawWxFyA6OOtD"
    );
    web3 = new Web3(provider);
    document.getElementById("web-3").innerHTML =
      "<h3 class='display-10 alert alert-danger'>Error: Metamask was not found!</h3> Read-only mode. Metamask is needed to write data to the blockchain.";
    return false;
  }
};

const isMetamaskLocked = () => {
  return new Promise((resolve, reject) => {
    web3.eth.getAccounts((err, accounts) => {
      if (!err && accounts[0]) {
        resolve(true);
      } else {
        document.getElementById("web-3").innerHTML =
          "<h3 class='display-10 alert alert-danger'>Error: Metamask locked!</h3> Please unlock Metamask to write data to the blockchain.";
        reject(false);
      }
    });
  });
};

const getMetamaskNetwork = async () => {
  const networkID = await web3.version.network;
  if (networkID === "3") {
  } else {
    document.getElementById("web-3").innerHTML =
      "<h3 class='display-10 alert alert-danger'>Error: Metamask is not connected to Ropsten!</h3> Please connect to the Ropsten Test Network to write data to the blockchain.";
  }
};

const validateMetamask = async () => {
  await isMetamaskLocked();
  await getMetamaskNetwork();
};

if (!isMetamaskInstalled()) {
} else {
  validateMetamask();

  // reload page if Metamask is locked or configured to the wrong network
  web3.currentProvider.publicConfigStore.on("update", function(result) {
    if (document.getElementById("web-3").innerHTML) {
      location.reload();
    }
  });
}

export default web3;
