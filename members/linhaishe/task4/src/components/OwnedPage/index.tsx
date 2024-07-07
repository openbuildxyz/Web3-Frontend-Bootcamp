import React, { useState } from 'react';
import ItemCard from '../ItemCard';
import { BigNumber } from 'ethers';
import ListToast from '../ListToast';
import { hexToDecimal } from '../../utils';

import './index.scss';

export default function OwnedPage({
  userNftLists,
  nft,
  marketplace,
  erc20Contract,
  setIsLoading,
  address,
}: any) {
  const [isShow, setIsShow] = useState(false);
  const [currentTokenId, setCurrentTokenId] = useState<string | null>(null);

  const listingNFT = async (listingPrice) => {
    try {
      setIsLoading(true);

      const isApprovalForAll = await nft.isApprovedForAll(
        address,
        marketplace.address
      );

      if (!isApprovalForAll) {
        // set approval for all to market through nft contract
        const approvalTransaction = await nft.setApprovalForAll(
          marketplace.address,
          true
        );
        await approvalTransaction.wait();
      }

      const allowance = await erc20Contract.allowance(
        address,
        marketplace.address
      );

      if (BigNumber.from(allowance._hex).toString() < listingPrice) {
        const approve = await erc20Contract.approve(
          marketplace.address,
          listingPrice
        );

        await approve.wait();
      }

      let itemInfo;
      // 检查市场里是否已经有这个NFT, 如果没创建的话是不窜爱 iteminfo的，这样就拿不到itemId
      itemInfo = await marketplace.getMarketItemByTokenId(currentTokenId);

      if (!itemInfo?.isExist) {
        const addItemToMarket = await marketplace.addItemToMarket(
          currentTokenId,
          listingPrice
        );
        await addItemToMarket.wait();
        itemInfo = await marketplace.getMarketItemByTokenId(currentTokenId);
      }

      const createSale = await marketplace.createSale(
        itemInfo?.itemId,
        true,
        listingPrice
      );
      await createSale.wait();
    } catch (error) {
      alert(error);
    } finally {
      location.reload();
    }
  };

  return (
    <>
      {userNftLists?.length > 0 ? (
        <div className='item-list-wrap'>
          {userNftLists?.map((v, i) => {
            if (v?.contract?.address !== nft.address.toLowerCase()) {
              return null;
            }

            return (
              <div key={i}>
                <ItemCard
                  item={v}
                  actionFunc={() => {
                    setIsShow(true);
                    setCurrentTokenId(hexToDecimal(v?.id?.tokenId));
                  }}
                  buttonText={'Sell'}
                  ownerAddress={address}
                  personTitle={'Owner'}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div>nothing here ...</div>
      )}
      <ListToast isShow={isShow} setIsShow={setIsShow} onConfirm={listingNFT} />
    </>
  );
}
