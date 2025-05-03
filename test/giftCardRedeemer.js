const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("GiftCardRedeemer", function () {
  let giftCardRedeemer, owner, user1, user2, user3;
  beforeEach(async function () {
    [owner, user1, user2, user3] = await ethers.getSigner();
    const GiftCardRedeemer = await ethers.getContractFactory(GiftCardRedeemer);
    giftCardRedeemer = await GiftCardRedeemer.deploy();
    await giftCardRedeemer.waitForDeployment();
  });
});
