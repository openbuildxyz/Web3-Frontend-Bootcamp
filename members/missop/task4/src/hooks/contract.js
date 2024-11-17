import { useAccount, useReadContract, useWriteContract } from "wagmi";

import MissopToken from "@/assets/abi/MissopToken.json";
import NftToken from "@/assets/abi/NftToken.json";
import NftMarket from "@/assets/abi/NftMarket.json";

const NftAbi = NftToken.abi;
const NftMarketAbi = NftMarket.abi;
const NftTokenContractAddress = process.env.NftTokenContractAddress;
const NftMarketContractAddress = process.env.NftMarketContractAddress;
const MissopTokenAddress = process.env.MissopTokenContractAddress;

const NFTContractParams = {
  abi: NftAbi,
  address: NftTokenContractAddress,
};
const NFTMarketParams = {
  abi: NftMarketAbi,
  address: NftMarketContractAddress,
};
const MissopTokenParams = {
  abi: MissopToken.abi,
  address: MissopTokenAddress,
};
console.log(MissopTokenParams, NFTMarketParams, NFTContractParams);

/**
 * 写入操作所有方法
 * @returns
 */
export function useWrite() {
  const account = useAccount();
  const { writeContractAsync } = useWriteContract();

  /**
   * 上架 NFT
   * @param {*} tokenId
   * @param {*} price
   * @returns
   */
  async function listNFT(tokenId, price) {
    try {
      return await writeContractAsync({
        functionName: "listNft",
        args: [NftTokenContractAddress, tokenId, price],
        ...NFTMarketParams,
      });
    } catch (error) {
      console.log("error", error);
    }
  }

  /**
   * 铸造 NFT
   * @returns
   */
  async function mintNFT() {
    try {
      return await writeContractAsync({
        functionName: "mint",
        args: [account.address],
        ...NFTContractParams,
      });
    } catch (error) {
      console.log("error", error);
    }
  }

  /**
   * 调用setApprovalForAll，参数为NFTMarket 合约地址和 true
   * @returns
   */
  async function setApprovalForAll() {
    try {
      return await writeContractAsync({
        functionName: "setApprovalForAll",
        args: [NftMarketContractAddress, true],
        ...NFTContractParams,
      });
    } catch (error) {
      console.log("error", error);
    }
  }

  /**
   * 授权NFTMarket 合约使用 MT 代币额度，因此参数为NFTMarket 合约地址
   * @param {*} params
   */
  async function approveAmount(amount) {
    try {
      return await writeContractAsync({
        functionName: "approve",
        args: [NftMarketContractAddress, amount],
        ...MissopTokenParams,
      });
    } catch (error) {
      console.log("error", error);
    }
  }

  /**
   * 购买 NFT
   * @param {*} _tokenId
   * @returns
   */
  async function buyNFT(_tokenId) {
    try {
      return await writeContractAsync({
        functionName: "buyNft",
        args: [NftTokenContractAddress, _tokenId],
        ...NFTMarketParams,
      });
    } catch (error) {
      console.log("error", error);
    }
  }

  return {
    listNFT,
    buyNFT,
    mintNFT,
    approveAmount,
    setApprovalForAll,
  };
}

/**
 * 获取所有上架的 NFT
 * @returns
 */
export function useGetListsNFTs() {
  const { data, error } = useReadContract({
    ...NFTMarketParams,
    functionName: "getListsArray",
  });

  console.log("error", error);

  return data;
}
