// lib/config.ts
import { createConfig, http } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';

export const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

// export const config = createConfig({
//   chains: [sepolia],
//   connectors: [injected()],
//   transports: {
//     [sepolia.id]: http(),
//   },
// });