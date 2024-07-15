import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';
import {NFT_ABI} from '../config/NFTabi.tsx';
import {Market_ABI} from '../config/Marketabi.tsx';
import {Token_ABI} from '../config/Tokenabi.tsx';

// 替换为你的合约地址
const CONTRACT_ADDRESS = '0xeeae464ce594ba0ed9e42f651583767bfed07894';

const TOKEN_ADDRESS = '0x9ac13a3d539e2584ff7246aa93b5c6a4bc17e44b';

function NFTOrderList() {
  const provider = new ethers.providers.JsonRpcProvider('https://eth-sepolia.public.blastapi.io');
  const contract = new ethers.Contract(CONTRACT_ADDRESS, Market_ABI, provider);
  const [orders, setOrders] = useState([]);
  const [nftData, setNftData] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const fetchedOrders = await contract.getAllListNft();
        setOrders(fetchedOrders);

        // Fetch metadata for each order
        const nftDataPromises = fetchedOrders.map(async (order) => {
          const tokenContract = new ethers.Contract(order.nftAddr, NFT_ABI, provider);
          const tokenURI = await tokenContract.tokenURI(order.tokenId);
          const tokenURL = "https://ipfs.io/ipfs/"+tokenURI.split("://")[1];
          // console.log('tokenURI', tokenURL);  
          const response = await axios.get(tokenURL);
          return { tokenId: order.tokenId, metadata: response.data };
        });

        const nftDataArray = await Promise.all(nftDataPromises);
        const nftDataMap = nftDataArray.reduce((acc, nft) => {
          acc[nft.tokenId] = nft.metadata;
          return acc;
        }, {});
        
        setNftData(nftDataMap);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [contract]);


  const purchaseNFT = async (nftAddr, tokenId, price) => {
    try {
      if (!window.ethereum) {
        throw new Error('MetaMask is not installed');
      }
      const provider1 = new ethers.providers.Web3Provider(window.ethereum);

      const signer = provider1.getSigner();
      const marketContractWithSigner = new ethers.Contract(CONTRACT_ADDRESS, Market_ABI, signer);
      const tokenContractWithSigner = new ethers.Contract(TOKEN_ADDRESS, Token_ABI, signer);

      // Check if the user has approved the market contract to spend their tokens
      const allowance = await tokenContractWithSigner.allowance(await signer.getAddress(), CONTRACT_ADDRESS);
      if (allowance.lt(price)) {
        console.log('Approving BerToken spending...');
        const txApprove = await tokenContractWithSigner.approve(CONTRACT_ADDRESS, price);
        await txApprove.wait();
        console.log('Approval confirmed');
      }

      console.log(`Purchasing token ID ${tokenId} from contract ${nftAddr} for price ${price} berToken...`);

      const tx = await marketContractWithSigner.purchaseNFT(nftAddr, tokenId);
      console.log('Purchase transaction hash:', tx.hash);
      await tx.wait();
      console.log('Purchase confirmed');

      alert(`NFT ${tokenId} purchased for ${ethers.utils.formatEther(price)} berToken`);
      // Refresh the page after 2 seconds
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error('Error purchasing NFT:', error);
      alert('Failed to purchase NFT');
    }
  };

  return (
    <div>
      <h1>NFT Orders</h1>
      {orders.length === 0 ? (
        <p>No orders available.</p>
      ) : (
        <ul>
          {orders.map((order, index) => (
            <li key={index}>
              {nftData[order.tokenId] && (
                <div>
                  <img src={"https://ipfs.io/ipfs/"+nftData[order.tokenId].image.split("://")[1]} alt={`NFT ${order.tokenId}`} width="200" />
                </div>
              )}
              <p>Owner: {order.owner}</p>
              <p>Price: {ethers.utils.formatEther(order.price)} berToken</p>
              <p>List Time: {new Date(order.listTime.toNumber() * 1000).toLocaleString()}</p>
              <p>NFT Address: {order.nftAddr}</p>
              <p>Token ID: {order.tokenId.toString()}</p>
              <button onClick={() => purchaseNFT(order.nftAddr, order.tokenId, order.price)}>
                Purchase
              </button>
              <p>----------------------------------------------------------------------------------</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}


export default NFTOrderList;
