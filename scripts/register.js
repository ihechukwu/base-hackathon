const { ethers } = require("hardhat");
require("dotenv").config();

const CONTRACT_ADDRESS = "0x751d82A7683DdE0f7C9cF3535434040006f49211";
async function main() {
  const [signer] = await ethers.getSigners();
  const contract = await ethers.getContractAt(
    "GiftCardRedeemer",
    CONTRACT_ADDRESS,
    signer
  );
  const tx = await contract.register();
  await tx.wait();

  console.log(`user ${signer.address} registered`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
