const { ethers } = require("ethers");
require("dotenv").config();

const provider = new ethers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const contractAddress = process.env.PATIENT_DASHBOARD_ADDRESS; // Replace with deployed contract address
const abi = [
  "function storeHealthRecord(string patientName, string diagnosis, string prescription, string notes) public",
  "function getHealthRecords() public view returns (tuple(string patientName, string diagnosis, string prescription, string notes, uint256 timestamp)[])"
];

const contract = new ethers.Contract(contractAddress, abi, wallet);

async function storeHealthRecordOnBlockchain(patientName, diagnosis, prescription, notes) {
  const tx = await contract.storeHealthRecord(patientName, diagnosis, prescription, notes);
  await tx.wait();
  return tx.hash;
}

async function getHealthRecordsFromBlockchain() {
  return await contract.getHealthRecords();
}

module.exports = { storeHealthRecordOnBlockchain, getHealthRecordsFromBlockchain };
