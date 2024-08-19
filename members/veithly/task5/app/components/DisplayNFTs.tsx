'use client';
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useAccount } from 'wagmi';
import { useEthersSigner } from '@/utils/useEthersSigner';
import NFTMarketABI from '@/abis/NFTMarketABI';
import { Card, Button, Modal, ModalContent, ModalHeader, ModalBody, Image, Skeleton } from '@nextui-org/react';
import BuyNFT from './BuyNFT';
import type { NFT, NFTMetadata, DisplayNFTsProps } from '@/types/NFT';
import { formatDate } from '@/utils/formatDate';
import NFTStore from '@/store/nftStore';
import { observer } from 'mobx-react';

const DisplayNFTs: React.FC = observer(({}) => {
  const [nfts, setNfts] = useState<DisplayNFTsProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);
  const [nftMetadata, setNftMetadata] = useState<NFTMetadata | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDelisting, setIsDelisting] = useState(false);
  const { address } = useAccount();
  const signer = useEthersSigner();

  const fetchNFTs = async () => {
    setLoading(true);
    try {
      const provider = new ethers.AlchemyProvider(
        process.env.NEXT_PUBLIC_NETWORK,
        process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
      );
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_NFTMarket_CONTRACT_ADDRESS || '',
        NFTMarketABI,
        provider
      );
      const listings = await contract.getAllListings();
      console.log("Listings:", listings);

      const formattedNFTs = await Promise.all(listings.map(async (listing: any) => {
        const metadata = await fetchNFTMetadata(listing.url);
        return {
          id: listing.id.toString(),
          seller: listing.seller,
          nftContract: listing.nftContract,
          tokenId: listing.tokenId.toString(),
          price: listing.price.toString(),
          url: listing.url,
          listingTime: listing.listingTime,
          name: metadata?.name || 'Unnamed NFT',
          image: metadata?.image || ''
        };
      }));
      setNfts(formattedNFTs);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const fetchNFTMetadata = async (url: string): Promise<NFTMetadata | null> => {
    try {
      const proxyUrl = '/api/proxy?url=';
      const response = await fetch(proxyUrl + url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching NFT metadata:", error);
      return null;
    }
  };

  useEffect(() => {
    fetchNFTs();
  }, []);

  const { dataNeededToRefresh, fetchDataIfNeeded } = NFTStore;

  useEffect(() => {
    console.log("Data needed to refresh:", dataNeededToRefresh);

    if (dataNeededToRefresh) {
      fetchNFTs();
      fetchDataIfNeeded();
    }
  }, [dataNeededToRefresh, fetchDataIfNeeded]);

  const handlePurchaseComplete = () => {
    fetchNFTs();
  };

  const handleDelist = async (nftId: number) => {
    if (!signer) {
      return;
    }

    setIsDelisting(true);
    try {
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_NFTMarket_CONTRACT_ADDRESS || '',
        NFTMarketABI,
        signer
      );

      const tx = await contract.delistNFT(nftId);
      await tx.wait();

      // toast.success("NFT successfully delisted");
      await fetchNFTs(); // Refresh the NFT list
    } catch (error) {
      console.error("Error delisting NFT:", error);
      // toast.error("Failed to delist NFT. Please try again.");
    } finally {
      setIsDelisting(false);
    }
  };

  const openDetailsModal = async (nft: NFT) => {
    console.log("Opening details modal for NFT:", nft);

    setSelectedNFT(nft);
    const metadata = await fetchNFTMetadata(nft.url);
    setNftMetadata(metadata);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {[...Array(6)].map((_, index) => (
          <Card key={index} className="p-4 space-y-2">
            <Skeleton className="rounded-lg">
              <div className="h-40 rounded-lg bg-default-300"></div>
            </Skeleton>
            <Skeleton className="w-3/5 rounded-lg">
              <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-4/5 rounded-lg">
              <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-2/5 rounded-lg">
              <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
            </Skeleton>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {nfts.map((nft: DisplayNFTsProps) => (
          <Card key={nft.id} className="p-4">
            <Image
              src={nft.image}
              alt={nft.name}
              className="w-full h-40 object-cover rounded-lg mb-2"
            />
            <h3 className="text-lg font-semibold">{nft.name}</h3>
            <h3 className="text-lg font-semibold">#{nft.tokenId}</h3>
            <p className="text-sm font-medium">
              Price: {ethers.formatUnits(nft.price, 'ether')} MTK
            </p>
            <div className="mt-2 space-x-2">
              <Button size="sm" onPress={() => openDetailsModal(nft)}>
                Details
              </Button>
              {address === nft.seller ? (
                <Button size="sm" color="danger" onPress={() => handleDelist(nft.id)} isLoading={isDelisting}>
                  Delist
                </Button>
              ) : (
                <BuyNFT
                  listingId={nft.id}
                  nft={nft}
                  onPurchaseComplete={handlePurchaseComplete}
                />
              )}
            </div>
          </Card>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} size="3xl">
        <ModalContent>
        <ModalHeader>NFT Details</ModalHeader>
        <ModalBody>

          {selectedNFT && nftMetadata && (
            <div className="p-4 flex items-center">
              <div className="w-1/2 pr-4">
                <Image
                  src={nftMetadata.image}
                  alt={nftMetadata.name}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <h2 className="text-2xl font-bold mb-2">{nftMetadata.name}</h2>
                <p className="text-gray-600 mt-2">{nftMetadata.description}</p>
              </div>
              <div className="w-1/2 pl-4 space-y-2 mr-4">
                <h2>#{selectedNFT.tokenId}</h2>
                <p><strong>Contract:</strong> {selectedNFT.nftContract}</p>
                <p><strong>Seller:</strong> {selectedNFT.seller}</p>
                <p><strong>Price:</strong> {ethers.formatUnits(selectedNFT.price, 'ether')} MTK</p>
                <p><strong>Listing Time:</strong> {formatDate(selectedNFT.listingTime)}</p>
              </div>
            </div>
          )}
                  </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
});

export default DisplayNFTs;
