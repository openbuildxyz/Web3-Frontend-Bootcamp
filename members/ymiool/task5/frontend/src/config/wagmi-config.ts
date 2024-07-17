import { optimismSepolia } from 'wagmi/chains';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { Config } from 'wagmi';

export const wagmiConfig: Config = getDefaultConfig({
    appName: 'NFT Market',
    projectId: 'task5',
    chains: [optimismSepolia]
});