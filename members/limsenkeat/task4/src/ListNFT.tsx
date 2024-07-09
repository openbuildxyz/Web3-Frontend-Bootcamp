import React, { useState } from 'react'
import { parseEther, Address } from 'viem';
import { useAccount, useWriteContract, useReadContract } from 'wagmi'
import { waitForTransactionReceipt } from '@wagmi/core'
import { BASE_URL, NFT_ADDRESS, NFT_MARKET_ADDRESS } from "./config";
import { config } from './wagmi'
import NFT_MARKET_ABI from "./abi/NFTMarket.json";
import NFT_ABI from "./abi/MomBirds.json";

function ListNFT() {

	const { address, isConnected } = useAccount();
	const [tokenId, setTokenId] = useState('');
	const [price, setPrice] = useState('');
	const [nftAddress, setNftAddress] = useState<`0x${string}`>(NFT_ADDRESS)
	const { data: transactionHash, writeContractAsync } = useWriteContract()
	const priceInWei = parseEther(price);
	const [isProcessing, setIsProcessing] = useState(false)
	const [statusMessage, setStatusMessage] = useState('')

	const { data: isApproved } = useReadContract({
		address: nftAddress,
		abi: NFT_ABI,
		functionName: 'getApproved',
		args: [tokenId],
	})
	
	const { data: nftOwner } = useReadContract({
		address: nftAddress,
		abi: NFT_ABI,
		functionName: 'ownerOf',
		args: [tokenId],
	})

	const { data: isListed } = useReadContract({
		address: NFT_MARKET_ADDRESS,
		abi: NFT_MARKET_ABI,
		functionName: 'isNFTListed',
		args: [nftAddress, tokenId],
	})
	
	const handleSubmit = async (e: React.FormEvent) => {

		e.preventDefault()
		setIsProcessing(true)
		setStatusMessage('')
		
		if (nftOwner !== address) {
			setStatusMessage('Your are not the NFT owner.')
			setIsProcessing(false)
			return
		}
		
		if (isListed) {
			setStatusMessage('The NFT is listed.')
			setIsProcessing(false)
			return
		}

		if (!isApproved || isApproved === '0x0000000000000000000000000000000000000000') {
			try {
				
				const transactionHash = await writeContractAsync({
					address: nftAddress as Address,
					abi: NFT_ABI,
					functionName: 'approve',
					args: [NFT_MARKET_ADDRESS, tokenId],
				})
				
				if (transactionHash) {
					setStatusMessage('Approval processing. It may take few minutes.')
					await waitForTransactionReceipt(config, { hash: transactionHash })
					setStatusMessage('Approval success, listing in process...')
				}
			} catch (error) {
				console.log(error);
				setStatusMessage('Approval fail. Please try again.')
				setIsProcessing(false)
				return
			}
		}
	
		try {
			const transactionHash = await writeContractAsync({
				address: NFT_MARKET_ADDRESS,
				abi: NFT_MARKET_ABI,
				functionName: 'listNFT',
				args: [nftAddress, tokenId, priceInWei],
			})
			
			if (transactionHash) {
				setStatusMessage('Listing your NFT. It may take few minutes.')
				await waitForTransactionReceipt(config, { hash: transactionHash })
				setStatusMessage('Your NFT is listed.')
			}
		} catch (error) {
			console.log(error);
			setStatusMessage('Fail to list your NFT, please try again.')
		} finally {
			setIsProcessing(false)
		}
	}

	if (!isConnected) {
		return <h2 className="text-2xl font-semibold text-slate-900 dark:text-white text-center mb-8">Please connect your wallet</h2>;
	}

	return (
		<div className="bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl">
			<h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4 ">List Your NFT to Marketplace</h2>
			{/* <form onSubmit={handleSubmit} className="space-y-4"> */}
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label htmlFor="tokenId" className="block text-sm font-medium text-slate-500 dark:text-slate-400">Enter NFT Contact Address</label>
					<input
						id="nftAddress"
						type="text"
						className="bg-gray-50 border border-gray-300 text-slate-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						value={nftAddress}
						onChange={(e) => setNftAddress(e.target.value as `0x${string}`)}
						required
				/>
				</div>
				<div>
					<label htmlFor="tokenId" className="block text-sm font-medium text-slate-500 dark:text-slate-400">Enter NFT Token ID</label>
					<input
						id="tokenId"
						type="text"
						className="bg-gray-50 border border-gray-300 text-slate-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						value={tokenId}
						onChange={(e) => setTokenId(e.target.value)}
						required
				/>
				</div>
				<div>
					<label htmlFor="price" className="block text-sm font-medium text-slate-500 dark:text-slate-400">Price ($FEA)</label>
					<input
						id="price"
						type="text"
						className="bg-gray-50 border border-gray-300 text-slate-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						value={price}
						onChange={(e) => setPrice(e.target.value)}
						required
					/>
				</div>
				<button
					type="submit"
					disabled={isProcessing} 
					className={`w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
				>
				{isProcessing ? "Listing...." : "List NFT"}
				</button>
				{statusMessage && (
					<div className="text-slate-900 dark:text-white text-balance">
						{statusMessage}
						{transactionHash && (
							<a 
								href={`${BASE_URL}${transactionHash}`} 
								target="_blank" 
								rel="noopener noreferrer"
								className="ml-2 text-blue-600 hover:text-blue-800"
							>
								View transaction
							</a>
						)}
					</div>
				)}
			</form>
		</div>
	);
}

export default ListNFT;
