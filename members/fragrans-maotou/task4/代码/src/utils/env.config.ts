import { ERC721TokenAbi } from "../abi/ERC721TokenAbi"
import { NFTMarketAbi } from "../abi/NFTMarketAbi"
import { ERC20TokenAbi } from "../abi/ERC20TokenAbi"
const splitAddress = (str: string) => {
  return str.slice(2);
}

export const erc20_address = `0x${splitAddress(import.meta.env.VITE_ERC20_TOKEN_ADDRESS)}` as `0x${string}`;
export const erc721_address = `0x${splitAddress(import.meta.env.VITE_ERC721_TOKEN_ADDRESS)}` as `0x${string}`;
export const nftMarket_address = `0x${splitAddress(import.meta.env.VITE_NFTMarket_ADDRESS)}` as `0x${string}`;

export const wagmiERC20Contract = {
  address: erc20_address,
  abi: ERC20TokenAbi,
} as const;

export const wagmiERC721Contract = {
  address: erc721_address,
  abi: ERC721TokenAbi,
} as const;

export const wagmiNFTMarketContract = {
  address: nftMarket_address,
  abi: NFTMarketAbi,
} as const;