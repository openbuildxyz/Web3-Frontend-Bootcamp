'use client';
import { useReadContract, useAccount, useWriteContract } from 'wagmi';

import {
  getExchangeFuncVars,
  NFTMARKET_ADDR,
  getTokenFuncVars,
} from '@/abis/contract';

import { formatUnits } from 'viem';
import { useToast } from '@/components/ui/use-toast';
import { INFTITem } from '@/types/NFTMarket';
import { FC, useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
const Item: FC<{
  data: INFTITem;
}> = ({ data: nft }) => {
  const { toast } = useToast();
  const account = useAccount();
  const [loading, setLoading] = useState(false);
  const { writeContractAsync } = useWriteContract();
  const buyNft = async (nft: any) => {
    if (!nft.isActive) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: `NFT ${nft.nftContract}#${Number(
          nft.tokenId,
        )} is not active, you cannot buy it.`,
      });
      return;
    }

    if (!account) {
      toast({
        description: 'Please connect wallet first.',
      });
    }

    if (nft.seller === account.address) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: `NFT ${nft.nftContract}#${Number(nft.tokenId)} `,
      });
      return;
    }

    try {
      setLoading(true);
      await writeContractAsync(
        getTokenFuncVars('approve', [NFTMARKET_ADDR, nft.price]),
      );
      await writeContractAsync(
        getExchangeFuncVars('buyNFT', [
          nft.nftContract,
          formatUnits(nft.tokenId, 0),
        ]),
      );
      toast({
        variant: 'success',
        description:
          "Buy NFT success, please wait for the transaction to be confirmed.'",
      });
    } catch (err: any) {
      console.log('buy failed', err.message);
    } finally {
      setLoading(false);
    }
  };

  const infoClassName =
    'overflow-hidden overflow-ellipsis  text-sm w-full text-sm';
  const itemClassName = 'text-nowrap flex items-center';
  const labelClassName = 'w-[10em] text-md whitespace-pre-wrap';
  return (
    <div
      key={nft.tokenId}
      className="flex items-center content-center border border-gray-400 rounded-md p-4 bg-white  mx-2.5 mb-2.5 text-gray-600 "
    >
      <div>
        <div className="p-2 border bg-gray-200 border-gray-300 w-[150px] h-[150px] rounded-sm">
          <img
            src="https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg&w=400&fit=max"
            alt="nft cover"
            className="w-full h-full"
          />
        </div>

        <div className="h-6 mt-1.5 text-center text-red-400 ">
          {formatUnits(nft.price, 6)} OBT
        </div>
      </div>

      <div className="w-full px-2.5">
        {nft.isActive && (
          <Button onClick={() => buyNft(nft)} loading={loading}>
            Buy NFT
          </Button>
        )}
        <div title={nft.nftContract} className={itemClassName}>
          <span className={labelClassName}>nftContract: </span>
          <span className={cn(infoClassName, 'break-words')}>
            {nft.nftContract}
          </span>
        </div>

        <div className={itemClassName}>
          <span className={labelClassName}>sellerAddress：</span>
          <span className={infoClassName}>{nft.seller}</span>
        </div>

        <div className={itemClassName}>
          <span className={labelClassName}>tokenId: </span>
          <span className={infoClassName}>{formatUnits(nft.tokenId, 0)}</span>
        </div>

        <div className={itemClassName}>
          <span className={labelClassName}>status: </span>
          <span
            className={cn(
              infoClassName,
              nft.isActive ? 'color-[#ff3c00]' : 'color-[#999]',
            )}
          >
            {nft.isActive ? 'untraded' : 'traded'}
          </span>
        </div>
      </div>
    </div>
  );
};
const Content = () => {
  const result = useReadContract(getExchangeFuncVars('getNFTItems'));
  const nfts = (result.data || []) as INFTITem[];
  return (
    <div className="flex-1 p-4  flex flex-wrap min-h-[300px] bg-gray-100 border rounded-sm border-gray-400 mt-4  mx-4">
      {nfts.length === 0 ? (
        <div className="w-full text-center h-full my-auto  text-gray-400">
          Empty
        </div>
      ) : (
        nfts.map((item) => <Item key={item.tokenId} data={item} />)
      )}
    </div>
  );
};

export default Content;
