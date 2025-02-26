const { ethers } = require("ethers");
require("dotenv").config();

const provider = new ethers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const contractAddress = process.env.ADMIN_DASHBOARD_ADDRESS;; // Replace with deployed contract address
const abi = [
  "function addUser(string name, string email, string role) public",
  "function addPatientRecord(string patientName, string diagnosis, string prescription) public",
  "function addLabBooking(string testName, string userEmail) public",
  "function getPatientRecords() public view returns (tuple(string patientName, string diagnosis, string prescription, uint256 timestamp)[])",
  "function getLabBookings() public view returns (tuple(string testName, string userEmail, uint256 timestamp)[])"
];

const contract = new ethers.Contract(contractAddress, abi, wallet);

async function storeUserOnBlockchain(name, email, role) {
  const tx = await contract.addUser(name, email, role);
  await tx.wait();
  return tx.hash;
}

async function storePatientRecordOnBlockchain(patientName, diagnosis, prescription) {
  const tx = await contract.addPatientRecord(patientName, diagnosis, prescription);
  await tx.wait();
  return tx.hash;
}

async function storeLabBookingOnBlockchain(testName, userEmail) {
  const tx = await contract.addLabBooking(testName, userEmail);
  await tx.wait();
  return tx.hash;
}

async function getPatientRecordsFromBlockchain() {
  return await contract.getPatientRecords();
}

async function getLabBookingsFromBlockchain() {
  return await contract.getLabBookings();
}

module.exports = { storeUserOnBlockchain, storePatientRecordOnBlockchain, storeLabBookingOnBlockchain, getPatientRecordsFromBlockchain, getLabBookingsFromBlockchain };
