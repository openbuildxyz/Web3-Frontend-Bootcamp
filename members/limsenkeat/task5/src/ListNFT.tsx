import React, { useState, useEffect } from 'react'
import { parseEther, Address } from 'viem';
import { useAccount, useWriteContract, useReadContract, useReadContracts } from 'wagmi'
import { waitForTransactionReceipt } from '@wagmi/core'
import { BASE_URL, NFT_ADDRESS, NFT_MARKET_ADDRESS } from "./config";
import { config } from './wagmi'
import NFT_MARKET_ABI from "./abi/NFTMarket.json";
import NFT_ABI from "./abi/MomBirds.json";

function ListNFT() {
    const { address, isConnected } = useAccount();
    const [selectedTokenId, setSelectedTokenId] = useState('');
    const [price, setPrice] = useState('');
    const { data:transactionHash, writeContractAsync } = useWriteContract()
    const priceInWei = parseEther(price);
    const [isProcessing, setIsProcessing] = useState(false)
    const [statusMessage, setStatusMessage] = useState('')
    const [ownedNFTs, setOwnedNFTs] = useState<string[]>([])

    const { data: balance, isLoading: isBalanceLoading } = useReadContract({
        address: NFT_ADDRESS,
        abi: NFT_ABI,
        functionName: 'balanceOf',
        args: [address],
    });

    const { data: tokenIds, isLoading: isTokenIdsLoading } = useReadContracts({
        contracts: balance ? Array(Number(balance)).fill(0).map((_, i) => ({
            address: NFT_ADDRESS as Address,
            abi: NFT_ABI as any,
            functionName: 'tokenOfOwnerByIndex',
            args: [address, i],
        })) : [],
    });
	
    useEffect(() => {
        if (!isBalanceLoading && !isTokenIdsLoading && tokenIds) {
            const updatedTokenIds = tokenIds as { result: string; status: string }[];
            setOwnedNFTs(updatedTokenIds.map(item => item.result.toString()));
        }
    }, [isBalanceLoading, isTokenIdsLoading, tokenIds]);

    const { data:isApproved } = useReadContract({
        address: NFT_ADDRESS,
        abi: NFT_ABI,
        functionName: 'getApproved',
        args: [selectedTokenId],
    })

    const { data:isListed } = useReadContract({
        address: NFT_MARKET_ADDRESS,
        abi: NFT_MARKET_ABI,
        functionName: 'isNFTListed',
        args: [NFT_ADDRESS, selectedTokenId],
    })
	
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsProcessing(true)
        setStatusMessage('')

        if (isListed) {
            setStatusMessage('The NFT is already listed.')
            setIsProcessing(false)
            return
        }
		
        if (!isApproved || isApproved === '0x0000000000000000000000000000000000000000') {
            try {
                const transactionHash = await writeContractAsync({
                    address: NFT_ADDRESS as Address,
                    abi: NFT_ABI,
                    functionName: 'approve',
                    args: [NFT_MARKET_ADDRESS, selectedTokenId],
                })
                
                if (transactionHash) {
                    setStatusMessage('Approval processing. It may take a few minutes.')
                    await waitForTransactionReceipt(config, { hash: transactionHash })
                    setStatusMessage('Approval success, listing in process...')
                }
            } catch (error) {
                console.log(error);
                setStatusMessage('Approval failed. Please try again.')
                setIsProcessing(false)
                return
            }
        }
    
        try {
            const transactionHash = await writeContractAsync({
                address: NFT_MARKET_ADDRESS,
                abi: NFT_MARKET_ABI,
                functionName: 'listNFT',
                args: [NFT_ADDRESS, selectedTokenId, priceInWei],
            })
            
            if (transactionHash) {
                setStatusMessage('Listing your NFT. It may take a few minutes.')
                await waitForTransactionReceipt(config, { hash: transactionHash })
                setStatusMessage('Your NFT is listed.')
            }
        } catch (error) {
            console.log(error);
            setStatusMessage('Failed to list your NFT, please try again.')
        } finally {
            setIsProcessing(false)
        }
    }

    useEffect(() => {
        return () => {
            setOwnedNFTs([]);
            setSelectedTokenId('');
        };
    }, []);

	// useEffect(() => {
    //     console.log('Balance:', balance);
    //     console.log('Address:', address);
    //     console.log('OwnedNFTs:', ownedNFTs);
    // }, [balance, address, ownedNFTs]);

    if (!isConnected) {
        return <div className="bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl mb-4">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white text-center mb-8">Please connect your wallet</h2>
        </div>;
    }

    return (
        <div className="bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl mb-4">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">List Your NFT</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="nftSelect" className="block text-sm font-medium text-slate-500 dark:text-slate-400">Select NFT</label>
                    <select
                        id="nftSelect"
                        className="bg-gray-50 border border-gray-300 text-slate-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={selectedTokenId}
                        onChange={(e) => setSelectedTokenId(e.target.value)}
                        required
                    >
                        <option value="">Select an NFT</option>
                        {ownedNFTs.map((nft) => (
                            <option key={nft} value={nft}>Token ID: {nft}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-slate-500 dark:text-slate-400">Price ($FEA)</label>
                    <input
                        id="price"
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-slate-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={price}
                        placeholder='10.0'
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={isProcessing || ownedNFTs.length === 0 || (isListed as boolean)} 
                    className={`w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isProcessing || ownedNFTs.length === 0 || isListed ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
                >
                    {isProcessing 
                        ? "Listing..." 
                        : ownedNFTs.length === 0 
                        ? "No NFTs to List" 
                        : isListed 
                        ? "NFT Already Listed" 
                        : "List NFT"}
                </button>
                {statusMessage && (
                    <div className="text-slate-900 dark:text-white text-balance">
                        {statusMessage}
                        {transactionHash && (
                            <a 
                                href={`${BASE_URL}tx/${transactionHash}`} 
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