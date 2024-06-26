import type { NextPage } from 'next';
import ConnectWallet from './components/ConnectWallet';
import ListNFT from './components/ListNFT';
import DisplayNFTs from './components/DisplayNFTs';
import BuyNFT from './components/BuyNFT';
import { Spacer } from '@nextui-org/react';

const Home: NextPage = () => {
  return (
    <div>
      <h1>NFT Marketplace</h1>
      <Spacer y={1} />
      <ConnectWallet />
      <Spacer y={2} />
      <ListNFT />
      <Spacer y={2} />
      <DisplayNFTs />
      <Spacer y={2} />
      <BuyNFT />
    </div>
  );
};

export default Home;
