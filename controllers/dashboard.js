const Card = require("../models/Card");
const { StatusCodes } = require("http-status-codes");
// const signature = require("../utils/signCode");
const { BadRequestError } = require("../errors");
const { contract, usdc } = require("./loonPayContract");
const { ethers } = require("ethers");
require("dotenv").config();

const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
const dashboard = async (req, res) => {
  console.log("reaching");
  res.status(StatusCodes.OK).json({ msg: `welcome back ${req.user.email}` });
};

const redeemCode = async (req, res) => {
  const { code, amount, address } = req.body;
  if (!code || !amount) {
    throw new BadRequestError("invalid inputs");
  }
  try {
    // const sig = await signature(
    //   ethers.parseUnits(amount, 6),
    //   address,
    //   process.env.PRIVATE_KEY
    // );

    const message = `Redeem ${ethers.parseUnits(
      amount,
      6
    )} to ${address.toLowerCase()}`;
    const messageHash = ethers.keccak256(ethers.toUtf8Bytes(message));
    const signature = await wallet.signMessage(ethers.getBytes(messageHash));

    const tx = await contract.redeem(
      address,
      code,
      ethers.parseUnits(amount, 6),
      signature
    );

    await tx.wait();
    // if (tx) {
    //   const card = new Card({
    //     code: code,
    //     used: true,
    //     createdBy: req.user.email,
    //   });
    //   await card.save();
    // }

    res.status(StatusCodes.OK).json({ msg: "Redeemed", txHash: tx.hash });
  } catch (error) {
    console.error("Redeem error:", error);
    res
      .status(500)
      .json({ message: "Redemption failed", error: error.message });
  }
};
const deposit = async (req, res) => {
  let { amount } = req.body;

  console.log(amount);
  if (!amount) {
    throw new BadRequestError("invalid input");
  }
  try {
    amount = ethers.parseUnits(amount, 6);
    const txx = await usdc.approve(process.env.PROXY_ADDRESS, amount);
    await txx.wait();
    const tx = await contract.deposit(amount);
    await tx.wait();
    res
      .status(StatusCodes.OK)
      .json({ msg: "deposit successful", txhash: tx.hash });
  } catch (error) {
    console.log(error.message);
  }
};

const test = async (req, res) => {
  const trusted = await contract.trustedBackend();
  console.log("Trusted Backend:", trusted);
};
module.exports = { dashboard, redeemCode, deposit, test };
