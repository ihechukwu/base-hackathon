
import { ethers } from "ethers";
import Counter from "@/abi/Counter.json"; // import your ABI properly

let contractInstance = null;

async function hasSigners() {
  const metamask = window.ethereum;
  if (!metamask) throw new Error("MetaMask not detected");

  const signers = await metamask.request({ method: 'eth_accounts' });
  return signers.length > 0;
}

async function requestAccess() {
  const result = await window.ethereum.request({ method: 'eth_requestAccounts' });
  return result && result.length > 0;
}

async function getProviderOrSigner() {
  const metamask = window.ethereum;
  if (!metamask) throw new Error("MetaMask not installed");

  if (!(await hasSigners()) && !(await requestAccess())) {
    throw new Error("User denied account access");
  }

  const provider = new ethers.providers.Web3Provider(metamask);
  return provider.getSigner();
}

async function getContractInstance() {
  if (contractInstance) return contractInstance; // re-use instance

  const signer = await getProviderOrSigner();
  const address = import.meta.env.VITE_CONTRACT_ADDRESS; // Vite uses VITE_ prefix for env vars!

  contractInstance = new ethers.Contract(address, Counter.abi, signer);
  return contractInstance;
}

async function currentChain() {
  const chainId = await window.ethereum.request({ method: 'eth_chainId' });
  return chainId;
}

export default {
  getContractInstance,
  currentChain
};
