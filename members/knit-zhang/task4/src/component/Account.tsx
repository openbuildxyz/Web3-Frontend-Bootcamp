
import * as HoverCard from '@radix-ui/react-hover-card';
import {  useState } from 'react';
import { CircleUserRound } from 'lucide-react';

export const Account = () => {
    const [address] = useState<string>('0x0000000');
    const [balance] = useState<string>('0');
  
    return (
        <HoverCard.Root>
          <HoverCard.Trigger asChild>
              <CircleUserRound />
          </HoverCard.Trigger>
          <HoverCard.Portal>
            <HoverCard.Content className='bg-gray-300 text-white mr-5 p-3 rounded-md flex flex-col'>
              <div>{address}</div>
              <span>{`Balance: ${balance} TEN`}</span>
              <button className='rounded border-1 border-stone-700 bg-red-300 hover:bg-red-500' onClick={() => console.log('disconnect')}>Disconnect</button>
            <HoverCard.Arrow />
          </HoverCard.Content>
        </HoverCard.Portal>
      </HoverCard.Root>
    );
}

