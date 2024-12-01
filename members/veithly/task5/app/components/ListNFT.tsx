'use client';
import React, { useState, ChangeEvent } from 'react';
import { useAccount } from 'wagmi';
import { parseUnits, ethers } from 'ethers';
import NFTMarketABI from '@/abis/NFTMarketABI';
import MyNFTABI from '@/abis/MyNFTABI';
import { Input, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react';
import { useEthersSigner } from '@/utils/useEthersSigner';
import { useNotification, NotificationType } from './Notification';
import NFTStore from '@/store/nftStore';
import nftStore from '@/store/nftStore';

interface ListNFTProps {
  className?: string;
}

const ListNFT: React.FC<ListNFTProps> = ({ className }) => {
  const { address, isConnected } = useAccount();
  const signer = useEthersSigner();
  const [nftContract, setNftContract] = useState('');
  const [tokenId, setTokenId] = useState('');
  const [price, setPrice] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<'approve' | 'list'>('approve');
  const { addNotification } = useNotification();

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    resetForm();
  };

  const handleNftContractChange = (e: ChangeEvent<HTMLInputElement>) => setNftContract(e.target.value);
  const handleTokenIdChange = (e: ChangeEvent<HTMLInputElement>) => setTokenId(e.target.value);
  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => setPrice(e.target.value);

  const resetForm = () => {
    setNftContract('');
    setTokenId('');
    setPrice('');
    setStep('approve');
  };

  const checkAndApproveNFT = async () => {
    if (!isConnected || !address || !signer) return;
    setIsLoading(true);
    try {
      const nftContractInstance = new ethers.Contract(nftContract, MyNFTABI, signer);
      const marketAddress = process.env.NEXT_PUBLIC_NFTMarket_CONTRACT_ADDRESS || '';

      const approvedAddress = await nftContractInstance.getApproved(tokenId);
      console.log("Approved address:", approvedAddress);

      if (approvedAddress.toLowerCase() !== marketAddress.toLowerCase()) {
        console.log("NFT not approved. Requesting approval...");
        const approveTx = await nftContractInstance.approve(marketAddress, tokenId);
        await approveTx.wait();
        console.log("NFT approved successfully");
      } else {
        console.log("NFT already approved");
      }
      setStep('list');
    } catch (error: any) {
      console.error("Error in approval process:", error);
      addNotification(NotificationType.ERROR, `Error in approval process: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const listNFT = async () => {
    if (!isConnected || !address || !signer) return;
    setIsLoading(true);
    try {
      const contract = new ethers.Contract(process.env.NEXT_PUBLIC_NFTMarket_CONTRACT_ADDRESS || '', NFTMarketABI, signer);
      const weiPrice = parseUnits(price, 'ether');
      const tx = await contract.listNFT(nftContract, tokenId, weiPrice);
      await tx.wait();
      console.log('NFT listed successfully');
      addNotification(NotificationType.SUCCESS, 'NFT listed successfully');
      nftStore.refetchNFTs();
      closeModal();
    } catch (error: any) {
      console.error('Error listing NFT:', error);
      addNotification(NotificationType.ERROR, `Error listing NFT: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button className={className} onPress={openModal}>List NFT</Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) resetForm();
        }}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">List Your NFT</ModalHeader>
          <ModalBody>
            <Input
              label="NFT Contract"
              placeholder="Enter NFT contract address"
              value={nftContract}
              onChange={handleNftContractChange}
            />
            <Input
              label="Token ID"
              placeholder="Enter token ID"
              value={tokenId}
              onChange={handleTokenIdChange}
            />
            <Input
              label="Price in MTK"
              placeholder="Enter price in MTK"
              value={price}
              onChange={handlePriceChange}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={closeModal}>
              Cancel
            </Button>
            {step === 'approve' ? (
              <Button color="primary" onPress={checkAndApproveNFT} isLoading={isLoading}>
                Approve NFT
              </Button>
            ) : (
              <Button color="primary" onPress={listNFT} isLoading={isLoading}>
                List NFT
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ListNFT;
