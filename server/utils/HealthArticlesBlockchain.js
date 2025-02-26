const { ethers } = require("ethers");
require("dotenv").config();

const provider = new ethers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const contractAddress = process.env.HEALTH_ARTICLES_ADDRESS; // Replace with actual contract address
const abi = [
  "function addArticle(string title, string summary, string image) public",
  "function deleteArticle(uint256 id) public",
  "function getArticle(uint256 id) public view returns (tuple(uint256 id, string title, string summary, string image, uint256 timestamp))"
];

const contract = new ethers.Contract(contractAddress, abi, wallet);

async function addArticleOnBlockchain(title, summary, image) {
  const tx = await contract.addArticle(title, summary, image);
  await tx.wait();
  return tx.hash;
}

async function deleteArticleOnBlockchain(articleId) {
  const tx = await contract.deleteArticle(articleId);
  await tx.wait();
  return tx.hash;
}

module.exports = { addArticleOnBlockchain, deleteArticleOnBlockchain };
