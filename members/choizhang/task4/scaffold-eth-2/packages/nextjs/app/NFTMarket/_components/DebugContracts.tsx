"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useScaffoldWriteContract, useScaffoldReadContract } from "~~/hooks/scaffold-eth";

// 假设你的 NFT 列表组件和 ListItem 组件已经创建
import NFTList from "~~/app/NFTMarket/_components/components/NFTList";


export default function DebugContracts() {
  const [isOpen, setIsOpen] = useState(false);
  // const { account } = useAccount();
  // const { sendTransaction } = useSendTransaction({
  //   onSuccess,
  // });

  // 处理模态框的显示和隐藏
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

    const [contractAddress, setContractAddress] = useState('');
  const [tokenId, setTokenId] = useState('');
  const [price, setPrice] = useState('');

  // 处理上架逻辑
  const handleListItemClick = async () => {
    // 这里应该是调用你的智能合约的逻辑
    try {
      await writeYourContractAsync({
        functionName: "listItem",
        args: [contractAddress, BigInt(tokenId), BigInt(price)],
      });
      closeModal();
    } catch (e) {
      console.error("Error setting greeting:", e);
    }
  };

  interface NFTItem {
    tokenID: string;
    name: string;
    contractAddress: string;
    owerner: string;
    imageURL: string;
    price: string;
}
  // 购买 NFT 的逻辑
  const purchaseItem = async (nft: NFTItem) => {
    // 这里应该是调用你的智能合约的购买逻辑
    // console.log('nft', nft)
    try {
      await writeYourContractAsync({
        functionName: "purchaseItem",
        args: [nft.nft, BigInt(nft.tokenId)],
      });
    } catch (e) {
      console.error("Error setting greeting:", e);
    }
  };

  // 下架 NFT 的逻辑
const delistItem = async (nft: NFTItem) => {
  console.log('nft11', nft)
  try {
    await writeYourContractAsync({
      functionName: "delistItem",
      args: [nft.nft, BigInt(nft.tokenId)],
    });
  } catch (e) {
    console.error("Error setting delistItem:", e);
  }
};

  // const { data: totalCounter } = useScaffoldReadContract({
  //   contractName: "NFTMarketplace",
  //   functionName: "listings",
  //   args: ["0x0B306BF915C4d645ff596e518fAf3F9669b97016", 1n],
  // });
  // console.log('totalCounter', totalCounter)

  const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract("NFTMarketplace");

  return (
    <div className="container mx-auto p-4">
      <button className="bg-blue-500 text-white p-2 mb-3" onClick={openModal}>
        上架
      </button>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
            <DialogTitle className="font-bold">上架NFT</DialogTitle>
            
            <div className=" px-4 py-6 sm:px-6 sm:py-4">
            <form>
              <div className="mb-4">
                <label htmlFor="contractAddress">合约地址</label>
                <input
                  type="text"
                  name="contractAddress"
                  value={contractAddress}
                  onChange={(e) => setContractAddress(e.target.value)}
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
                  onChange={(e) => setTokenId(e.target.value)}
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
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-lg p-2.5 mb-2"
                />
              </div>
            </form>
            </div>
            <div className="flex gap-4 justify-center">
              <button onClick={() => handleListItemClick()}>确定</button>
              <button onClick={() => setIsOpen(false)}>取消</button>
            </div>

          </DialogPanel>
        </div>
      </Dialog>
      {/* 渲染 NFT 列表 */}
      <NFTList purchaseItem={purchaseItem} delistItem={delistItem} />
    </div>
  );
}

// 定义 onSuccess 函数，处理交易成功的逻辑
function onSuccess(/* 参数 */) {
  // 交易成功的处理
}