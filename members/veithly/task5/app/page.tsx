import type { NextPage } from 'next';
import ConnectWallet from '@/app/components/ConnectWallet';
import ListNFT from '@/app/components/ListNFT';
import DisplayNFTs from '@/app/components/DisplayNFTs';

const Home: NextPage = () => {
  return (
    <div>
      <div className="flex flex-row justify-between p-4">
        <h1>NFT Marketplace</h1>
        <ConnectWallet />
      </div>
      <div className='p-2'>
        <ListNFT className='mb-2' />
        <DisplayNFTs />
      </div>
    </div>
  );
};

export default Home;
