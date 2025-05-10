const { ethers } = require("hardhat");
const { expect, assert } = require("chai");

describe("GiftCardRedeemer", function () {
  let giftCardRedeemer, owner, user1, user2, user3, mockUSDC;
  beforeEach(async function () {
    // getting the users
    [owner, user1, user2, user3] = await ethers.getSigners();

    const MockUSDC = await ethers.getContractFactory("MockUSDC"); // get mock contract
    mockUSDC = await MockUSDC.deploy(); // deploy mock
    await mockUSDC.waitForDeployment(); // wait for deployment

    // deploy the contract
    const GiftCardRedeemer = await ethers.getContractFactory(
      "GiftCardRedeemer"
    );
    giftCardRedeemer = await GiftCardRedeemer.deploy(mockUSDC.target);
    await giftCardRedeemer.waitForDeployment();

    const amount = ethers.parseUnits("10000", 6);
    const tx = await mockUSDC.transfer(giftCardRedeemer.target, amount);
    await tx.wait();
  });
  describe("Deployment", function () {
    it("should set the right usdc token address", async function () {
      expect(await giftCardRedeemer.usdcToken()).to.equal(mockUSDC.target);
    });
    it("should set the right owner", async function () {
      expect(await giftCardRedeemer.owner()).to.equal(owner.address);
    });
  });
  describe("Registration", function () {
    it("Should allow users register", async function () {
      await expect(giftCardRedeemer.connect(user1).register())
        .to.emit(giftCardRedeemer, "UserRegistered")
        .withArgs(user1.address);
      expect(await giftCardRedeemer.registeredUsers(user1.address)).to.be.true;
    });
    it("should not allow for double registration", async function () {
      await giftCardRedeemer.connect(user1).register();
      await expect(
        giftCardRedeemer.connect(user1).register()
      ).to.be.revertedWithCustomError(giftCardRedeemer, "AlreadyRegistered");
    });
    it("should keep record of registered users", async function () {
      await giftCardRedeemer.connect(user1).register();
      await giftCardRedeemer.connect(user2).register();
      expect(await giftCardRedeemer.totalUsers()).to.equal(2);
      expect(await giftCardRedeemer.registeredUsers(user1.address)).to.be.true;
      expect(await giftCardRedeemer.registeredUsers(user2.address)).to.be.true;
    });
  });
  describe("Claiming token", function () {
    beforeEach(async function () {
      await giftCardRedeemer.connect(user1).register();
      await giftCardRedeemer.connect(user2).register();
    });
    it("Should allow registered users to claim", async function () {
      const initialBalance = await mockUSDC.balanceOf(user1.address);

      await expect(
        giftCardRedeemer.connect(user1).claimTokens(ethers.parseUnits("1", 6))
      )
        .to.emit(giftCardRedeemer, "FundsClaimed")
        .withArgs(user1.address, ethers.parseUnits("1", 6));

      const newBalance = await mockUSDC.balanceOf(user1.address);
      expect(newBalance - initialBalance).to.equal(ethers.parseUnits("1", 6));
    });
    it("should prevent unregistered users to claim", async function () {
      await expect(
        giftCardRedeemer.connect(user3).claimTokens(ethers.parseUnits("1", 6))
      ).to.be.revertedWithCustomError(giftCardRedeemer, "NotRegistered");
    });
    it("should prevent claiming below minimum amount", async function () {
      await expect(
        giftCardRedeemer.connect(user1).claimTokens(ethers.parseUnits("0.5", 6))
      ).to.revertedWithCustomError(giftCardRedeemer, "ZeroAmount");
    });
    it("should commulate the total distributed amount", async function () {
      await giftCardRedeemer
        .connect(user1)
        .claimTokens(ethers.parseUnits("1", 6));
      await giftCardRedeemer
        .connect(user1)
        .claimTokens(ethers.parseUnits("2", 6));
      expect(await giftCardRedeemer.totalDistributed()).to.equal(
        ethers.parseUnits("3", 6)
      );
    });
  });
  describe("Admin functionalities", function () {
    it("should allow owner pause and resume ", async function () {
      await giftCardRedeemer.pause();
      expect(await giftCardRedeemer.paused()).to.be.true;
      await giftCardRedeemer.unpause();
      expect(await giftCardRedeemer.paused()).to.be.false;
    });

    it("Should allow emergency withdraw by owner", async function () {
      const initialBalance = await mockUSDC.balanceOf(owner.address);
      const contractBalance = await mockUSDC.balanceOf(giftCardRedeemer.target);

      await expect(
        giftCardRedeemer.emergencyWithdraw(mockUSDC.target, contractBalance)
      )
        .to.emit(giftCardRedeemer, "EmergencyWithdraw")
        .withArgs(mockUSDC.target, contractBalance);

      const newBalance = await mockUSDC.balanceOf(owner.address);
      expect(newBalance - initialBalance).to.equal(contractBalance);
    });
    it("Should show correct contract balance", async function () {
      const directBalance = await mockUSDC.balanceOf(giftCardRedeemer.target);
      const contractReportedBalance = await giftCardRedeemer.contractBalance();
      expect(contractReportedBalance).to.equal(directBalance);
    });
  });
});
