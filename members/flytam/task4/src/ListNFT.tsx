import { useState } from 'react';
import { useConfig, useWaitForTransactionReceipt, useWriteContract } from 'wagmi'
import { writeContract, waitForTransactionReceipt } from '@wagmi/core'
import {address} from './address';
import { marketAbi } from './abi';
import { parseAbi } from 'viem';

const ERC721_ABI = parseAbi(["function approve(address to, uint256 tokenId) external"])

export function ListNFT() {
  const [nftAddress, setNftAddress] = useState<`0x${string}`>('0x');
  const [tokenId, setTokenId] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const { data: hashList, writeContractAsync: writeContractAsyncList, isPending: isPendingList } = useWriteContract()
  const config = useConfig();

  const { isLoading: isConfirmingList, isSuccess: isConfirmedList } =
  useWaitForTransactionReceipt({
    hash: hashList as any,
  })

  const listNFT =  async () => {
    console.log('list nft', nftAddress, tokenId, price)
    const res = await writeContract(config, {
      address: nftAddress,
      functionName: 'approve',
      args: [address.marketAddress, tokenId as any],
      abi: ERC721_ABI
    })

    await waitForTransactionReceipt(config, {
      hash: res
    })

    console.log('approve done', res)

    const res2 = await writeContractAsyncList({
        address: address.marketAddress,
        abi: marketAbi,
        functionName: 'listNFT',
        args: [nftAddress, tokenId, price] as any,
    })

    console.log('list done', res2)
  };

  return (
    <div>
      <h3>List NFT</h3>
      <input
        type="text"
        placeholder="NFT Contract Address"
        value={nftAddress}
        onChange={(e) => setNftAddress(e.target.value as any)}
      />
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
      <button disabled={isPendingList} onClick={listNFT}>{isPendingList ? 'Listing....': 'List NFT'}</button>
      {hashList && <div>List ransaction Hash: {hashList}</div>}
      {isConfirmingList && <div>List Waiting for confirmation...</div>}
      {isConfirmedList && <div>List Transaction confirmed.</div>}
    </div>
  );
}