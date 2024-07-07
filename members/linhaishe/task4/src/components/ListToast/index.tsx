import React, { useState } from 'react';
import './index.scss';

function ListToast({ isShow, setIsShow, onConfirm }) {
  const [price, setPrice] = useState<any>(null);
  return (
    <>
      {isShow && (
        <div className='toast-wrap'>
          <div className='toast-form-wrap'>
            <div className='toast-form-title'>List NFT for Sale</div>
            <div className='toast-form-desc'>
              This will list NFT for sale, you can cancel anytime.
            </div>
            <div className='toast-form-input-wrap'>
              <input
                type='number'
                placeholder='price (erc20)'
                className='toast-form-input'
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
              <div
                className='toast-form-input-btn'
                onClick={() => onConfirm(price)}
              >
                CONFIRM
              </div>
            </div>
            <span
              className='toast-form-close'
              onClick={() => {
                setIsShow(false);
                setPrice(null);
              }}
            >
              x
            </span>
          </div>
        </div>
      )}
    </>
  );
}

export default ListToast;
