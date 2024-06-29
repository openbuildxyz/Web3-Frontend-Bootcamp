import {
    Dialog,
    DialogContent,
    DialogTrigger,
    useDialogContext
} from "./utils/Dialog.tsx";
import {useState} from "react";
import {useClient, useWriteContract} from "wagmi";
import {BryanMarket, BryanNFT} from "./contracts";
import {waitForTransactionReceipt} from "viem/actions";

export function ListNewButton() {
    return (
        <Dialog>
            <DialogTrigger>
                <button className="bg-blue-500 text-white rounded-xl py-1 px-2">上架我的 NFT</button>
            </DialogTrigger>
            <DialogContent className="Dialog">
                <ListNewForm/>
            </DialogContent>
        </Dialog>
    )
}

function ListNewForm() {
    const {setOpen} = useDialogContext();

    const [nftAddress, setNftAddress] = useState<string>(BryanNFT.address)
    const [nftTokenId, setNftTokenId] = useState('')
    const [pricing, setPricing] = useState('')

    const wagmi = useClient()!;
    const {writeContractAsync} = useWriteContract()

    function handleSubmit() {
        const arg0 = nftAddress as '0x...'
        if (!arg0.startsWith('0x')) {
            alert('Invalid NFT address')
            return
        }

        function tryParseInt(value: string) {
            const parsed = parseInt(value, 10)
            if (isNaN(parsed)) {
                return undefined
            }
            return BigInt(parsed)
        }

        const arg1 = tryParseInt(nftTokenId)!
        if (arg1 === undefined) {
            alert('Invalid NFT token ID')
            return
        }

        const arg2 = tryParseInt(pricing)!
        if (arg2 === undefined) {
            alert('Invalid pricing')
            return
        }

        Promise.resolve().then(async () => {
            return writeContractAsync({
                ...BryanNFT,
                functionName: 'approve',
                args: [BryanMarket.address, arg1]
            }).then(async tx => {
                console.log('approve transaction submitted:', tx)

                const receipt = await waitForTransactionReceipt(wagmi, {hash: tx});
                console.log('approve transaction mined:', receipt);
            })
        }).then(async () => {
            return writeContractAsync({
                ...BryanMarket,
                functionName: 'listingNFT',
                args: [arg0, arg1, arg2]
            }).then((tx) => {
                console.log('listingNFT transaction submitted:', tx)
            })
        }).then(() => {
            alert("Success!")
            setOpen(false)
        }).catch(err => {
            console.log('submit transaction error:', err)
            alert('Error: ' + err.message)
        })
    }

    return (
        <div className="space-y-4">
            <div className="sm:col-span-4">
                <label htmlFor="nft-address" className="block text-sm font-medium leading-6 text-gray-900">
                    NFT 合约地址
                </label>
                <div className="mt-2">
                    <input
                        id="nft-address"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={nftAddress} onChange={e => setNftAddress(e.target.value)}
                    />
                </div>
            </div>

            <div className="sm:col-span-4">
                <label htmlFor="nft-token-id" className="block text-sm font-medium leading-6 text-gray-900">
                    NFT Token ID
                </label>
                <div className="mt-2">
                    <input
                        id="nft-token-id"
                        type="number"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={nftTokenId} onChange={e => setNftTokenId(e.target.value)}
                    />
                </div>
            </div>

            <div className="sm:col-span-4">
                <label htmlFor="pricing" className="block text-sm font-medium leading-6 text-gray-900">
                    价格
                </label>
                <div className="mt-2">
                    <div
                        className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <span
                            className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">BRC$</span>
                        <input
                            id="pricing"
                            type="number"
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            value={pricing} onChange={e => setPricing(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <button className="bg-blue-500 text-white rounded-xl py-1 px-2" onClick={handleSubmit}>提交</button>
        </div>
    )
}