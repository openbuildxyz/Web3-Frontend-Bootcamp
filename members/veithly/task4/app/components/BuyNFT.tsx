'use client';
import React, { useState } from 'react';
import { ethers } from 'ethers';
import NFTMarketABI from '@/abis/NFTMarketABI';
import ERC20ABI from '@/abis/ERC20ABI';
import { Button } from '@nextui-org/react';
import { useEthersSigner } from '@/utils/useEthersSigner';
import type { NFT } from '@/types/NFT';
import { useNotification, NotificationType } from './Notification';

interface BuyNFTProps {
  listingId: string;
  nft: NFT;
  onPurchaseComplete: () => void;
}

const BuyNFT: React.FC<BuyNFTProps> = ({ listingId, nft, onPurchaseComplete }) => {
  const [isLoading, setIsLoading] = useState(false);
  const signer = useEthersSigner();
  const { addNotification } = useNotification();

  const buyNFT = async () => {
    if (!signer) {
      console.error("Signer not available");
      return;
    }

    setIsLoading(true);

    try {
      const nftMarketAddress = process.env.NEXT_PUBLIC_NFTMarket_CONTRACT_ADDRESS || '';
      const nftMarketContract = new ethers.Contract(nftMarketAddress, NFTMarketABI, signer);

      // Get payment token address
      const paymentTokenAddress = await nftMarketContract.currencyToken();
      const tokenContract = new ethers.Contract(paymentTokenAddress, ERC20ABI, signer);

      const userAddress = await signer.getAddress();

      // Check allowance
      const allowance = await tokenContract.allowance(userAddress, nftMarketAddress);

      // If allowance is insufficient, request approval
      if (allowance < nft.price) {
        console.log("Insufficient allowance. Requesting approval...");
        const approvalTx = await tokenContract.approve(nftMarketAddress, ethers.MaxUint256);
        await approvalTx.wait();
        console.log("Approval successful");
      }

      // Buy NFT
      console.log("Buying NFT...", listingId);
      const buyTx = await nftMarketContract.buyNFT(listingId);
      await buyTx.wait();
      console.log("NFT purchased successfully!");
      addNotification(NotificationType.SUCCESS, "NFT purchased successfully!");
      onPurchaseComplete();
    } catch (error: any) {
      console.error("Error in buyNFT process:", error);
      addNotification(NotificationType.ERROR, "Error in buyNFT process: " + error.info.error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={buyNFT}
      disabled={isLoading}
    >
      {isLoading ? "Processing..." : "Buy NFT"}
    </Button>
  );
};

export default BuyNFT;
