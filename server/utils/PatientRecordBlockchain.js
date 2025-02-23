const { ethers } = require("ethers");
require("dotenv").config();

const provider = new ethers.providers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS"; // Replace with deployed contract address
const abi = [
  "function storePatientRecord(string name, uint256 age, string gender, string medicalHistory, string lastVisit) public",
  "function getPatientRecord(uint256 id) public view returns (string, uint256, string, string, string)"
];

const contract = new ethers.Contract(contractAddress, abi, wallet);

async function storePatientRecordOnBlockchain(name, age, gender, medicalHistory, lastVisit) {
  const tx = await contract.storePatientRecord(name, age, gender, medicalHistory, lastVisit);
  await tx.wait();
  return tx.hash;
}

async function getPatientRecordFromBlockchain(id) {
  return await contract.getPatientRecord(id);
}

module.exports = { storePatientRecordOnBlockchain, getPatientRecordFromBlockchain };
