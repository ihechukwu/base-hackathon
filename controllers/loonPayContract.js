require("dotenv").config();
const { ethers } = require("ethers");
const { ERC20_ABI, ABI } = require("../ABI/ABI");

const provider = new ethers.JsonRpcProvider("https://sepolia.base.org");
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(process.env.PROXY_ADDRESS, ABI, wallet);
const usdc = new ethers.Contract(process.env.USDC_ADDRESS, ERC20_ABI, wallet);

module.exports = { contract, usdc };
