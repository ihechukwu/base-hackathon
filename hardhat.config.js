require("@nomicfoundation/hardhat-toolbox");
require("@openzeppelin/hardhat-upgrades");
require("@nomicfoundation/hardhat-ethers");

require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    hardhat: {
      chainId: 31337,
    },
    base: {
      url: process.env.BASE_MAINNET_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 8453,
    },
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 11155111,
      blockConfirmations: 8,
    },
    "lisk-sepolia": {
      url: "https://rpc.sepolia-api.lisk.com",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 4202,
      gasPrice: 1000000000,
    },
    lisk: {
      url: "https://rpc.api.lisk.com",
      accounts: [process.env.PRIVATE_KEY],
      gasPrice: 1000000000,
      chainId: 1135,
    },
  },
  etherscan: {
    apiKey: {
      base: process.env.BASESCAN_API_KEY,
      sepolia: process.env.ETHERSCAN_API_KEY,
    },
  },
};
