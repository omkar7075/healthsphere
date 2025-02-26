const { ethers } = require("ethers");
require("dotenv").config();

const provider = new ethers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const contractAddress =  process.env.PATIENT_CONTRACT_ADDRESS; // Replace with deployed contract address
const abi = [
  "function storePatient(string name, uint256 age, string gender, string medicalHistory) public",
  "function getPatient(uint256 id) public view returns (string, uint256, string, string)"
];

const contract = new ethers.Contract(contractAddress, abi, wallet);

async function storePatientOnBlockchain(name, age, gender, medicalHistory) {
  const tx = await contract.storePatient(name, age, gender, medicalHistory);
  await tx.wait();
  return tx.hash;
}

async function getPatientFromBlockchain(id) {
  return await contract.getPatient(id);
}

module.exports = { storePatientOnBlockchain, getPatientFromBlockchain };
