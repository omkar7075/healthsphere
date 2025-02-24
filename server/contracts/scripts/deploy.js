const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const ScheduleEngine = await hre.ethers.getContractFactory("ScheduleEngine");
  const scheduleEngine = await ScheduleEngine.deploy();
  await scheduleEngine.deployed();

  console.log(`📜 ScheduleEngine deployed to: ${scheduleEngine.address}`);

  // Save contract address
  const contractData = {
    scheduleEngine: scheduleEngine.address
  };

  fs.writeFileSync(
    ".../utils/contractAddresses.json",
    JSON.stringify(contractData, null, 2)
  );

  console.log("✅ Contract addresses saved!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
