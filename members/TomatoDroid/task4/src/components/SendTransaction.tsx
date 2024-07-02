import { FormEvent } from "react"
import { type BaseError, useSendTransaction, useWaitForTransactionReceipt } from "wagmi"
import { parseEther } from 'viem'

export const SendTransAction = () => {
    const { data: hash, sendTransaction, isPending, error } = useSendTransaction()

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const to = formData.get('address') as `0x${string}`
        const value = formData.get('value') as string
        sendTransaction({ to, value: parseEther(value) })
    }

    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash
    })
    
    return (
        <form onSubmit={submit}>
            <input name="address" placeholder="0x...." required />
            <input name="value" placeholder="0.05" required />
            <button type="submit" disabled={isPending}>
                { isPending ? 'confirming...' : 'Send' }
            </button>
            { hash && <div>transaction Hash: {hash}</div> }
            { isConfirming && <div>Waiting for confirmation...</div> }
            { isConfirmed && <div>Transaction confirmed</div> }
            { error && <div>Error: {(error as BaseError).shortMessage || error.message}</div> }
        </form>
    )
}