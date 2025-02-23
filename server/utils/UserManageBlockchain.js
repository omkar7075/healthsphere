const { ethers } = require("ethers");
require("dotenv").config();

const provider = new ethers.providers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS"; // Replace with deployed contract address
const abi = [
  "function registerUser(string name, string email, string role, string password) public",
  "function updateUser(string name, string email, string role) public",
  "function deleteUser(string email) public",
  "function verifyUser(string email, string password) public view returns (bool)"
];

const contract = new ethers.Contract(contractAddress, abi, wallet);

async function registerUserOnBlockchain(name, email, role, password) {
  const tx = await contract.registerUser(name, email, role, password);
  await tx.wait();
  return tx.hash;
}

async function updateUserOnBlockchain(name, email, role) {
  const tx = await contract.updateUser(name, email, role);
  await tx.wait();
  return tx.hash;
}

async function deleteUserOnBlockchain(email) {
  const tx = await contract.deleteUser(email);
  await tx.wait();
  return tx.hash;
}

async function verifyUserOnBlockchain(email, password) {
  return await contract.verifyUser(email, password);
}

module.exports = { registerUserOnBlockchain, updateUserOnBlockchain, deleteUserOnBlockchain, verifyUserOnBlockchain };
