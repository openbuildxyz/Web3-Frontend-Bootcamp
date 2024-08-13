import { http, createConfig } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';

export const config = createConfig({
  chains: [sepolia, mainnet],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});
