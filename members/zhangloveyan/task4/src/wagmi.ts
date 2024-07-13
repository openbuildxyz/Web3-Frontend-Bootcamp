import { http, createConfig } from 'wagmi';
import { sepolia } from 'wagmi/chains';
// import { injected, metaMask } from 'wagmi/connectors';

export const config = createConfig({
    chains: [sepolia],
    // connectors: [injected(), metaMask()],
    transports: {
        [sepolia.id]: http()
    },
});
