"use client";

import { useState } from 'react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { NFTMarket as marketABI, MyToken as tokenABI } from '@/lib/abi';
import { ethers } from 'ethers';

interface BuyNFTProps {
  marketContractAddress: `0x${string}`;
  tokenContractAddress: `0x${string}`;
  reset: () => void;
}

export default function BuyNFT({ marketContractAddress, tokenContractAddress, reset }: BuyNFTProps) {
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
    error: buyError,
    isPending: isBuyPending,
    writeContract: buyNFT,
  } = useWriteContract();

  const { isLoading: isApproveConfirming, isSuccess: isApproveConfirmed } =
    useWaitForTransactionReceipt({ hash: approveHash });

  const { isLoading: isBuyConfirming, isSuccess: isBuyConfirmed } =
    useWaitForTransactionReceipt({ hash: buyHash });

  const handleBuyNFT = async () => {
    if(!tokenId || !priceInMTK) return;

    if (isApproveConfirmed) {
        buyNFT({
            address: marketContractAddress,
            abi: marketABI,
            functionName: 'buyNFT',
            args: [BigInt(tokenId)],
        });
    } else if (!isBuyConfirmed) {
        const priceInWei = ethers.parseUnits(priceInMTK, 'ether');
        approveToken({
            address: tokenContractAddress,
            abi: tokenABI,
            functionName: 'approve',
            args: [marketContractAddress, BigInt(priceInWei)],
        });
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-lg">
      <h2 className="text-xl mb-4">Buy NFT</h2>
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
      {!isBuyConfirmed && (<button onClick={handleBuyNFT} className="btn mr-2 mb-2 disabled:grayscale" disabled={!tokenId || !priceInMTK || isApprovePending || isBuyPending || isApproveConfirming || isBuyConfirming}>
        {isApprovePending || isBuyPending ? 'Processing...' : isApproveConfirming || isBuyConfirming ? 'Confirming...' : isApproveConfirmed ? 'Buy NFT' : 'Approve MTK'}
      </button>)}
      <button onClick={reset} className="btn mb-2 disabled:grayscale" disabled={!isApprovePending && !isApproveConfirming && !isApproveConfirmed && !approveError}>Reset</button>

      {approveHash && isApproveConfirmed && <div>Approval Transaction Hash: {approveHash}</div>}
      {isApproveConfirming && <div>Waiting for approval confirmation...</div>}
      {buyHash && isBuyConfirmed && <div>Buy Transaction Hash: {buyHash}</div>}
      {isBuyConfirming && <div>Waiting for buy confirmation...</div>}
      {approveError && <div>Error: {approveError.message}</div>}
      {buyError && <div>Error: {buyError.message}</div>}
    </div>
  );
}
