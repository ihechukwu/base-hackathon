const { ethers, upgrades } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  // console.log("Deploying contracts with account:", deployer.address);

  // Deploy MockUSDC
  const MockUSDC = await ethers.getContractFactory("MockUSDC");
  const mockUSDC = await MockUSDC.deploy();
  await mockUSDC.waitForDeployment(); // Ensure deployment is complete
  const usdcAddress = await mockUSDC.getAddress();
  console.log("MockUSDC deployed to:", usdcAddress);

  // Deploy GiftCardRedeemer as UUPS proxy
  const GiftCardRedeemer = await ethers.getContractFactory("GiftCardRedeemer");
  const redeemer = await upgrades.deployProxy(GiftCardRedeemer, [usdcAddress], {
    initializer: "initialize",
  });
  await redeemer.waitForDeployment(); // Ensure deployment is complete
  const redeemerAddress = redeemer.target;
  console.log("GiftCardRedeemer proxy deployed to:", redeemerAddress);

  // Get Implementation Address
  const implAddress = await upgrades.erc1967.getImplementationAddress(
    redeemerAddress
  );
  console.log("Implementation address:", implAddress);

  // Fund the redeemer contract with USDC
  const amount = ethers.parseUnits("10000", 6); // 10,000 USDC
  await mockUSDC.transfer(redeemerAddress, amount);
  console.log("Funded GiftCardRedeemer with 10,000 USDC");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
