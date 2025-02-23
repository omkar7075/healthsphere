const { ethers } = require("ethers");
require("dotenv").config();

const provider = new ethers.providers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS"; // Replace with deployed contract address
const abi = [
  "function storeTransaction(string buyer, string medicineName, uint256 quantity, uint256 totalPrice) public"
];

const contract = new ethers.Contract(contractAddress, abi, wallet);

async function storeMedicineTransaction(buyer, medicineName, quantity, totalPrice) {
  const tx = await contract.storeTransaction(buyer, medicineName, quantity, totalPrice);
  await tx.wait();
  return tx.hash;
}

module.exports = { storeMedicineTransaction };
