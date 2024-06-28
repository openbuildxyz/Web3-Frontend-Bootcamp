import {
	USDT_ADDRESS,
	USDC_ADDRESS,
	BNB_ADDRESS,
	LocalChainId,
} from './consts'

export const Tokens = [
	{
		name: 'USDT',
		symbol: 'USDT',
		decimal: 18,
		address: USDT_ADDRESS,
		chainId: LocalChainId
	},
	{
		name: 'USDC',
		symbol: 'USDC',
		decimal: 18,
		address: USDC_ADDRESS,
		chainId: LocalChainId
	},
	{
		name: 'BNB',
		symbol: 'BNB',
		decimal: 18,
		address: BNB_ADDRESS,
		chainId: LocalChainId
	},
]