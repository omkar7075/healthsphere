const { ethers } = require("ethers");
require("dotenv").config();

const provider = new ethers.providers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS"; // Replace with your contract address
const abi = [
  "function storeConsultation(string doctorName, string patientName, string specialty, string consultationDate, string consultationTime) public"
];

const contract = new ethers.Contract(contractAddress, abi, wallet);

async function storeConsultationOnBlockchain(doctorName, patientName, specialty, consultationDate, consultationTime) {
  const tx = await contract.storeConsultation(doctorName, patientName, specialty, consultationDate, consultationTime);
  await tx.wait();
  return tx.hash;
}

module.exports = { storeConsultationOnBlockchain };
