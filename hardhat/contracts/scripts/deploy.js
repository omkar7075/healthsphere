const hre = require("hardhat");
const fs = require("fs-extra");
require("dotenv").config();

async function main() {
  console.log("🚀 Starting contract deployment...");

  const contracts = [
    "AdminDashboard",
    "AppointmentBooking",
    "AuthContract",
    "ConsultationContract",
    "DoctorDashboard",
    "HealthArticles",
    "HealthRecordContract",
    "LabBookingContract",
    "MedicineContract",
    "PatientContract",
    "PatientDashboard",
    "PatientRecord",
    "PrescriptionContract",
    "ScheduleEngine",
    "SymptomStorage",
    "TestBookingContract",
    "UserManage",
  ];

  let deployedContracts = {};

  for (const contractName of contracts) {
    console.log(`🚀 Deploying ${contractName}...`);
    
    const ContractFactory = await hre.ethers.getContractFactory(contractName);
    const contractInstance = await ContractFactory.deploy();
    
    await contractInstance.waitForDeployment();  // ✅ Ensures deployment completion

    const contractAddress = await contractInstance.getAddress();
    deployedContracts[contractName] = contractAddress;
    
    console.log(`✅ ${contractName} deployed at: ${contractAddress}`);
  }

  // Save contract addresses to JSON file
  fs.ensureDirSync("deployed");
  fs.writeJsonSync("deployed/contractAddresses.json", deployedContracts, { spaces: 2 });

  console.log("✅ All contracts deployed successfully and saved!");
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});
