import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Gallery } from './gallery';
import { ListNFT } from './market';

function Page() {
  return (
    <div className='flex flex-col p-4 items-end h-screen' >
      <ConnectButton />
      <Gallery />
      <ListNFT />
    </div>
  );
}

export default Page;
