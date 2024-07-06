import { http, createConfig } from 'wagmi';
import { mainnet,base, sepolia } from 'wagmi/chains';
// import { injected, metaMask } from 'wagmi/connectors';

export const config = createConfig({
    chains: [mainnet,base, sepolia],
    // connectors: [injected(), metaMask()],
    transports: {
        [mainnet.id]:http(),
        [base.id]: http(),
        [sepolia.id]: http()
    },
});
