import {
	getDefaultConfig,
} from "@rainbow-me/rainbowkit"
import { WETH9 } from '@uniswap/sdk-core'
import { mainnet } from 'wagmi/chains'

export const TOKEN_LIST = [
	{
		name: 'Ethereum',
		symbol: 'WETH',
		icon: 'eth.png',
		decimals: 18,
		chains: [
			{
				chainId: mainnet.id,
				contract: WETH9[mainnet.id].address
			}
		]
	},
	{
		name: 'USD Coin',
		symbol: 'USDC',
		icon: 'usdc.png',
		decimals: 6,
		chains: [
			{
				chainId: mainnet.id,
				contract: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'
			}
		]
	},
	{
		name: 'Tether USD',
		symbol: 'USDT',
		icon: 'usdt.png',
		decimals: 6,
		chains: [
			{
				chainId: mainnet.id,
				contract: '0xdac17f958d2ee523a2206206994597c13d831ec7',
			}
		]
	},
	{
		name: 'ChainLink Token',
		symbol: 'LINK',
		icon: 'link.png',
		decimals: 18,
		chains: [
			{
				chainId: mainnet.id,
				contract: '0x514910771af9ca656af840dff83e8264ecf986ca',
			}
		]
	}
]
export const UNISWAP_V2_ROUTER_CONTRACT = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'
export const ETHERSCAN_API_URL: Record<number, string> = {
	[mainnet.id]: mainnet.blockExplorers.default.apiUrl
}

export const WAGMI_CONFIG = getDefaultConfig({
	appName: "SnowwwwwDex",
	projectId: "YOUR_PROJECT_ID",
	chains: [mainnet],
})