import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import { type NFT } from '../type/NFT';
import { CircleX } from 'lucide-react';
import { useAccount } from 'wagmi';
import { formatUnits, parseUnits } from 'ethers';
import useEthersContract from '../utilities/contract';

export default function ListCollection({onAdd}: {onAdd: (nft: NFT) => void}) {
    const { address, isConnected } = useAccount();
    const [ open, setOpen] = useState<boolean>(false);
    const [ tokenId, setTokenId ] = useState<number>(1);
    const [ price, setPrice ] = useState<string>(formatUnits(200000000n, 6));
    const [ isProcessing, setIsProcessing ] = useState<boolean>(false);
    const TECContract = useEthersContract('NFT', true);
    const MarketContract = useEthersContract('Market', true);
    
    
    const listItem = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            setIsProcessing(true);
            const formattedPrice = parseUnits(price, 6);
            await TECContract.approvePrice(MarketContract.getAddress(), tokenId);
            await MarketContract.listCollection(TECContract.getAddress(), tokenId, formattedPrice);
            const collectionAddress = await TECContract.getAddress();
            if (!address) throw new Error("Owner address can't be undefined");
            onAdd({
                collectionAddress,
                tokenId,
                owner: address,
                price: formattedPrice,
                selling: true
            });
            setOpen(false);
        } catch (error) {
            console.error("Failed to list item: ", error);
        } finally {
            setIsProcessing(false);
        }
        
    }
    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
                <button
                    className='border-2 text-xs p-2 m-2 border-stone-700 rounded-sm enabled:hover:bg-gray-300 disabled:opacity-60'
                    disabled={!isConnected}
                >
                    List Item
                </button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className='bg-zinc-200 opacity-70 fixed inset-0' />
                <Dialog.Content className='bg-white round-sm fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[450px] max-h-[85vh] p-[25px] focus:outline-none'>
                    <Dialog.Title className='m-0 font-weigth-700 text-4'>
                        List Item
                    </Dialog.Title>
                    <Dialog.Description className='mt-2 mb-1 text-gray-500 text-1 leading-1'>
                        List item that you want to sell
                    </Dialog.Description>
                    <form id="listItemForm" onSubmit={listItem} className='m-0 flex flex-col text-1'>
                        <label htmlFor="tokenId">Token ID</label>
                        <input 
                            className="outline-none max-w-[200px]"
                            type="number"
                            id="tokenId"
                            value={tokenId}
                            onChange={(e) => setTokenId(Number(e.target.value))} 
                            required
                        />
                        <label htmlFor="price">Price</label>
                        <input 
                            className="outline-none max-w-[200px]"
                            value={price}
                            type="number"
                            id="price"
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                        <div className="flex justify-end mt-5">
                            <button 
                                className="border-2 text-xs p-2 pt-1 pb-1 m-2 border-stone-700 rounded-sm"
                                type="submit"
                                disabled={isProcessing}
                            >
                                {isProcessing ? 'Listing...' : 'List'}
                            </button>
                        </div>
                    </form>
                    <Dialog.Close asChild>
                        <button className="round-xl h-[25px] w-[25px] absolute right-3 top-3 inline-flex items-center justify-center" aria-label='close'>
                            <CircleX />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}