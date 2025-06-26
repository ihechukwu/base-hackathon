const { ethers } = require("hardhat");
const { networkConfig } = require("../helper-hardhat-config");
require("dotenv").config();

// const chainId = network.config.chainId;
const CONTRACT_ADDRESS = "0x12D482D8693ffD478684A0aeff87E5217548a08D";
console.log(CONTRACT_ADDRESS);
async function main() {
  const [signer] = await ethers.getSigners();
  const contract = await ethers.getContractAt(
    "GiftCardRedeemer",
    "0x12D482D8693ffD478684A0aeff87E5217548a08D",
    signer
  );
  const balance = await contract.contractBalance();
  console.log(`USDC balance: ${ethers.formatUnits(balance, 6)}USDC`);
  //   const usdcAdr = await contract.usdcToken();

  //   console.log("usdc token address set:", usdcAdr);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
