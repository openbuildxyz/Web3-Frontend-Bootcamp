import { TOKEN_LIST } from '@/lib/constants'
import { ETHERSCAN_API_URL, WAGMI_CONFIG } from '@/lib/constants'
import { CurrencyAmount, Token, WETH9 } from '@uniswap/sdk-core'
import { Pair, Route } from '@uniswap/v2-sdk'
import { readContract } from '@wagmi/core'
import type { Address } from 'viem'
import type { Abi } from './types'

const AbiCacheMap: Record<Address, Abi> = {}

export function getTokenInfo(symbol: string) {
	return TOKEN_LIST.find(token => token.symbol === symbol)
}

export function createToken(chainId: number, symbol: string) {
	if (symbol === 'WETH')
		return WETH9[chainId]

	const tokenInfo = TOKEN_LIST.find(token => token.symbol === symbol)!
	const tokenChain = tokenInfo.chains.find(chain => chain.chainId === chainId)!

	const tokenName = tokenInfo.name
	const tokenSymbol = tokenInfo.symbol
	const tokenDecimals = tokenInfo.decimals
	const tokenAddress = tokenChain.contract

	return new Token(chainId, tokenAddress, tokenDecimals, tokenSymbol, tokenName)
}

export async function createPair(chainId: number, tokens: Token[]): Promise<Pair | undefined> {
	const pairAddress = Pair.getAddress(tokens[0], tokens[1]) as Address
	const pairAbi = await getContractAbi(chainId, pairAddress)

	let reserves: number[] = []
	let pair: Pair | undefined

	try {
		reserves = await readContract(WAGMI_CONFIG, {
			abi: pairAbi,
			address: pairAddress,
			functionName: 'getReserves'
		}) as number[]

		const [token0, token1] = tokens[0].sortsBefore(tokens[1]) ? tokens : [tokens[1], tokens[0]]
		pair = new Pair(CurrencyAmount.fromRawAmount(token0, `${reserves[0]}`), CurrencyAmount.fromRawAmount(token1, `${reserves[1]}`))
	}
	catch (error) {
		console.log(error);
	}

	return pair
}

export async function createRoute(chainId: number, tokens: Token[]) {
	const pair = await createPair(chainId, tokens)
	return pair ? new Route([pair], tokens[0], tokens[1]) : null
}

export async function getContractAbi(chainId: number, contractAddress: Address): Promise<Abi> {
	if (AbiCacheMap[contractAddress])
		return AbiCacheMap[contractAddress]

	const url = new URL(ETHERSCAN_API_URL[chainId])
	const searchParams = url.searchParams
	searchParams.append('module', 'contract')
	searchParams.append('action', 'getabi')
	searchParams.append('address', contractAddress)
	searchParams.append('apikey', import.meta.env.VITE_ETHERSCAN_API_KEY)

	const fetchResponse = await fetch(url.href)
	if (!fetchResponse.ok)
		return []

	const data = await fetchResponse.json()
	const abi = JSON.parse(data.result) as Abi
	AbiCacheMap[contractAddress] = abi

	return abi
}