import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'wagmi';
import { base, mainnet, sepolia, hardhat } from 'wagmi/chains';

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}

export const config = getDefaultConfig({
  appName: 'MaoTouApp',
  projectId: '0.0.1',
  chains: [base, mainnet, sepolia, hardhat],
  ssr: true,
  // 可以设置为本地网络 http://localhost:8545
  transports: {
    [base.id]: http(),
    [mainnet.id]: http('https://eth-mainnet.g.alchemy.com/v2/...'),
    [sepolia.id]: http('https://eth-sepolia.g.alchemy.com/v2/...'),
    [hardhat.id]: http(),
  }
});

