import type { CryptoInputProps } from '@ant-design/web3'

type CryptoValue = CryptoInputProps['value']
type ContractAddress = `0x${string}`
type ContractAbi = Record<string, any>[]

export type { CryptoValue, ContractAddress, ContractAbi }
export type { Token as UniswapToken } from '@uniswap/sdk-core'
