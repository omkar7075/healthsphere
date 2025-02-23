const { ethers } = require("ethers");
require("dotenv").config();

const provider = new ethers.providers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS"; // Replace with deployed contract address
const abi = [
  "function storeLabBooking(string name, string email, string phone, string testType, string appointmentDate, string appointmentTime) public"
];

const contract = new ethers.Contract(contractAddress, abi, wallet);

async function storeLabBookingOnBlockchain(name, email, phone, testType, appointmentDate, appointmentTime) {
  const tx = await contract.storeLabBooking(name, email, phone, testType, appointmentDate, appointmentTime);
  await tx.wait();
  return tx.hash;
}

module.exports = { storeLabBookingOnBlockchain };
