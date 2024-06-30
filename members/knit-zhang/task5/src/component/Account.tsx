import { CircleUserRound} from 'lucide-react';
import * as HoverCard from '@radix-ui/react-hover-card';
import { useAccount, useDisconnect } from 'wagmi';
import {  useState } from 'react';
import { formatUnits } from 'ethers';
import { type Config } from 'wagmi';
import Address from './Address';
import useEthersContract from '../utilities/contract';
import NetworkDetect from './NetworkDetect';

export const Account = () => {
    const { address } = useAccount<Config>();
    const { disconnect } = useDisconnect();
    const [balance, setBalance] = useState<string>('0');
    
    (async function () {
      const TENContract = useEthersContract("Token");
      const balanceWei = await TENContract.balanceOf(address);
      setBalance(formatUnits(balanceWei, 6));
    })();
    
    return (
        <HoverCard.Root>
          <NetworkDetect />
          <HoverCard.Trigger asChild>
              <CircleUserRound />
          </HoverCard.Trigger>
          <HoverCard.Portal>
            <HoverCard.Content className='bg-gray-300 text-white mr-5 p-3 rounded-md flex flex-col'>
              <Address address={address} />
              <span>{`Balance: ${balance} TEN`}</span>
              <button className='rounded border-1 border-stone-700 bg-red-300 hover:bg-red-500' onClick={() => disconnect()}>Disconnect</button>
            <HoverCard.Arrow />
          </HoverCard.Content>
        </HoverCard.Portal>
      </HoverCard.Root>
    );
}

