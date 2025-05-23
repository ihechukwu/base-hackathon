// scripts/deploy.js
const { networkConfig } = require("../helper-hardhat-config");
const { ethers, upgrades } = require("hardhat");

const chainId = network.config.chainId;

// Base Mainnet USDC address
// const BASE_USDC = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";

async function main() {
  if (!networkConfig[chainId]) {
    throw new Error(`Network with chain ID ${chainId} is not supported`);
  }

  const USDC_ADDRESS = networkConfig[chainId].USDC_ADDRESS;
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  // 1. Deploy GiftCardRedeemer (Upgradeable)
  const GiftCardRedeemer = await ethers.getContractFactory("GiftCardRedeemer");
  const redeemer = await upgrades.deployProxy(
    GiftCardRedeemer,
    [USDC_ADDRESS], // Use Base's official USDC
    {
      initializer: "initialize",
      kind: "uups",
      gasPrice: ethers.parseUnits("0.001", "gwei"), // Base gas price
    }
  );

  await redeemer.waitForDeployment();

  console.log("Proxy deployed to:", await redeemer.getAddress());
  console.log(
    "Implementation address:",
    await upgrades.erc1967.getImplementationAddress(await redeemer.getAddress())
  );

  // 2. Verify contract (run separately after deployment)
  console.log("\nRun this to verify:");
  console.log(
    `npx hardhat verify --network base ${await redeemer.getAddress()} ${BASE_USDC}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
