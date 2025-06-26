const { ethers } = require("hardhat");
const { networkConfig } = require("../helper-hardhat-config");
require("dotenv").config();

const CONTRACT_ADDRESS = "0x751d82A7683DdE0f7C9cF3535434040006f49211";

async function main() {
  const [deployer] = await ethers.getSigners();
  const contract = await ethers.getContractAt(
    "GiftCardRedeemer",
    CONTRACT_ADDRESS,
    deployer
  );
  const usdcAdr = await contract.contractBalance();

  console.log(`usdc contract is ${ethers.formatUnits(usdcAdr, 6)}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
