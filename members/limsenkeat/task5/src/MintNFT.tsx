import { useState } from 'react'
import { useAccount, useWriteContract, useReadContract } from 'wagmi'
import { waitForTransactionReceipt } from '@wagmi/core'
import { BASE_URL, NFT_ADDRESS, TOKEN_ADDRESS } from "./config";
import { config } from './wagmi'
import TOKEN_ABI from './abi/FeatherToken.json';
import NFT_ABI from './abi/MomBirds.json';

function MintNFT() {
    const { address, isConnected } = useAccount();
    const { data: transactionHash, writeContractAsync } = useWriteContract()
    const [isProcessing, setIsProcessing] = useState(false)
    const [statusMessage, setStatusMessage] = useState('')

    const { data: totalMinted } = useReadContract({
        address: NFT_ADDRESS,
        abi: NFT_ABI,
        functionName: 'totalMinted',
    })

    const handleMint = async () => {
        setIsProcessing(true)
        setStatusMessage('')

        try {
            const transactionHash = await writeContractAsync({
                address: NFT_ADDRESS,
                abi: NFT_ABI,
                functionName: 'mint',
                args: [address],
            })
            
            if (transactionHash) {
                setStatusMessage('Minting your NFT. It may take few minutes.')
                await waitForTransactionReceipt(config, { hash: transactionHash })
                setStatusMessage('Your NFT has been minted successfully!')
            }
        } catch (error) {
            console.log(error);
            setStatusMessage('Failed to mint NFT. Please try again later.')
        } finally {
            setIsProcessing(false)
        }
    }

    const handleFaucet = async () => {
        setIsProcessing(true)
        setStatusMessage('')

        try {
            const transactionHash = await writeContractAsync({
                address: TOKEN_ADDRESS,
                abi: TOKEN_ABI,
                functionName: 'faucet',
            })
            
            if (transactionHash) {
                setStatusMessage('Requesting tokens from faucet. Please wait...')
                await waitForTransactionReceipt(config, { hash: transactionHash })
                setStatusMessage('Tokens received successfully!')
            }
        } catch (error) {
            console.log(error);
            setStatusMessage('Failed to request tokens. Please try again later.')
        } finally {
            setIsProcessing(false)
        }
    }

    if (!isConnected) {
        return null;
    }

    return (
        <div className="bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl mb-4">
            <button
                onClick={handleMint}
                disabled={isProcessing || Number(totalMinted) >= 10000}
                className={`w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                    isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}
            >
                {isProcessing ? "Processing..." : Number(totalMinted) >= 10000 ? "Sold Out" : "Mint NFT"}
            </button>
            <div className="mt-4">
                <button
                    onClick={handleFaucet}
                    disabled={isProcessing}
                    className={`w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                        isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    }`}
                >
                    {isProcessing ? "Processing..." : "Get FEA Tokens"}
                </button>
            </div>
            {statusMessage && (
            <div className="text-slate-900 dark:text-white text-balance mt-4">
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
        </div>
    );
}

export default MintNFT;