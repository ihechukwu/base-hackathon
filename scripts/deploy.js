const { ethers, upgrades } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  // 1. Deploy MockUSDC (regular ERC20)
  const MockUSDC = await ethers.getContractFactory("MockUSDC");
  const mockUSDC = await MockUSDC.deploy();
  await mockUSDC.waitForDeployment();
  console.log("MockUSDC deployed to:", mockUSDC.target);

  // 2. Deploy GiftCardRedeemer (upgradeable)
  const GiftCardRedeemer = await ethers.getContractFactory("GiftCardRedeemer");
  const redeemer = await upgrades.deployProxy(
    GiftCardRedeemer,
    [mockUSDC.target], // Constructor arguments
    {
      initializer: "initialize",
      kind: "uups", // Explicitly set upgrade pattern
    }
  );

  await redeemer.waitForDeployment();
  console.log("GiftCardRedeemer proxy deployed to:", redeemer.target);

  const implementationAddress = await upgrades.erc1967.getImplementationAddress(
    redeemer.target
  );
  console.log("Implementation address:", implementationAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
