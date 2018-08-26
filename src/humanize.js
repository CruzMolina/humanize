import web3 from "./web3";
import Humanize from "../build/contracts/Humanize.json";

// access the local copy to contract deployed on rinkeby testnet
const address = "0x000118540af01ecf20d455cdca696b018383b5d1";

const abi = Humanize.abi;

export default web3.eth.contract(abi).at(address);
