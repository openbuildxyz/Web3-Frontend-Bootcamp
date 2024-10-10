import { FormEvent } from "react"
import { type BaseError, useWaitForTransactionReceipt, useWriteContract } from "wagmi"
import { TOMATO_NFT_ADDRESS, TomatoNFTABI } from '../abi'

export const MintNFT = () => {
    const { data: hash, writeContract, isPending, error } = useWriteContract()

    const submit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const to = formData.get('address') as `0x{string}`
        writeContract({
            address: TOMATO_NFT_ADDRESS,
            abi: TomatoNFTABI,
            functionName: 'mint',
            args: [to]
        })
    }

    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash
    })

    return (
        <form className="border border-gray-700 flex flex-col gap-4 p-2 rounded-sm" onSubmit={submit}>
            <label htmlFor="address" className="flex">
                <div>地址：</div>
                <input className="border border-gray-700 w-110 rounded-sm" name="address" placeholder="0x...." required/>
            </label>
            <button 
                className="w-20 h-10 btn-base"
                type="submit"
                disabled={isPending}
            >
                { isPending ? 'minting' : 'MintNFT' }
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