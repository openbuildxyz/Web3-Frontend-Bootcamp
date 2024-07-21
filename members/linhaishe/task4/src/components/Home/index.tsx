import React, { useState } from 'react';
import ItemCard from '../ItemCard';
import { BigNumber } from 'ethers';
import Loading from '../Loading';

import './index.scss';

export default function Home({
  marketNftLists,
  marketplace,
  erc20Contract,
  address,
}: any) {
  const [isLoading, setIsLoading] = useState(false);
  console.log('marketNftLists', marketNftLists);

  const onBuy = async (itemId, listingPrice) => {
    try {
      setIsLoading(true);
      const allowance = await erc20Contract.allowance(
        address,
        marketplace.address
      );
      const balance = await erc20Contract.balanceOf(address);

      if (BigNumber.from(allowance).lt(BigNumber.from(listingPrice))) {
        const approve = await erc20Contract.approve(
          marketplace.address,
          listingPrice
        );
        await approve.wait();
      }

      if (BigNumber.from(balance).lt(BigNumber.from(listingPrice))) {
        alert('Not enough balance');
        return;
      }

      const buyTransaction = await marketplace.buyItem(itemId);
      await buyTransaction.wait();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      location.reload();
    }
  };

  const onUnlist = async (itemId) => {
    try {
      setIsLoading(true);
      const unlistTransaction = await marketplace.unlistNFT(itemId);
      await unlistTransaction.wait();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      location.reload();
    }
  };

  return (
    <>
      {marketNftLists?.filter((item, index) => item?.isUpForSale)?.length >
      0 ? (
        <div className='item-list-wrap'>
          {marketNftLists?.map((v, i) => {
            const isSell = v.seller === address && v.isUpForSale;

            return (
              <>
                {v.isUpForSale && (
                  <div key={i}>
                    <ItemCard
                      item={v}
                      buttonText={isSell ? 'unList' : 'Buy'}
                      actionFunc={() => {
                        isSell ? onUnlist(v.itemId) : onBuy(v.itemId, v.price);
                      }}
                      personTitle={'Seller'}
                      ownerAddress={v.seller}
                    />
                  </div>
                )}
              </>
            );
          })}
        </div>
      ) : (
        <div>nothing here ...</div>
      )}
      <Loading isLoading={isLoading} />
    </>
  );
}
