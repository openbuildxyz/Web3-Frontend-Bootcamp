import { useWriteContract } from 'wagmi'
import { ERC20ABI, ERC721ABI, NFTEXABI } from '../utils/abi'
import {
  NFTEXContractAddr,
  OBTContractAddr,
  WFTContractAddr,
} from '../utils/contractAddr'

//MintOBT
export const useMintOBT = () => {
  const ERC20Contract = useWriteContract()

  const mintOBT = (num: bigint) =>
    ERC20Contract.writeContract({
      address: OBTContractAddr,
      abi: ERC20ABI,
      functionName: '_mint',
      args: [num],
    })

  return mintOBT
}

//MintNFT
export const useMintNFT = () => {
  const ERC721Contract = useWriteContract()

  const mintNFT = (address: any) =>
    ERC721Contract.writeContract({
      abi: ERC721ABI,
      address: WFTContractAddr,
      functionName: '_mint',
      args: [address],
    })

  return mintNFT
}

//授权NFT
export const useApproveAll = () => {
  const approveContract = useWriteContract()
  const approveAll = () =>
    approveContract.writeContract({
      abi: ERC721ABI,
      address: WFTContractAddr,
      functionName: 'setApprovalForAll',
      args: [NFTEXContractAddr, true],
    })

  return approveAll
}

//上架NFT
export const useListNFT = () => {
  const listContract = useWriteContract()
  const listingNFT = (tokenId: bigint, price: bigint) =>
    listContract.writeContract({
      abi: NFTEXABI,
      address: NFTEXContractAddr,
      functionName: 'ListingNFT',
      args: [WFTContractAddr, tokenId, price],
    })

  return listingNFT
}

//授权OBT
export const useApproveOBT = () => {
  const approveContract = useWriteContract()
  const approveOBT = (address: any, amount: bigint) =>
    approveContract.writeContract({
      abi: ERC20ABI,
      address: OBTContractAddr,
      functionName: 'approve',
      args: [address, amount],
    })

  return approveOBT
}

//购买NFT
export const useBuyNFT = () => {
  const buyContract = useWriteContract()
  const buyNFT = (tokenId: bigint) =>
    buyContract.writeContract({
      abi: NFTEXABI,
      address: NFTEXContractAddr,
      functionName: 'buyNFT',
      args: [WFTContractAddr, tokenId],
    })

  return buyNFT
}
