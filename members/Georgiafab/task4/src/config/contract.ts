import { ethers } from "ethers";
import NFTMarket from "@contracts/NFTMarket.sol/NFTMarket.json";
import ERC20Token from "@contracts/ERC20Token.sol/ERC20Token.json";
import ERC721Token from "@contracts/ERC721Token.sol/ERC721Token.json";

export const getContract = async (addr: any, abi: any) => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = await provider.getSigner();
  let contract = new ethers.Contract(addr, abi, signer);
  return { contract, signer };
};

export const getTokenContract = async () => {
  return getContract(
    "0x2AF374aA4DE0559be70b254a49F1A8B7edc23689",
    ERC20Token.abi
  );
};

export const getMarketContract = async () => {
  return getContract(
    "0x56a1bc3578bfa8d881cf2ddf177c0bef62070a11",
    NFTMarket.abi
  );
};

export const getNFTContract = async () => {
  return getContract(
    "0x6F817c5d3ccd451fd38B4cB77E78d85FD1F0810d",
    ERC721Token.abi
  );
};
