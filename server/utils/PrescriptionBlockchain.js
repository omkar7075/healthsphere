const { ethers } = require("ethers");
require("dotenv").config();

const provider = new ethers.providers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS"; // Replace with deployed contract address
const abi = [
  "function storePrescription(string patientName, uint256 age, string symptoms, string diagnosis, string prescription, string notes) public",
  "function getPrescription(uint256 id) public view returns (string, uint256, string, string, string, string)"
];

const contract = new ethers.Contract(contractAddress, abi, wallet);

async function storePrescriptionOnBlockchain(patientName, age, symptoms, diagnosis, prescription, notes) {
  const tx = await contract.storePrescription(patientName, age, symptoms, diagnosis, prescription, notes);
  await tx.wait();
  return tx.hash;
}

async function getPrescriptionFromBlockchain(id) {
  return await contract.getPrescription(id);
}

module.exports = { storePrescriptionOnBlockchain, getPrescriptionFromBlockchain };
