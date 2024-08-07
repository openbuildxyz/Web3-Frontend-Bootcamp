import { http, createConfig } from 'wagmi'
import { localhost } from 'wagmi/chains'


export const config = createConfig({
	chains: [localhost],
	transports: {
		[localhost.id]: http('http://localhost:8545'),
	},
})