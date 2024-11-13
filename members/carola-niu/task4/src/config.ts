import { createConfig, http } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
};

export const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http('https://sepolia.infura.io/v3/149a221080fd4e3b92fb01ee12f17475'),
  },
});


export const hashUrl = 'https://sepolia.etherscan.io/tx/';

export const MyTokenAddress = '0x2bbBFaad3982C354Ae3aaA23aE4321Ae22079774';
export const MyNFTAddress = '0x4278147757aEea278fB7a2f1d20A500548Ca6DBF';
export const NFTMarketAddress = '0xDBa365B75F39224e5585b105933310F700E65921';
