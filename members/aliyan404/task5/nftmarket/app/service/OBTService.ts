import { sepolia } from 'viem/chains'
import { wagmiConfig } from '../components/provider/Web3Provider'
import { OBT } from '../utils/ABI/OBT'
import { BaseService } from './BaseService'

export class OBTService extends BaseService {
  constructor(options: { contractAddress: `0x${string}` }) {
    super({
      ...options,
      abi: OBT,
      config: wagmiConfig,
      chainId: sepolia.id,
    })
  }

  async balanceOf(account: `0x${string}`) {
    return this.readContract({
      functionName: 'balanceOf',
      args: [account],
    })
  }

  async mintOBT(amount: bigint) {
    return this.writeContract({
      functionName: '_mint',
      args: [amount],
    })
  }

  async approve(spender: `0x${string}`, amount: bigint) {
    return this.writeContract({
      functionName: 'approve',
      args: [spender, amount],
    })
  }
}
