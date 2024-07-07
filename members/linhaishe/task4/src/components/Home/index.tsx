import React, { useState } from 'react';
import ItemCard from '../ItemCard';
import { BigNumber } from 'ethers';
import Loading from '../Loading';
import { hexToDecimal } from '../../utils';

import './index.scss';

export default function Home({
  userNftLists,
  marketNftLists,
  nft,
  marketplace,
  erc20Contract,
  address,
}: any) {
  const [isLoading, setIsLoading] = useState(false);

  const onBuy = async (nftId, price) => {
    try {
      setIsLoading(true);
      const allowance = await erc20Contract.allowance(
        address,
        marketplace.address
      );
      const balance = await erc20Contract.balanceOf(address);

      if (BigNumber.from(allowance._hex).toString() < price) {
        const approve = await erc20Contract.approve(marketplace.address, price);
        await approve.wait();
      }

      if (BigNumber.from(balance._hex).toString() < price) {
        alert('钱不够哈');
        return;
      }
      const itemInfo = await marketplace.getMarketItemByTokenId(
        hexToDecimal(nftId)
      );
      const buyTransaction = await marketplace.buyItem(itemInfo?.itemId, price);
      await buyTransaction.wait();
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
      location.reload();
    }
  };

  return (
    <>
      {marketNftLists?.length > 0 ? (
        <div className='item-list-wrap'>
          {marketNftLists?.map((v, i) => (
            <div key={i}>
              <ItemCard
                item={v}
                buttonText={
                  v.seller === address && v.isUpForSale ? 'unList' : 'Buy'
                }
                actionFunc={() => {
                  onBuy(v?.id?.tokenId, v?.metadata?.price);
                }}
                personTitle={'Seller'}
                ownerAddress={v.seller}
                isSell={v.seller === address && v.isUpForSale}
              />
            </div>
          ))}
        </div>
      ) : (
        <div>nothing here ...</div>
      )}
      <Loading isLoading={isLoading} />
    </>
  );
}
