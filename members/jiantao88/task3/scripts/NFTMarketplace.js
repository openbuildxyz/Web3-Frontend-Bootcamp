import React, { useEffect, useState } from "react";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useContract,
  useProvider,
  useSigner,
} from "wagmi";
import { ethers } from "ethers";

const nftMarketAbi = [
  // Your NFTMarket ABI
];
const nftAbi = [
  // Your MyNFT ABI
];
const erc20Abi = [
  // Your MyERC20Token ABI
];

const nftMarketAddress = "YOUR_NFT_MARKET_ADDRESS";
const nftAddress = "YOUR_NFT_ADDRESS";
const erc20Address = "YOUR_ERC20_ADDRESS";

function NFTMarketplace() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const provider = useProvider();
  const { data: signer } = useSigner();

  const [nftMarket, setNftMarket] = useState();
  const [nft, setNft] = useState();
  const [erc20, setErc20] = useState();
  const [listings, setListings] = useState([]);
  const [tokenId, setTokenId] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (signer) {
      setNftMarket(new ethers.Contract(nftMarketAddress, nftMarketAbi, signer));
      setNft(new ethers.Contract(nftAddress, nftAbi, signer));
      setErc20(new ethers.Contract(erc20Address, erc20Abi, signer));
    }
  }, [signer]);

  const listNFT = async () => {
    try {
      const tx = await nft.approve(nftMarketAddress, tokenId);
      await tx.wait();

      const listTx = await nftMarket.listNFT(
        nftAddress,
        tokenId,
        ethers.utils.parseUnits(price, 18)
      );
      await listTx.wait();
      alert("NFT listed successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to list NFT");
    }
  };

  const buyNFT = async (index) => {
    try {
      const listing = listings[index];
      const tx = await erc20.approve(nftMarketAddress, listing.price);
      await tx.wait();

      const buyTx = await nftMarket.buyNFT(index);
      await buyTx.wait();
      alert("NFT purchased successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to purchase NFT");
    }
  };

  useEffect(() => {
    const fetchListings = async () => {
      if (nftMarket) {
        const totalListings = await nftMarket.listingsLength();
        const fetchedListings = [];
        for (let i = 0; i < totalListings; i++) {
          const listing = await nftMarket.listings(i);
          fetchedListings.push({
            nftContract: listing.nftContract,
            tokenId: listing.tokenId.toNumber(),
            seller: listing.seller,
            price: ethers.utils.formatUnits(listing.price, 18),
          });
        }
        setListings(fetchedListings);
      }
    };

    fetchListings();
  }, [nftMarket]);

  if (isConnected) {
    return (
      <div>
        <button onClick={disconnect}>Disconnect</button>
        <p>Connected as {address}</p>
        <div>
          <h2>List NFT</h2>
          <input
            type="text"
            placeholder="Token ID"
            value={tokenId}
            onChange={(e) => setTokenId(e.target.value)}
          />
          <input
            type="text"
            placeholder="Price (in ERC20 tokens)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <button onClick={listNFT}>List NFT</button>
        </div>
        <div>
          <h2>Listings</h2>
          <ul>
            {listings.map((listing, index) => (
              <li key={index}>
                <p>NFT Contract: {listing.nftContract}</p>
                <p>Token ID: {listing.tokenId}</p>
                <p>Seller: {listing.seller}</p>
                <p>Price: {listing.price} ERC20 Tokens</p>
                <button onClick={() => buyNFT(index)}>Buy NFT</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div>
      {connectors.map((connector) => (
        <button key={connector.id} onClick={() => connect(connector)}>
          Connect with {connector.name}
        </button>
      ))}
    </div>
  );
}

export default NFTMarketplace;
