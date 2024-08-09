import type { NextPage } from 'next';
import Logo from "./"
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import Image from 'next/image';
import { Swap } from '../components/Swap';

const Home: NextPage = () => {
  return (
    <div className=''>
      <header className='flex h-[100px] justify-between items-center px-[50px]'>
        <div className='flex items-center gap-5'>
          <Image src={'./moralis-logo.svg'} alt="Logo" width={40} height={40} className='mr-5'/>
          <Link href="./" className='text-lg'>Swap</Link>
          <Link href="./token" className='text-lg'>Tokens</Link>
        </div>
        <div className='flex justify-center items-center gap-5'>
          <ConnectButton />
        </div>
      </header>
      <div className='mt-10 flex justify-center'>
        <Swap />
      </div>
    </div>
  );
};

export default Home;
