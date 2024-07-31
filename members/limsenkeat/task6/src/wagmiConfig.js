import {getDefaultConfig} from '@rainbow-me/rainbowkit';
import { mainnet, polygon, optimism, arbitrum, base, sepolia } from 'wagmi/chains';

export const config = getDefaultConfig({
	appName: 'Uniswap V2 Practice',
	projectId: 'YOUR_PROJECT_ID',
	chains: [mainnet, polygon, optimism, arbitrum, base, sepolia],
	// transports: [

	// ]
});