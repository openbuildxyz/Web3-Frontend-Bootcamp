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

      if (Number(BigNumber.from(allowance._hex).toString()) < Number(price)) {
        const approve = await erc20Contract.approve(marketplace.address, price);
        await approve.wait();
      }

      if (Number(BigNumber.from(balance._hex).toString()) < Number(price)) {
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

  const onUnlist = async (itemId) => {
    try {
      setIsLoading(true);
      const unlistTransaction = await marketplace.unlistNFT(
        Number(BigNumber.from(itemId._hex).toString())
      );
      await unlistTransaction.wait();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      location.reload();
    }
  };

  console.log('item444', marketNftLists);

  return (
    <>
      {marketNftLists?.filter(
        (item, index) => !item?.isSold && item?.isUpForSale
      )?.length > 0 ? (
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
                        isSell
                          ? onUnlist(v.itemId)
                          : onBuy(v?.id?.tokenId, v?.metadata?.price);
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
