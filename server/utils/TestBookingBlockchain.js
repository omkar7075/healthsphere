const { ethers } = require("ethers");
require("dotenv").config();

const provider = new ethers.providers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const contractAddress =  process.env.TEST_BOOKING_CONTRACT_ADDRESS; // Replace with deployed contract address
const abi = [
  "function bookTest(string testName, uint256 price, string userId) public",
  "function getTestBooking(uint256 id) public view returns (string, uint256, string)"
];

const contract = new ethers.Contract(contractAddress, abi, wallet);

async function bookTestOnBlockchain(testName, price, userId) {
  const tx = await contract.bookTest(testName, price, userId);
  await tx.wait();
  return tx.hash;
}

async function getTestBookingFromBlockchain(id) {
  return await contract.getTestBooking(id);
}

module.exports = { bookTestOnBlockchain, getTestBookingFromBlockchain };
