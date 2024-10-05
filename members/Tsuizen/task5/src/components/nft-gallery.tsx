import { useReadContract, useWriteContract, useAccount } from 'wagmi';
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

const defaultImage =
  'https://i.pinimg.com/originals/85/bb/ff/85bbff5d601f6facc2d886035bbb024f.jpg';

function formatTime(time: number) {
  const date = new Date(time * 1000);
  return date.toLocaleDateString();
}

export default function NFTGallery() {
  const { writeContractAsync } = useWriteContract();
  const account = useAccount();

  const { toast } = useToast();

  // 过滤已下架的NFT，并按tokenId排序
  const result = (
    (useReadContract({
      abi: NFTExchange,
      address: NFT_MARKET_ADDRESS,
      functionName: 'getListedNFTs'
    }).data || []) as NFTItem[]
  )
    .filter((item) => item.isActive)
    .sort((a, b) => Number(a.tokenId) - Number(b.tokenId));

  console.log('result', result);

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

      console.log('res',res);

      toast({
        title: 'success'
      });
    } catch (err) {
      console.log('err', err);
    }
  };

  const handleRemoveNFT = (tokenId: number) => {
    writeContractAsync({
      abi: NFTExchange,
      address: NFT_MARKET_ADDRESS,
      functionName: 'removeNFT',
      args: [ZEN_NFT_ADDRESS, tokenId]
    });
  };

  return (
    <div className='flex justify-evenly p-3'>
      {result.map((item) => (
        <Card
          className='w-52 flex item-center flex-col flex-wrap overflow-hidden'
          key={item.tokenId}>
          <img
            src={item.tokenUrl || defaultImage}
            className='w-52 h-52 object-cover'></img>
          <div className='m-auto'>Token ID: {Number(item.tokenId)}</div>
          <div className='m-auto'>
            Price: {Number(item.price) / 1000000} ZEN
          </div>
          <div className='flex flex-col flex-wrap items-center p-2 box-border w-52'>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className='text-ellipsis overflow-hidden whitespace-nowrap w-48'>
                  List Time: {formatTime(Number(item.listedAt))}
                </TooltipTrigger>
                <TooltipContent>
                  <p>{formatTime(Number(item.listedAt))}</p>
                </TooltipContent>
              </Tooltip>
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

            {account.address === item.seller ? (
              <Button
                disabled={!item.isActive}
                onClick={() => handleRemoveNFT(Number(item.tokenId))}>
                delist
              </Button>
            ) : (
              <Button
                className='mr-4'
                disabled={!item.isActive}
                onClick={() =>
                  handleBuyNFT(Number(item.tokenId), Number(item.price))
                }>
                {item.isActive ? 'buy' : 'sold'}
              </Button>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}
