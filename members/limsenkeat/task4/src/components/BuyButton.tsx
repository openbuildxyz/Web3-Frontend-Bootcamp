import { useEffect, useState } from 'react'
import { useAccount, useWriteContract, useReadContract, useWaitForTransactionReceipt } from 'wagmi'
import { waitForTransactionReceipt } from '@wagmi/core'
import { parseEther } from 'viem'
import { config } from '../wagmi'
import { TOKEN_ADDRESS, NFT_MARKET_ADDRESS } from "../config";
import TOKEN_ABI from '../abi/FeatherToken.json'
import NFT_MARKET_ABI from '../abi/NFTMarket.json'
import Modal from './BuyModal';

const BuyButton = ({ nft, onBuySuccess }: { nft: any, onBuySuccess: (nft: any) => void }) => {
    
    const { address } = useAccount();
    const { writeContractAsync, data: hash, error, isPending } = useWriteContract()

    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
        hash,
    })
    
    const { data: allowance } = useReadContract({
        address: TOKEN_ADDRESS,
        abi: TOKEN_ABI,
        functionName: 'allowance',
        args: [address, NFT_MARKET_ADDRESS],
    }) as { data: bigint }

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalTitle, setModalTitle] = useState('')
    const [modalMessage, setModalMessage] = useState('')
    const [transactionHash, setModaltransactionHash] = useState('')

    const showModal = (title: string, message: string, transactionHash: string) => {
        setModalTitle(title)
        setModalMessage(message)
        setModaltransactionHash(transactionHash)
        setIsModalOpen(true)
    }

    const handleBuy = async () => {
        
        try {
            
            if (allowance < parseEther(nft.price)) {
                showModal('Token Approval', 'Approve token usage...', '')
                const approveTx = await writeContractAsync({
                    address: TOKEN_ADDRESS,
                    abi: TOKEN_ABI,
                    functionName: 'approve',
                    args: [NFT_MARKET_ADDRESS, parseEther(nft.price)],
                })
                
                showModal('Token Approval', 'Approving, it may take few minutes.', approveTx)
                await waitForTransactionReceipt(config, { hash: approveTx })

            }
            
            try {

                showModal('Purchase NFT', 'Purchasing NFT...', '')
                const buyTx = await writeContractAsync({
                    address: NFT_MARKET_ADDRESS,
                    abi: NFT_MARKET_ABI,
                    functionName: 'buyNFT',
                    args: [nft.contract, nft.tokenId],
                })
                
                showModal('Purchase NFT', 'Purchasing, it may take few minutes.', buyTx)
                await waitForTransactionReceipt(config, { hash: buyTx })
                showModal('Purchase NFT', 'NFT purchase successful', buyTx)

            } catch (error) {
                setIsModalOpen(false)
                console.log(error);
            }
        } catch (error) {
            setIsModalOpen(false)
            console.log(error);
        }
    }

    useEffect(() => {
        if (isSuccess) {
            onBuySuccess(nft);
        }
    }, [isSuccess, nft, onBuySuccess]);

    let buttonText = 'Buy'
    let buttonClass = 'bg-blue-500 hover:bg-blue-600 text-white'
    if (isPending || isConfirming) {
        buttonText = 'Loading...'
        buttonClass = 'bg-gray-500 text-white cursor-not-allowed'
    } else if (isSuccess) {
        buttonText = 'Success!'
        buttonClass = 'bg-green-500 text-white'
    } else if (error) {
        buttonText = 'Fail'
        buttonClass = 'bg-red-500 text-white'
    }

    return (
        <>
        <button 
            onClick={handleBuy}
            disabled={isPending || isConfirming}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${buttonClass}`}
        >
            {buttonText}
        </button>
        <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={modalTitle}
            message={modalMessage}
            transactionHash={transactionHash}
        />
        </>
    )
}

export default BuyButton