import { ethers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import contractAddresses from "./contractAddresses.json"; // Deployed contract addresses
import AdminDashboardABI from "./AdminDashboard.json"; // AdminDashboard ABI

// Load environment variables
const ALCHEMY_API_KEY = process.env.REACT_APP_ALCHEMY_API_KEY;
const ALCHEMY_NETWORK = process.env.REACT_APP_NETWORK;

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: {
        1: ALCHEMY_NETWORK, // Use Alchemy API instead of Infura
      },
    },
  },
};

/** Function to initialize Web3 provider */
export const getWeb3Provider = async () => {
  const web3Modal = new Web3Modal({
    cacheProvider: true,
    providerOptions,
  });

  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
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

  const abiMap = {
    AdminDashboard: AdminDashboardABI,
    // Add other contracts...
  };

  const abi = abiMap[contractName];

  return new ethers.Contract(contractAddress, abi, signer);
};
