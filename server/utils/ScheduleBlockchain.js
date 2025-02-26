const { ethers } = require("ethers");
require("dotenv").config();

const ABI = [
  // Constructor
  "function addSchedule(string memory _task, string memory _time) public",
  "function updateSchedule(uint256 _scheduleId, string memory _newStatus) public",
  "function deleteSchedule(uint256 _scheduleId) public",
  "function getAllSchedules() public view returns (tuple(string task, string time, string status, address createdBy)[])"
];

const provider = new ethers.providers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contractAddress = process.env.SCHEDULE_ENGINE_ADDRESS;
const contract = new ethers.Contract(contractAddress, ABI, wallet);

const addScheduleToBlockchain = async (task, time) => {
  const tx = await contract.addSchedule(task, time);
  await tx.wait();
  return tx.hash;
};

const updateScheduleOnBlockchain = async (scheduleId, newStatus) => {
  const tx = await contract.updateSchedule(scheduleId, newStatus);
  await tx.wait();
  return tx.hash;
};

const deleteScheduleFromBlockchain = async (scheduleId) => {
  const tx = await contract.deleteSchedule(scheduleId);
  await tx.wait();
  return tx.hash;
};

const getAllSchedulesFromBlockchain = async () => {
  return await contract.getAllSchedules();
};

module.exports = {
  addScheduleToBlockchain,
  updateScheduleOnBlockchain,
  deleteScheduleFromBlockchain,
  getAllSchedulesFromBlockchain
};
