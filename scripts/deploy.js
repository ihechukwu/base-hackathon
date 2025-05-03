const { ethers } = require("hardhat");

async function main() {
  const GiftCardRedeemer = await ethers.getContractFactory("GiftCardRedeemer");
  const giftCardRedeemer = await GiftCardRedeemer.deploy();
  await giftCardRedeemer.waitForDeployment();
  console.log("deployed at ", giftCardRedeemer.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
