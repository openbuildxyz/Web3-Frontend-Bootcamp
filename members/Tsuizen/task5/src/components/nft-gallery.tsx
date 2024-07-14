import { useReadContract, useWriteContract } from 'wagmi';
import { Card } from './ui/card';
import { NFTExchange } from '@/abis/NFTExchange';
import {
  NFT_MARKET_ADDRESS,
  ZEN_NFT_ADDRESS,
  ZEN_TOKEN_ADDRESS
} from '@/constants';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from './ui/tooltip';

import { Button } from './ui/button';
import { NFTItem } from '@/types';
import { useToast } from './ui/use-toast';
import { ZenToken } from '@/abis/ZenToken';

export default function NFTGallery() {
  const { writeContractAsync } = useWriteContract();

  const { toast } = useToast();

  const handleBuyNFT = async (tokenId: number, price: number) => {
    try {
      await writeContractAsync({
        abi: ZenToken,
        address: ZEN_TOKEN_ADDRESS,
        functionName: 'approve',
        args: [NFT_MARKET_ADDRESS, price]
      });

      const res = await writeContractAsync({
        abi: NFTExchange,
        address: NFT_MARKET_ADDRESS,
        functionName: 'buyNFT',
        args: [ZEN_NFT_ADDRESS, tokenId]
      });

      console.log(res);

      toast({
        title: 'success'
      });
    } catch (err) {
      console.log(err);
    }
  };

  const result = (useReadContract({
    abi: NFTExchange,
    address: NFT_MARKET_ADDRESS,
    functionName: 'getListedNFTs'
  }).data || []) as NFTItem[];

  console.log('result', result);

  return (
    <div className='flex justify-evenly p-3'>
      {result.map((item) => (
        <Card
          className='w-52 flex item-center flex-col flex-wrap overflow-hidden'
          key={item.tokenId}>
          <img src={item.tokenUrl} className='w-52 h-52 object-cover'></img>
          <div className='m-auto'>Token ID: {Number(item.tokenId)}</div>
          <div className='m-auto'>Price: {Number(item.price) / 1000000} ZEN</div>
          <div className='flex flex-col flex-wrap items-center p-2 box-border w-52'>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className='text-ellipsis overflow-hidden whitespace-nowrap w-48'>
                  NFT Address: {item.nftContract}
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.nftContract}</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger className='text-ellipsis overflow-hidden whitespace-nowrap w-48'>
                  Seller: {item.seller}
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.seller}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Button
              disabled={!item.isActive}
              onClick={() =>
                handleBuyNFT(Number(item.tokenId), Number(item.price))
              }>
              {item.isActive ? 'buy' : 'sold'}
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
