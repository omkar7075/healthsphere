import { ethers } from "ethers";
import contractAddresses from "./contractAddresses.json"; // Deployed contract addresses
import contractABIs from "./contractABIs.json"; // All ABIs in one file

// Ganache RPC URL (default is http://127.0.0.1:8545)
const GANACHE_RPC_URL = "http://127.0.0.1:8545";

/** Function to initialize Web3 provider */
export const getWeb3Provider = async () => {
  // Connect to Ganache
  const provider = new ethers.providers.JsonRpcProvider(GANACHE_RPC_URL);
  return provider;
};

/** Function to get Smart Contract Instance */
export const getContractInstance = async (contractName) => {
  const provider = await getWeb3Provider();
  const signer = provider.getSigner();
  const contractAddress = contractAddresses[contractName];

  if (!contractAddress) {
    throw new Error(`Contract ${contractName} address not found.`);
  }

  // Get the ABI for the contract
  const abi = contractABIs[contractName].abi;

  if (!abi) {
    throw new Error(`ABI for contract ${contractName} not found.`);
  }

  return new ethers.Contract(contractAddress, abi, signer);
};