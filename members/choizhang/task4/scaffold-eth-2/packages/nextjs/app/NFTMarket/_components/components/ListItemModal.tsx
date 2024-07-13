// ListItemModal.tsx
// import React, { useState } from 'react';
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'

interface ListItemModalProps {
  isOpen: boolean;
  closeModal: () => void;
  onConfirm: (contractAddress: string, tokenId: string, price: string) => void;
}

const [isOpen, setIsOpen] = useState(false);

const ListItemModal: React.FC<ListItemModalProps> = ({ isOpen, closeModal, onConfirm }) => {
//   const [contractAddress, setContractAddress] = useState('');
//   const [tokenId, setTokenId] = useState('');
//   const [price, setPrice] = useState('');

  const handleSubmit = () => {
    onConfirm(contractAddress, tokenId, price);
    closeModal();
  };

  return (
    <div>
        <div className=" px-4 py-6 sm:px-6 sm:py-4">
            <form>
              <div className="mb-4">
                <label htmlFor="contractAddress">合约地址</label>
                <input
                  type="text"
                  name="contractAddress"
                  value={contractAddress}
                  // onChange={(e) => setContractAddress(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-lg p-2.5 mb-2"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="tokenId">Token ID</label>
                <input
                  type="text"
                  name="tokenId"
                  value={tokenId}
                  // onChange={(e) => setTokenId(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-lg p-2.5 mb-2"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="price">价格</label>
                <input
                  type="text"
                  name="price"
                  value={price}
                  // onChange={(e) => setPrice(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-lg p-2.5 mb-2"
                />
              </div>
            </form>
            </div>
            <div className="flex gap-4">
              <button onClick={() => setIsOpen(false)}>Cancel</button>
              <button onClick={() => handleSubmit()}>确定</button>
            </div>
    </div>
  );
};

export default ListItemModal;