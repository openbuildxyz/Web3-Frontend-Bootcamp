"use client";

import { useState } from 'react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { NFTMarket as marketABI, MyNFT as nftABI } from '@/lib/abi';
import { ethers } from 'ethers';

interface BuyNFTProps {
  marketContractAddress: `0x${string}`;
  nftContractAddress: `0x${string}`;
  reset: () => void;
}

export default function ListNFT({ marketContractAddress, nftContractAddress, reset }: BuyNFTProps) {
  const [tokenId, setTokenId] = useState('');
  const [priceInMTK, setPriceInMTK] = useState('');

  const {
    data: approveHash,
    error: approveError,
    isPending: isApprovePending,
    writeContract: approveToken,
  } = useWriteContract();

  const {
    data: buyHash,
    error: listError,
    isPending: isListPending,
    writeContract: listNFT,
  } = useWriteContract();

  const { isLoading: isApproveConfirming, isSuccess: isApproveConfirmed } =
    useWaitForTransactionReceipt({ hash: approveHash });

  const { isLoading: isListConfirming, isSuccess: isListConfirmed } =
    useWaitForTransactionReceipt({ hash: buyHash });

  const handleListNFT = async () => {
    if(!tokenId || !priceInMTK) return;

    if (isApproveConfirmed) {
        const priceInWei = ethers.parseUnits(priceInMTK, 'ether');
        listNFT({
            address: marketContractAddress,
            abi: marketABI,
            functionName: 'listNFT',
            args: [BigInt(tokenId), BigInt(priceInWei)],
        });
    } else if (!isApproveConfirmed) {
        approveToken({
            address: nftContractAddress,
            abi: nftABI,
            functionName: 'approve',
            args: [marketContractAddress, BigInt(tokenId)],
        });
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-lg">
      <h2 className="text-xl mb-4">List NFT</h2>
      <input
        type="text"
        placeholder="Token ID"
        value={tokenId}
        onChange={(e) => setTokenId(e.target.value)}
        className="input"
      />
      <input
        type="number"
        placeholder="Price in MTK"
        value={priceInMTK}
        onChange={(e) => setPriceInMTK(e.target.value)}
        className="input"
      />
      {!isListConfirmed && (<button onClick={handleListNFT} className="btn mr-2 mb-2 disabled:grayscale" disabled={!tokenId || !priceInMTK || isApprovePending || isListPending || isApproveConfirming || isListConfirming}>
        {isApprovePending || isListPending ? 'Processing...' : isApproveConfirming || isListConfirming ? 'Confirming...' : isApproveConfirmed ? 'List NFT' : 'Approve NTF'}
      </button>)}
      <button onClick={reset} className="btn mb-2 disabled:grayscale" disabled={!isApprovePending && !isApproveConfirming && !isApproveConfirmed && !approveError}>Reset</button>

      {approveHash && isApproveConfirmed && <div>Approval Transaction Hash: {approveHash}</div>}
      {isApproveConfirming && <div>Waiting for approval confirmation...</div>}
      {buyHash && isListConfirmed && <div>List Transaction Hash: {buyHash}</div>}
      {isListConfirming && <div>Waiting for list confirmation...</div>}
      {approveError && <div>Error: {approveError.message}</div>}
      {listError && <div>Error: {listError.message}</div>}
    </div>
  );
}
