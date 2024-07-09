import { useReadContract } from 'wagmi'
import { useState, useEffect } from 'react'
import { formatEther } from 'viem';
import { NFT_MARKET_ADDRESS } from "./config";
import NFT_MARKET_ABI from './abi/NFTMarket.json'
import NFTItem from './NFTItem';

function NFTList() {

	const [nfts, setNfts] = useState([])
	const [currentPage, setCurrentPage] = useState(0)
	const pageSize = 12
	let isPaginationDisabled = true
	
	const { data, isError, isLoading } = useReadContract({
		address: NFT_MARKET_ADDRESS,
		abi: NFT_MARKET_ABI,
		functionName: 'getAllListedNFTs',
		args: [BigInt(currentPage * pageSize), BigInt(pageSize)],
	})

	useEffect(() => {
		if (data && Array.isArray(data) && data.length === 4) {
			const [nftContracts, tokenIds, sellers, prices] = data;
			const formattedNFTs = nftContracts.map((contract: any, index: string | number) => ({
				contract,
				tokenId: tokenIds[index],
				seller: sellers[index],
				price: formatEther(prices[index]),
			}));
			isPaginationDisabled = formattedNFTs.length <= pageSize ? true : false
			setNfts(formattedNFTs);
		}
	}, [data])
	
	return (
		<div>
			<div className="bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl">
				<h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">NFT LIST</h2>
				{isLoading ? <div className='text-center text-gray-600 dark:text-gray-100'>Loading...</div> :
				isError ? <div className='text-center text-gray-600 dark:text-gray-100'>Fail to load NFT list</div> : 
				<NFTItem nfts={ nfts }/>
				}
				<div className="mt-4 flex justify-center">
					<span className="mx-3 text-slate-900 dark:text-white text-sm">Page: {currentPage + 1}</span>
					<button 
						className={`px-4 py-1 mx-1 bg-gray-50 dark:bg-gray-800 hover:bg-gray-900 border border-gray-500 text-slate-900 dark:text-white hover:text-white text-xs rounded-lg transition-colors duration-200 ${isPaginationDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
						disabled={isPaginationDisabled}
						onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
					>Previous</button>
					<button 
						className={`px-4 py-1 mx-1 bg-gray-50 dark:bg-gray-800 hover:bg-gray-900 border border-gray-500 text-slate-900 dark:text-white hover:text-white text-xs rounded-lg transition-colors duration-200 ${isPaginationDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
						disabled={isPaginationDisabled}
						onClick={() => setCurrentPage(prev => prev + 1)}
					>Next</button>
					{/* <button className="px-4 py-1 mx-1 bg-gray-50 dark:bg-gray-800 hover:bg-gray-900 border border-gray-500 text-slate-900 dark:text-white hover:text-white text-xs rounded-lg transition-colors duration-200" onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}>Previous</button>
					<button className="px-4 py-1 mx-1 bg-gray-50 dark:bg-gray-800 hover:bg-gray-900 border border-gray-500 text-slate-900 dark:text-white hover:text-white text-xs rounded-lg transition-colors duration-200" onClick={() => setCurrentPage(prev => prev + 1)}>Next</button> */}
				</div>
			</div>
		</div>
	)
}

export default NFTList