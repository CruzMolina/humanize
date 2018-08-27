import web3 from "./web3";
import Humanize from "../build/contracts/Humanize.json";

// access the local copy to contract deployed on rinkeby testnet
const address = "0x94b46bbebf2ce1c30b03dcbd5d2810abfbf30c33";

const abi = Humanize.abi;

export default web3.eth.contract(abi).at(address);
