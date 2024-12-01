import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import { useReadContract, useAccount, } from 'wagmi'
import { allenTokenAbi } from '../abis/allenTokenAbi'
import { contractAddress } from '../utils/address'
import { log } from 'console';
import { Address } from 'viem';

const Home: NextPage = () => {
  const { address } = useAccount()

  const result = useReadContract({
    abi: allenTokenAbi,
    address: contractAddress.tokenAddress as Address,
    functionName: 'balanceOf',
    args: [address!],
  })

  console.log(address, result);
  

  return (
    <div>

    </div>
  );
};

export default Home;
