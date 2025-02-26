const { ethers } = require("ethers");
require("dotenv").config();

const provider = new ethers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const contractAddress = process.env.DOCTOR_DASHBOARD_ADDRESS; // Replace with deployed contract address
const abi = [
  "function storeRecord(string patientName, string diagnosis, string prescription, string notes) public",
  "function getRecords() public view returns (tuple(string patientName, string diagnosis, string prescription, string notes, uint256 timestamp)[])"
];

const contract = new ethers.Contract(contractAddress, abi, wallet);

async function storeRecordOnBlockchain(patientName, diagnosis, prescription, notes) {
  const tx = await contract.storeRecord(patientName, diagnosis, prescription, notes);
  await tx.wait();
  return tx.hash;
}

async function getRecordsFromBlockchain() {
  return await contract.getRecords();
}

module.exports = { storeRecordOnBlockchain, getRecordsFromBlockchain };
