import { Pet3Abi } from '../abi/Pet3'
import { CONTRACT_ADDRESS } from './const'
import { writeContract } from '@wagmi/core'
import { config } from './Web3Provider'

export async function mintAction(address: string) {
  return await writeContract(config, {
    abi: Pet3Abi,
    address: CONTRACT_ADDRESS,
    functionName: 'mint',
    args: [address],
  })
}

export async function ClaimAction(tokenId: number, score: number) {
  return await writeContract(config, {
    abi: Pet3Abi,
    address: CONTRACT_ADDRESS,
    functionName: 'addScore',
    args: [tokenId, score],
  })
}
