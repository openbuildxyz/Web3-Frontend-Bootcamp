import { sepolia } from 'viem/chains'
import { wagmiConfig } from '../components/provider/Web3Provider'
import { NFT } from '../utils/ABI/NFT'
import { BaseService } from './BaseService'

export class NFTService extends BaseService {
  constructor(options: { contractAddress: `0x${string}` }) {
    super({
      ...options,
      abi: NFT,
      config: wagmiConfig,
      chainId: sepolia.id,
    })
  }

  async balanceOf(owner: `0x${string}`) {
    return this.readContract({
      functionName: 'balanceOf',
      args: [owner],
    })
  }

  async isApprovedForAll(owner: `0x${string}`, operator: `0x${string}`) {
    return this.readContract({
      functionName: 'isApprovedForAll',
      args: [owner, operator],
    })
  }

  async mintNFT(to: `0x${string}`, uri: string) {
    return this.writeContract({ functionName: 'safeMint', args: [to, uri] })
  }

  async setApprovedForAll(operator: `0x${string}`, approved: boolean) {
    return this.writeContract({
      functionName: 'setApprovalForAll',
      args: [operator, approved],
    })
  }

  async getTokenURI(tokenId: bigint) {
    return this.readContract({
      functionName: 'tokenURI',
      args: [tokenId],
    })
  }
}
