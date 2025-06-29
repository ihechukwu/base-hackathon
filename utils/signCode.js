const { ethers } = require("ethers");

module.exports = async function signCode(amount, address, privateKey) {
  const wallet = new ethers.Wallet(privateKey);

  const normalizedAddress = address.toLowerCase(); // this is CRITICAL
  const message = `Redeem ${amount} to ${normalizedAddress}`;
  const messageHash = ethers.keccak256(ethers.toUtf8Bytes(message));
  const signature = await wallet.signMessage(ethers.getBytes(messageHash)); // sign the hash as bytes
  return signature;
};
