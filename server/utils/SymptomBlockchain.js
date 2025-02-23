const { ethers } = require("ethers");
require("dotenv").config();

const provider = new ethers.providers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS"; // Replace with deployed contract address
const abi = [
  "function storeSymptom(string description, string diagnosis, string precautions, string treatment) public",
  "function getSymptoms() public view returns (tuple(string description, string diagnosis, string precautions, string treatment, uint256 timestamp)[])"
];

const contract = new ethers.Contract(contractAddress, abi, wallet);

async function storeSymptomOnBlockchain(description, diagnosis, precautions, treatment) {
  const tx = await contract.storeSymptom(description, diagnosis, precautions, treatment);
  await tx.wait();
  return tx.hash;
}

async function getSymptomsFromBlockchain() {
  return await contract.getSymptoms();
}

module.exports = { storeSymptomOnBlockchain, getSymptomsFromBlockchain };
