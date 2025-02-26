const { ethers } = require("ethers");
require("dotenv").config();

const provider = new ethers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const contractAddress = process.env.HEALTH_RECORD_CONTRACT_ADDRESS; // Replace with deployed contract address
const abi = [
  "function storeHealthRecord(string date, string doctor, string diagnosis, string prescription) public"
];

const contract = new ethers.Contract(contractAddress, abi, wallet);

async function storeHealthRecordOnBlockchain(date, doctor, diagnosis, prescription) {
  const tx = await contract.storeHealthRecord(date, doctor, diagnosis, prescription);
  await tx.wait();
  return tx.hash;
}

module.exports = { storeHealthRecordOnBlockchain };
