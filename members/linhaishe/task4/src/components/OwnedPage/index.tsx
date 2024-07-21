import React, { useState } from 'react';
import ItemCard from '../ItemCard';
import ListToast from '../ListToast';
import { BigNumber, ethers } from 'ethers';
import { getContractAbi } from '../../utils';

import './index.scss';

export default function OwnedPage({
  marketplace,
  setIsLoading,
  address,
  marketNftLists,
  erc20Contract,
}: any) {
  const [isShow, setIsShow] = useState(false);
  const [currentItem, setCurrentItem] = useState<any>({});
  const [itemId, setItemId] = useState<any>({});
  const ownedItems =
    marketNftLists?.filter(
      (item) => item?.seller?.toLowerCase() === address?.toLowerCase()
    ) || [];
  console.log('ownedItems', ownedItems);

  const onList = async (listingPrice) => {
    try {
      setIsLoading(true);

      const contractAbi = await getContractAbi(currentItem.nftContract);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const nftContract = new ethers.Contract(
        currentItem.nftContract,
        contractAbi,
        signer
      );

      const isApprovalForAll = await nftContract?.isApprovedForAll(
        address,
        marketplace.address
      );

      const allowance = await erc20Contract?.allowance(
        address,
        marketplace.address
      );

      if (!isApprovalForAll) {
        // set approval for all to market through nft contract
        const approvalTransaction = await nftContract?.setApprovalForAll(
          marketplace.address,
          true
        );
        await approvalTransaction.wait();
      }

      if (BigNumber.from(allowance).lt(BigNumber.from(listingPrice))) {
        const approve = await erc20Contract.approve(
          marketplace.address,
          listingPrice
        );

        await approve.wait();
      }

      if (currentItem.isSold) {
        const reList = await marketplace.relistAfterBuy(itemId, listingPrice);
        await reList.wait();
        return;
      }

      const createSale = await marketplace.createSale(
        currentItem.itemId,
        true,
        listingPrice
      );
      await createSale.wait();
    } catch (error) {
      console.log('error', error);
    } finally {
      location.reload();
      setIsLoading(false);
    }
  };

  const onUnlist = async () => {
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

  const onClick = (itemInfo) => {
    setCurrentItem(itemInfo);
    setIsShow(true);
    setItemId(itemInfo?.itemId);
  };

  return (
    <>
      {ownedItems?.length > 0 ? (
        <div className='item-list-wrap'>
          {ownedItems?.map((v, i) => {
            return (
              <div key={i}>
                <ItemCard
                  item={v}
                  actionFunc={onClick}
                  buttonText={v.isUpForSale ? 'unList' : 'List'}
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
      <ListToast
        isShow={isShow}
        setIsShow={setIsShow}
        onConfirm={currentItem?.isUpForSale ? onUnlist : onList}
        isUpForSale={currentItem?.isUpForSale}
      />
    </>
  );
}
