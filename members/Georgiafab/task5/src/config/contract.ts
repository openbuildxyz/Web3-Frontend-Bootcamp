import { ethers } from "ethers";
import NFTMarket from "@contracts/NFTMarket.sol/NFTMarket.json";
import ERC20Token from "@contracts/ERC20Token.sol/MTK.json";
import ERC721Token from "@contracts/ERC721Token.sol/MILKNT.json";

export const getContract = async (addr: any, abi: any) => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = await provider.getSigner();
  let contract = new ethers.Contract(addr, abi, signer);
  return { contract, signer };
};

export const getTokenContract = async () => {
  return getContract(process.env.NEXT_PUBLIC_ERC_20_ADDRESS, ERC20Token.abi);
};

export const getMarketContract = async () => {
  return getContract(process.env.NEXT_PUBLIC_NFT_MARKET_ADDRESS, NFTMarket.abi);
};

export const getNFTContract = async () => {
  return getContract(process.env.NEXT_PUBLIC_ERC_721_ADDRESS, ERC721Token.abi);
};
