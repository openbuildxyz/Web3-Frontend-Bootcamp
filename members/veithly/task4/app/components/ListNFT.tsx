'use client';
import { useState, ChangeEvent } from 'react';
import { useAccount } from 'wagmi';
import { parseUnits, ethers } from 'ethers';
import NFTMarketABI from '../../abis/NFTMarketABI.json';
import { Input, Button } from '@nextui-org/react';
import { useEthersSigner } from '@/utils/useEthersSigner';

const ListNFT: React.FC = () => {
  const { address, isConnected } = useAccount();
  const signer = useEthersSigner();
  const [nftContract, setNftContract] = useState('');
  const [tokenId, setTokenId] = useState('');
  const [price, setPrice] = useState('');

  const listNFT = async () => {
    if (!isConnected || !address || !signer) return;
    const contract = new ethers.Contract('NFTMarket_CONTRACT_ADDRESS', NFTMarketABI, signer);
    const weiPrice = parseUnits(price, 'ether');
    await contract.listNFT(nftContract, tokenId, weiPrice);
  };

  const handleNftContractChange = (e: ChangeEvent<HTMLInputElement>) => setNftContract(e.target.value);
  const handleTokenIdChange = (e: ChangeEvent<HTMLInputElement>) => setTokenId(e.target.value);
  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => setPrice(e.target.value);

  return (
    <div style={{ padding: '1rem' }}>
      <Input
        isClearable
        variant="underlined"
        placeholder="NFT Contract"
        value={nftContract}
        onChange={handleNftContractChange}
      />
      <Input
        isClearable
        variant="underlined"
        placeholder="Token ID"
        value={tokenId}
        onChange={handleTokenIdChange}
      />
      <Input
        isClearable
        variant="underlined"
        placeholder="Price in ETH"
        value={price}
        onChange={handlePriceChange}
      />
      <Button onClick={listNFT}>List NFT</Button>
    </div>
  );
};

export default ListNFT;
