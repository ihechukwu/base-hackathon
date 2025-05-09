const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  // deploy mock
  const MockUSDC = await ethers.getContractFactory("MockUSDC");
  const mockUSDC = await MockUSDC.deploy();
  await mockUSDC.waitForDeployment();
  console.log(`MockUSDC deployed to ${mockUSDC.target}`);
  console.log(
    "Total supply:",
    ethers.formatUnits(await mockUSDC.totalSupply(), 6),
    "USDC"
  );

  // Deploy GiftCardRedeemer
  const GiftCardRedeemer = await ethers.getContractFactory("GiftCardRedeemer");
  const giftCardRedeemer = await GiftCardRedeemer.deploy(mockUSDC.target);
  await giftCardRedeemer.waitForDeployment();
  console.log(`GiftCardRedeemer deployed at ${giftCardRedeemer.target}`);

  // funding the contract
  const amount = await ethers.parseEther("1", 6); //1000 USDC
  await mockUSDC.transfer(giftCardRedeemer.target, amount);
  console.log(`contract funded with ${giftCardRedeemer.contractBalance()}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
