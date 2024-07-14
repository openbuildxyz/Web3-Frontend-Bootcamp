import React, { useEffect, useState } from 'react';
import { useAccount, useWalletClient,useConnect,useClient,useSignMessage,useWriteContract } from 'wagmi';
import { ethers } from 'ethers';
import axios from 'axios';
import {NFT_ABI} from '../config/NFTabi.tsx';
import {Market_ABI} from '../config/Marketabi.tsx';

const NFT_CONTRACT_ADDRESS = '0x8f86ab2960f5ed1bab60ddfc2cef8aab3f9b8eec';
const MARKET_CONTRACT_ADDRESS = '0xeeae464ce594ba0ed9e42f651583767bfed07894';

  
function AccountNFTs() {
  const { address, isConnected } = useAccount();
  const provider =new ethers.providers.Web3Provider(window.ethereum);

  const [nfts, setNfts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchNFTs = async () => {
      if (!address || !isConnected) return;

      try {
        const nftContract = new ethers.Contract(NFT_CONTRACT_ADDRESS, NFT_ABI, provider);
        const balance = await nftContract.balanceOf(address);

        if (balance.toNumber() === 0) {
          setLoading(false);
          return;
        }

        const nftPromises = [];
        const mintNums = await nftContract.getHasMinted();

        for (let i = 0; i < mintNums.toNumber(); i++) {
          const ownerOfToken = await nftContract.ownerOf(i);
          if (ownerOfToken.toLowerCase() === address.toLowerCase()) {
            const tokenURI = await nftContract.tokenURI(i);
            const tokenURL = `https://ipfs.io/ipfs/${tokenURI.split('://')[1]}`;
            const response = await axios.get(tokenURL);
            nftPromises.push({ tokenId: i.toString(), metadata: response.data , name:await nftContract.name() });
          }
        }
        console.log('nftPromises', nftPromises);

        const nfts = await Promise.all(nftPromises);
        setNfts(nfts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching NFTs:', error);
        setLoading(false);
      }
    };

    fetchNFTs();
  }, [address, isConnected, provider]);
  const listNFT = async (tokenId: string, price: string) => {
    if (!provider) {
      throw new Error('Provider is not available');
    }
  
    try {
      const signer = provider.getSigner();
      const nftContract = new ethers.Contract(NFT_CONTRACT_ADDRESS, NFT_ABI, signer);
      const marketContract = new ethers.Contract(MARKET_CONTRACT_ADDRESS, Market_ABI, signer);
  
      // Check if the market contract is already approved
      const approvedAddress = await nftContract.getApproved(tokenId);
      if (approvedAddress !== MARKET_CONTRACT_ADDRESS) {
        // Approve the market contract to transfer the NFT
        const tx1 = await nftContract.approve(MARKET_CONTRACT_ADDRESS, tokenId);
        await tx1.wait();
        console.log(`NFT ${tokenId} approved to market contract`);
      } else {
        console.log(`NFT ${tokenId} is already approved to market contract`);
      }
  
      // List the NFT on the market
      const tx2 = await marketContract.listNFT(NFT_CONTRACT_ADDRESS, tokenId, ethers.utils.parseEther(price));
      await tx2.wait();
  
      alert(`NFT tokenID ${tokenId} listed for ${price} berToken`);
      // Refresh the page after 2 seconds
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error('Error listing NFT:', error);
      alert('Failed to list NFT');
    }
  };
  
  return (
    <div>
      {/* <h1>My NFTs</h1> */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {nfts.map((nft) => (
            <li key={nft.tokenId}>
              <img src={`https://ipfs.io/ipfs/${nft.metadata.image.split('://')[1]}`} alt={`NFT ${nft.tokenId}`} width="200" />
              <p>Token ID: {nft.tokenId}</p>
              <p>Name: {nft.name}</p>
              <input type="text" placeholder="Price in berToken" id={`price-${nft.tokenId}`} />
              <button onClick={() => listNFT(nft.tokenId, (document.getElementById(`price-${nft.tokenId}`) as HTMLInputElement).value)}>
                 List NFT
               </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AccountNFTs;



