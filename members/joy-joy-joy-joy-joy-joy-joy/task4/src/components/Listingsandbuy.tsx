import React, { useState, useEffect } from 'react';
import './Listingsandbuy.css';
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';
import { abi } from '../abi';
import { abi1 } from '../abi1';
import { config } from '../wagmi';
import { http, createPublicClient } from 'viem';
import { sepolia } from 'viem/chains';

interface Listing {
  seller: string;
  nftAddr: string;
  tokenId: string;
  price: string;
}

interface setListings {
  listings: Listing[];
  setListings: React.Dispatch<React.SetStateAction<Listing[]>>; // 父组件传递的函数类型
}

const client = createPublicClient({
  chain: sepolia,
  transport: http(),
});

async function fetchBaseURI(nftAddr: any) {
  try {
    const baseURI = await client.readContract({
      address: nftAddr,
      abi: abi,
      functionName: 'baseURI',
    });
    return baseURI;
  } catch (error) {
    console.error('Error fetching base URI:', error);
    return null;
  }
}

export function List({ listings, setListings }) {
  const isConnected= useAccount();
  const [uris, setUris] = useState({});
  const [PurchaseHash, setPurchaseHash] = useState(null);
  const [approval1Hash, setApproval1Hash] = useState('');
  const [RevokeHash, setRevokeHash] = useState('');
  const [currentListing, setCurrentListing] = useState<Listing>(); // 临时全局变量存储当前listing
  const pollingInterval = 3000;

  const { error: approval1Error, writeContractAsync: writeApprovalContract } =
    useWriteContract({ config });

  const { error: purchaseError, writeContractAsync: writePurchaseContract } =
    useWriteContract({ config });

  const { error: RevokeError, writeContractAsync: writeRevokeContract } =
    useWriteContract({ config });

  useEffect(() => {
    const fetchAllURIs = async () => {
      const uris = {};
      for (const listing of listings) {
        const baseURI = await fetchBaseURI(listing.nftAddr);
        uris[listing.nftAddr] = baseURI
          ? baseURI.replace(/^ipfs:\/\//, '')
          : null;
      }
      setUris(uris);
    };

    fetchAllURIs();
  }, [listings]);

  const { isLoading: isPurchaseConfirming, status: isPurchaseConfirmed } =
    useWaitForTransactionReceipt({
      hash: PurchaseHash,
    });

  const { isLoading: isApproval1Confirming, status: isApproval1Confirmed } =
    useWaitForTransactionReceipt({
      hash: approval1Hash,
    });

  const { isLoading: isRevokeConfirming, status: isRevokeConfirmed } =
    useWaitForTransactionReceipt({
      hash: RevokeHash,
    });

  const handleApproval1Success = (data: { hash: string }) => {
    setApproval1Hash(data.hash);
    console.log(data.hash);
  };

  const handleRevokeSuccess = (data: { hash: string }) => {
    setRevokeHash(data.hash);
    console.log(data.hash);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log(isApproval1Confirmed);
      if (isApproval1Confirmed === 'success') {
        // 在status为success时执行后续逻辑
        console.log('Approve Transaction is confirmed!');
        handlePurchaseTransaction(currentListing);
        clearInterval(intervalId); // 停止轮询
      }
    }, pollingInterval);

    // 清除定时器
    return () => clearInterval(intervalId);
  }, [isApproval1Confirmed, pollingInterval]); // 依赖isApprovalConfirmed和pollingInterval

  const handlePurchase = async (listing) => {
    setCurrentListing(listing); // 将当前listing存储到临时全局变量中
    const priceBigInt = BigInt(listing.price);
    const feeBigInt = priceBigInt / BigInt(20); // 假设fee是价格的10%
    const totalBigInt = priceBigInt + feeBigInt;
    console.log({
      abi1,
      address: '0xdc9Edf711C0cc1FC45878d142157437E3257e4DD',
      functionName: 'approve',
      args: ['0xe43ff92d19a030c5181444897e7a825458d2b389', totalBigInt],
    });
    try {
      const approval1Tx = await writeApprovalContract({
        abi: abi1,
        address: '0xdc9Edf711C0cc1FC45878d142157437E3257e4DD',
        functionName: 'approve',
        args: ['0xe43ff92d19a030c5181444897e7a825458d2b389', totalBigInt],
        onSuccess: handleApproval1Success,
      });
      console.log(approval1Tx);
      if (approval1Tx) {
        setApproval1Hash(approval1Tx);
      } else {
        console.error('Approve transaction failed: No transaction returned');
      }
      if (isApproval1Confirmed === 'success') {
        console.log('Approve Transaction is confirmed!');
      }
    } catch (error) {
      console.error('Approve transaction error:', error);
    }
  };

  const handleRevoke = async (listing) => {
    try {
      console.log('Executing revoke transaction for:', listing);
      const revokeTx = await writeRevokeContract({
        address: '0xe43ff92d19a030C5181444897e7a825458d2b389',
        abi: abi,
        functionName: 'revoke',
        args: [listing.nftAddr, listing.tokenId],
        onSuccess: handleRevokeSuccess,
      });

      if (revokeTx) {
        setRevokeHash(revokeTx);
        setListings((prevListings) =>
          prevListings.filter(
            (item) =>
              !(
                item.nftAddr === listing.nftAddr &&
                item.tokenId === listing.tokenId
              )
          )
        );

        if (isRevokeConfirmed === 'success') {
          console.log('Cancel Transaction is confirmed!');
        }
      } else {
        console.error('Revoke transaction failed: No transaction returned');
      }
    } catch (err) {
      console.error('Revoke transaction error:', err);
    }
  };

  const handlePurchaseTransaction = async (listing) => {
    try {
      console.log({
        abi,
        address: '0xe43ff92d19a030C5181444897e7a825458d2b389',
        functionName: 'purchase',
        args: [listing.nftAddr, listing.tokenId],
      });
      const PurchaseTx = await writePurchaseContract({
        address: '0xe43ff92d19a030C5181444897e7a825458d2b389',
        abi: abi,
        functionName: 'purchase',
        args: [listing.nftAddr, listing.tokenId],
      });

      if (PurchaseTx) {
        setPurchaseHash(PurchaseTx);
        setListings((prevListings: any[]) =>
          prevListings.filter(
            (item: { nftAddr: any; tokenId: any }) =>
              !(
                item.nftAddr === listing.nftAddr &&
                item.tokenId === listing.tokenId
              )
          )
        );
      } else {
        console.error('Purchase transaction failed: No transaction returned');
      }
      if (isPurchaseConfirmed === 'success') {
        console.log('Purchase Transaction is confirmed!');
      }
    } catch (err) {
      console.error('Purchase transaction error:', err);
    }
  };

  return (
    <div className="listings-container">
      {listings.map((listing, index) => (
        <div key={index} className="listing-card">
          {uris[listing.nftAddr] && (
            <img
              src={`https://gateway.pinata.cloud/ipfs/QmbuQJJWYMgRgbZrMYXVk1aYWmfiyk7rYxG4HU8tR1kV2Q`} //暂时使用硬编码，json解析好麻烦以后再写
              alt={`NFT ${listing.tokenId}`}
              className="nft-image"
            />
          )}
          <p>
            <strong>Seller:</strong> {listing.seller}
          </p>
          <p>
            <strong>NFT Address:</strong> {listing.nftAddr}
          </p>
          <p>
            <strong>Token ID:</strong> {listing.tokenId}
          </p>
          <p>
            <strong>Price:</strong> {listing.price} BDT
          </p>
          {uris[listing.nftAddr] && (
            <p>
              <strong>Base URI:</strong> {uris[listing.nftAddr]}
            </p>
          )}
          <button
            onClick={() => handlePurchase(listing)}
            className="cancel-button"
            disabled={!isConnected}
          >
            purchase
          </button>
          <button
            onClick={() => handleRevoke(listing)}
            className="cancel-button"
            disabled={!isConnected}
          >
            revoke
          </button>
        </div>
      ))}
      {isApproval1Confirming && <div>Waiting for approval confirmation...</div>}
      {isPurchaseConfirming && (
        <div>Waiting for list transaction confirmation...</div>
      )}
      {isApproval1Confirmed == 'success' && (
        <div>Approve transaction confirmed.</div>
      )}
      {isPurchaseConfirmed == 'success' && (
        <div>List transaction confirmed.</div>
      )}
      {(approval1Error || purchaseError) && (
        <div>Error: {(approval1Error || purchaseError).message}</div>
      )}
    </div>
  );
}
