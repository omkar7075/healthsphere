const { ethers } = require("ethers");
require("dotenv").config();

const provider = new ethers.providers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS"; // Replace with deployed contract address
const abi = [
  "function registerUser(string email, string password, string userType) public",
  "function authenticateUser(string email, string password) public view returns (bool)"
];

const contract = new ethers.Contract(contractAddress, abi, wallet);

async function registerUserOnBlockchain(email, password, userType) {
  const tx = await contract.registerUser(email, password, userType);
  await tx.wait();
  return tx.hash;
}

async function authenticateUserOnBlockchain(email, password) {
  return await contract.authenticateUser(email, password);
}

module.exports = { registerUserOnBlockchain, authenticateUserOnBlockchain };
