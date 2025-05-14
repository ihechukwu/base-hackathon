const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");

describe("GiftCardRedeemer", function () {
  let usdcToken;
  let redeemer;
  let owner, user1, user2, unregistered;

  before(async function () {
    [owner, user1, user2, unregistered] = await ethers.getSigners();

    // Deploy MockUSDC
    const MockUSDC = await ethers.getContractFactory("MockUSDC");
    usdcToken = await MockUSDC.deploy();
    await usdcToken.waitForDeployment();

    // Deploy GiftCardRedeemer
    const GiftCardRedeemer = await ethers.getContractFactory(
      "GiftCardRedeemer"
    );
    redeemer = await upgrades.deployProxy(
      GiftCardRedeemer,
      [await usdcToken.getAddress()],
      { initializer: "initialize" }
    );
    await redeemer.waitForDeployment();

    // Fund contract with 10,000 USDC
    const amount = ethers.parseUnits("10000", 6);
    await usdcToken.transfer(await redeemer.getAddress(), amount);
  });

  describe("Initialization", function () {
    it("Should set the right USDC token address", async function () {
      expect(await redeemer.usdcToken()).to.equal(await usdcToken.getAddress());
    });

    it("Should set the deployer as owner", async function () {
      expect(await redeemer.owner()).to.equal(owner.address);
    });

    it("Should reject reinitialization", async function () {
      await expect(
        redeemer.initialize(ethers.ZeroAddress)
      ).to.be.revertedWithCustomError(redeemer, "InvalidInitialization");
    });
  });

  describe("User Registration", function () {
    it("Should allow users to register", async function () {
      await expect(redeemer.connect(user1).register())
        .to.emit(redeemer, "UserRegistered")
        .withArgs(user1.address);

      expect(await redeemer.registeredUsers(user1.address)).to.be.true;
      expect(await redeemer.totalUsers()).to.equal(1);
    });

    it("Should prevent double registration", async function () {
      await expect(
        redeemer.connect(user1).register()
      ).to.be.revertedWithCustomError(redeemer, "AlreadyRegistered");
    });
  });

  describe("Token Claims", function () {
    const claimAmount = ethers.parseUnits("10", 6); // 10 USDC

    beforeEach(async function () {
      // Reset redeemer and register users
      const GiftCardRedeemer = await ethers.getContractFactory(
        "GiftCardRedeemer"
      );
      redeemer = await upgrades.deployProxy(
        GiftCardRedeemer,
        [await usdcToken.getAddress()],
        { initializer: "initialize" }
      );
      await redeemer.waitForDeployment();

      // Fund again
      const amount = ethers.parseUnits("10000", 6);
      await usdcToken.transfer(await redeemer.getAddress(), amount);

      await redeemer.connect(user1).register();
      await redeemer.connect(user2).register();
    });

    it("Should allow registered users to claim", async function () {
      const initialBalance = await usdcToken.balanceOf(user1.address);

      await expect(redeemer.connect(user1).claimTokens(claimAmount))
        .to.emit(redeemer, "FundsClaimed")
        .withArgs(user1.address, claimAmount);

      const newBalance = await usdcToken.balanceOf(user1.address);
      expect(newBalance - initialBalance).to.equal(claimAmount);
    });

    it("Should prevent unregistered claims", async function () {
      await expect(
        redeemer.connect(unregistered).claimTokens(claimAmount)
      ).to.be.revertedWithCustomError(redeemer, "NotRegistered");
    });

    it("Should enforce minimum amount", async function () {
      const smallAmount = ethers.parseUnits("0.5", 6); // 0.5 USDC
      await expect(
        redeemer.connect(user1).claimTokens(smallAmount)
      ).to.be.revertedWithCustomError(redeemer, "ZeroAmount");
    });
  });

  describe("Admin Functions", function () {
    it("Should allow owner to pause", async function () {
      await redeemer.pause();
      expect(await redeemer.paused()).to.be.true;
    });

    it("Should prevent non-owners from pausing", async function () {
      await expect(redeemer.connect(user1).pause())
        .to.be.revertedWithCustomError(redeemer, "OwnableUnauthorizedAccount")
        .withArgs(user1.address);
    });

    it("Should allow emergency withdraw by owner", async function () {
      const initialBalance = await usdcToken.balanceOf(owner.address);
      const contractBalance = await usdcToken.balanceOf(
        await redeemer.getAddress()
      );

      await expect(
        redeemer.emergencyWithdraw(
          await usdcToken.getAddress(),
          contractBalance
        )
      )
        .to.emit(redeemer, "EmergencyWithdraw")
        .withArgs(await usdcToken.getAddress(), contractBalance);

      const newBalance = await usdcToken.balanceOf(owner.address);
      expect(newBalance - initialBalance).to.equal(contractBalance);
    });
  });
});
