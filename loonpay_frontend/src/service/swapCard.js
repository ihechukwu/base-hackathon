import { ethers } from "ethers";
import { BrowserProvider, Contract } from "ethers";
import abi from './abi.json'

let contractInstance = null;

async function hasSigners() {
  const metamask = window.ethereum;
  if (!metamask) throw new Error("MetaMask not detected");

  const signers = await metamask.request({ method: "eth_accounts" });
  return signers.length > 0;
}

async function requestAccess() {
  const result = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  return result && result.length > 0;
}

async function getProviderOrSigner() {
  const metamask = window.ethereum;
  if (!metamask) throw new Error("MetaMask not installed");

  if (!(await hasSigners()) && !(await requestAccess())) {
    throw new Error("User denied account access");
  }

  const provider = new BrowserProvider(metamask); // ✅ ethers v6 style
  return provider.getSigner();
}

async function getContractInstance() {
  if (contractInstance) return contractInstance; // re-use instance

  const signer = await getProviderOrSigner();
  const address = import.meta.env.VITE_CONTRACT_ADDRESS; // Vite uses VITE_ prefix for env vars!

  contractInstance = new ethers.Contract(
    address,
    abi,
    signer
  );
  return contractInstance;
}

async function autoRegisterUser() {
  const signer = await getProviderOrSigner(); // gets the signer

  const userAddress = await signer.getAddress(); // user address gotten

  const contract = await getContractInstance(); // call our contract instance
  const user = await contract.users(userAddress); // check if address is in our contract
  if (!user.exists) {
    const tx = await contract.register();
    await tx.wait();
    console.log(`registered`);
  }
  return true;
}

async function currentChain() {
  const chainId = await window.ethereum.request({ method: "eth_chainId" });
  return chainId;
}

export default {
  getContractInstance,
  currentChain,
  getProviderOrSigner,
};
