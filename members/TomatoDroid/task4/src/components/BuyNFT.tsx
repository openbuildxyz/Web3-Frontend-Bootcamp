import { FormEvent } from "react"
import { type BaseError,  useWaitForTransactionReceipt, useWriteContract } from "wagmi"
import { NFTExchangeABI, NFT_EXCHANGE_ADDRESS, TOMATO_NFT_ADDRESS, TOMATO_TOKEN_ADDRESS, TomatoTokenABI } from '../abi'
import { parseUnits } from "viem"

export const BuyNFT = () => {
    const { data: hash, writeContractAsync, isPending, error } = useWriteContract()

    const submit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.target as HTMLFormElement)
        const contractAddress = formData.get('contractAddress') as `0x{string}`
        const tokenId = formData.get('tokenId') as string

        await writeContractAsync({
            address: TOMATO_TOKEN_ADDRESS,
            abi: TomatoTokenABI,
            functionName: 'approve',
            args: [NFT_EXCHANGE_ADDRESS, parseUnits('10000', 9)]
        })

        await writeContractAsync({
            address: NFT_EXCHANGE_ADDRESS,
            abi: NFTExchangeABI,
            functionName: 'buyNFT',
            args: [contractAddress, parseUnits(tokenId, 0)]
        })
    }

    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash
    })

    return (
        <form className="border border-gray-700 flex flex-col gap-4 p-2 rounded-sm" onSubmit={submit}>
            <label htmlFor="contractAddress" className="flex">
                <div>合约地址：</div>
                <input
                    className="border border-gray-700 w-110 rounded-sm"
                    name="contractAddress"
                    required
                    defaultValue={TOMATO_NFT_ADDRESS}
                />
            </label>
            <label htmlFor="tokenId" className="flex">
                <div>tokenId：</div>
                <input className="border border-gray-700 w-110 rounded-sm" name="tokenId" required/>
            </label>
            <button 
                className="w-20 h-10 btn-base"
                type="submit"
                disabled={isPending}
            >
                { isPending ? 'buying' : 'BuyNFT' }
            </button>
            {hash && <div>Transaction Hash: {hash}</div>}
            {isConfirming && <div>waiting for confirmation...</div>}
            {isConfirmed && <div>Transaction confirmed.</div>}
            {error && (
                <div className="color-red-700">
                    Error: { (error as BaseError).shortMessage || error.message }
                </div>
            )}
        </form>
    )
}