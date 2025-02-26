const { ethers } = require("ethers");
require("dotenv").config();

const provider = new ethers.providers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const contractAddress = process.env.APPOINTMENT_BOOKING_ADDRESS; // Replace with actual address
const abi = [
  "function bookAppointment(string name, string email, string phone, string doctor, string date, string time) public",
  "function cancelAppointment(uint256 id) public",
];

const contract = new ethers.Contract(contractAddress, abi, wallet);

async function bookAppointmentOnBlockchain(name, email, phone, doctor, date, time) {
  const tx = await contract.bookAppointment(name, email, phone, doctor, date, time);
  await tx.wait();
  return tx.hash;
}

async function cancelAppointmentOnBlockchain(appointmentId) {
  const tx = await contract.cancelAppointment(appointmentId);
  await tx.wait();
  return tx.hash;
}

module.exports = { bookAppointmentOnBlockchain, cancelAppointmentOnBlockchain };
