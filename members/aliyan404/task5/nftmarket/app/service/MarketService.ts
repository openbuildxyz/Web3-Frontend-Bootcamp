import { sepolia } from 'viem/chains'
import { wagmiConfig } from '../components/provider/Web3Provider'
import { NFTMarket } from '../utils/ABI/NFTMarket'
import { BaseService } from './BaseService'

export class MarketService extends BaseService {
  constructor(options: { contractAddress: `0x${string}` }) {
    super({
      ...options,
      abi: NFTMarket,
      config: wagmiConfig,
      chainId: sepolia.id,
    })
  }

  async getListings(nftContract: `0x${string}`, tokenId: bigint) {
    return this.readContract({
      functionName: '_Listings',
      args: [nftContract, tokenId],
    })
  }

  async getAllListings() {
    return this.readContract({
      functionName: 'getAllListNFTs',
      args: [],
    })
  }

  async listingNFT(nftContract: `0x${string}`, tokenId: bigint, price: bigint) {
    return this.writeContract({
      functionName: 'listingNFT',
      args: [nftContract, tokenId, price],
    })
  }

  async buyNFT(nftContract: `0x${string}`, tokenId: bigint) {
    return this.writeContract({
      functionName: 'buyNFT',
      args: [nftContract, tokenId],
    })
  }

  async takeDownNFT(
    owner: `0x${string}`,
    nftContract: `0x${string}`,
    tokenId: bigint
  ) {
    return this.writeContract({
      functionName: 'takeDownNFT',
      args: [owner, nftContract, tokenId],
    })
  }
}
