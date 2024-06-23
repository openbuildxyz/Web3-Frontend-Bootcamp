import { FormEvent } from "react"
import { type BaseError, useWaitForTransactionReceipt, useWriteContract } from "wagmi"
import { NFTExchangeABI, NFT_EXCHANGE_ADDRESS, TOMATO_NFT_ADDRESS, TomatoNFTABI } from '../abi'
import { parseUnits } from "viem"

export const ListNFT = () => {
    const { data: hash, writeContractAsync, isPending, error } = useWriteContract()

    const submit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        await writeContractAsync({
            address: TOMATO_NFT_ADDRESS,
            abi: TomatoNFTABI,
            functionName: 'setApprovalForAll',
            args: [NFT_EXCHANGE_ADDRESS, true],
        })

        const formData = new FormData(e.target as HTMLFormElement)
        const contractAddress = formData.get('contractAddress') as `0x{string}`
        const tokenId =  parseUnits(formData.get('tokenId') as string, 0)
        const price = parseUnits(formData.get('price') as string, 9)
        await writeContractAsync({
            address: NFT_EXCHANGE_ADDRESS,
            abi: NFTExchangeABI,
            functionName: 'listNFT',
            args: [contractAddress, tokenId, price]
        })
    }

    // isApprovedForAll TomatoNFT

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
            <label htmlFor="price" className="flex">
                <div>价格：</div>
                <input className="border border-gray-700 w-110 rounded-sm" name="price" required/>
            </label>
            <button 
                className="w-20 h-10 btn-base"
                type="submit"
                disabled={isPending}
            >
                { isPending ? 'listing' : 'ListNFT' }
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