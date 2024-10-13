import { useEffect, useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { waitForTransactionReceipt } from '@wagmi/core'
import { config } from '../wagmi'
import { TOKEN_ADDRESS, NFT_MARKET_ADDRESS } from "../config";
import NFT_MARKET_ABI from '../abi/NFTMarket.json'
import Modal from './MessageModal';

const BuyButton = ({ nft, onBuySuccess }: { nft: any, onBuySuccess: (nft: any) => void }) => {
    
    const { address } = useAccount();
    const { writeContractAsync, data: hash, error, isPending } = useWriteContract()

    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
        hash,
    })

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

    const handleDelist = async () => {
        try {

            showModal('Unlist NFT', 'Unlisting NFT...', '')
            const buyTx = await writeContractAsync({
                address: NFT_MARKET_ADDRESS,
                abi: NFT_MARKET_ABI,
                functionName: 'unlistNFT',
                args: [nft.contract, nft.tokenId],
            })
            
            showModal('Unlist NFT', 'Unlisting, it may take few minutes.', buyTx)
            await waitForTransactionReceipt(config, { hash: buyTx })
            showModal('Unlist NFT', 'NFT unlist successful', buyTx)

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

    let buttonText = 'Unlist'
    let buttonClass = 'bg-red-500 hover:bg-red-600 text-white'
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
            onClick={handleDelist}
            disabled={isPending || isConfirming}
            className={`w-full bg-red-500 text-white font-medium py-2 px-4 rounded-md hover:bg-red-600 transition-colors duration-200 ${buttonClass}`}
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