import { http, createConfig } from 'wagmi'
import { sepolia } from 'wagmi/chains'


export const config = createConfig({
	chains: [sepolia],
	transports: {
		[sepolia.id]: http(import.meta.env.VITE_JSON_RPC_URL || ''),
	},
})