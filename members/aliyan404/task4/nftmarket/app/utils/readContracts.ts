import { useReadContract } from 'wagmi'
import { ERC20ABI, ERC721ABI, NFTEXABI } from '../utils/abi'
import {
  OBTContractAddr,
  WFTContractAddr,
  NFTEXContractAddr,
} from '../utils/contractAddr'

//ETH相关
export const useOBTBalance = (address: any) => {
  const ethBalance = useReadContract({
    abi: ERC20ABI,
    address: OBTContractAddr,
    functionName: 'balanceOf',
    args: [address],
  })

  return ethBalance
}

//NFT相关
export const useNFTBalance = (address: any) => {
  const nftBalance = useReadContract({
    abi: ERC721ABI,
    address: WFTContractAddr,
    functionName: 'balanceOf',
    args: [address],
  })

  return nftBalance?.data
}

export const useListings = (address: any, tokenId: bigint) => {
  const nftListings = useReadContract({
    abi: NFTEXABI,
    address: NFTEXContractAddr,
    functionName: '_Listings',
    args: [address, tokenId],
  })

  return nftListings?.data
}

export const useAllNFTs = () => {
  const allNFTs = useReadContract({
    abi: NFTEXABI,
    address: NFTEXContractAddr,
    functionName: 'getAllListNFTs',
    args: [],
  })

  return allNFTs?.data
}

export const useIsApproveAll = (userAddress: any, contractAddress: any) => {
  const isApproveAll = useReadContract({
    abi: ERC721ABI,
    address: WFTContractAddr,
    functionName: 'isApprovedForAll',
    args: [userAddress, contractAddress],
  })

  return isApproveAll?.data
}
