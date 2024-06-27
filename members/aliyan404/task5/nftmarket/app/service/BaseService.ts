import { sepolia } from 'viem/chains'
import { readContract, writeContract } from 'wagmi/actions'

export class BaseService {
  contractAddress: `0x${string}`
  abi: any
  config: any
  chainId: number

  constructor({
    contractAddress,
    abi,
    config,
    chainId,
  }: {
    contractAddress: `0x${string}`
    abi: any
    config: any
    chainId: number
  }) {
    // 设置合约地址
    this.contractAddress = contractAddress
    // 设置合约abi
    this.abi = abi
    // 设置合约配置
    this.config = config
    // 设置合约链id
    this.chainId = chainId
  }

  async readContract({
    functionName,
    args,
  }: {
    functionName: string
    args?: any
  }) {
    const result = await readContract(this.config, {
      abi: this.abi,
      address: this.contractAddress,
      functionName: functionName,
      args: args,
      chainId: sepolia.id,
    })
    console.log(this.config, {
      abi: this.abi,
      address: this.contractAddress,
      functionName: functionName,
      args: args,
      chainId: sepolia.id,
    }, result)

    return result
  }

  async writeContract({
    functionName,
    args,
  }: {
    functionName: string
    args?: any
  }) {
    const result = await writeContract(this.config, {
      abi: this.abi,
      address: this.contractAddress as `0x${string}`,
      functionName: functionName,
      args: args,
      chainId: sepolia.id,
    })

    return result
  }
}
