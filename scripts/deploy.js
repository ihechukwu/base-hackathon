const { ethers, deployer } = require("hardhat");

async function main() {
  const Redeemer = await ethers.getContractFactory("GiftCardRedeemer");
  const redeemer = await Redeemer.deploy();

  await redeemer.deployed();
  console.log("GiftCardRedeemer deployed to:", redeemer.address);

  // Fund the contract with ETH (e.g., 1 ETH)
  const [owner] = await ethers.getSigners();
  await owner.sendTransaction({
    to: redeemer.address,
    value: ethers.parseEther("1.0"),
  });

  console.log("Contract funded with 1 ETH.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
