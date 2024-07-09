import React from 'react';
import './index.scss';
import {
  hexToDecimal,
  timestampToLocalTime,
  convertHexToDecimal,
} from '../../utils';

function ItemCard({ item, actionFunc, buttonText, ownerAddress, personTitle }) {
  const tokenId = hexToDecimal(item?.id?.tokenId || item?.tokenId?._hex || 0);
  const listingTime = convertHexToDecimal({
    _hex: item?.listingTimestamp?._hex,
  });

  return (
    <div className='item-wrap'>
      <img
        src={
          item?.metadata?.image ||
          'https://images.freeimages.com/image/previews/477/sweet-flat-candy-png-5690113.png'
        }
        className='nft-img'
      />
      <div className='user-info-wraps'>
        <img
          src='https://cdn-icons-png.flaticon.com/512/9693/9693244.png'
          className='avatar-img'
        />
        <div className='user-account-wrap-item-card'>
          <div className='user-names'>{personTitle}</div>
          <div className='user-ids'>{ownerAddress}</div>
        </div>
      </div>
      <div className='item-card-nft-info'>
        <div className='item-card-nft-info-title'>{item?.metadata?.name}</div>
        <div className='item-card-nft-info-desc'>
          {item?.metadata?.description}
        </div>
      </div>
      <div className='item-card-price-info-wrap'>
        <div className='item-card-price-info'>
          <div className='item-card-price-info-price'>
            {item?.metadata?.price || 0}
          </div>
          <div className='item-card-price-info-title'>Price</div>
        </div>
        <div className='item-card-price-info'>
          <div className='item-card-price-info-price'>{tokenId}</div>
          <div className='item-card-price-info-title'>tokenId</div>
        </div>
        <div className='action-btn' onClick={actionFunc}>
          {buttonText}
        </div>
      </div>
      {item?.metadata?.createTime && (
        <div className='item-card-create-time'>
          Create: {timestampToLocalTime(item?.metadata?.createTime)}
        </div>
      )}
      {item?.listingTimestamp && (
        <div className='item-card-create-time'>
          Listing: {timestampToLocalTime(listingTime * 1000)}
        </div>
      )}
    </div>
  );
}

export default ItemCard;
