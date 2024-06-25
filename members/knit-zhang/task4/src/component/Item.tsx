import { type NFT } from '../type/NFT';
import { useState } from 'react';

import Button from './Button';
export default function Item({ nft, onDelete }: { nft: NFT, onDelete: (tokenId: NFT['tokenId']) => void }) {
    const [address] = useState<`0x${string}`>('0x0000000');
    const [isConnected] = useState<boolean>(true);
    const ownedItem: boolean = nft.owner === address;
    const [isProcessing, setIsProcessing] = useState<boolean>(false);

    const handleUnlistItem = async () => {
        try {
            setIsProcessing(true);
            console.log('unlist item')
            onDelete(nft.tokenId);
        } catch (error) {
            console.error("Failed to unlist item: ", error);
        } finally {
            setIsProcessing(false);
        }
    }

    const handleBuyItem = async () => {
        try {
            setIsProcessing(true);
            console.log('buy item')
            onDelete(nft.tokenId);
        } catch(error) {
            console.error("Failed to buy item: ", error);
        } finally {
            setIsProcessing(false);
        }
    }
    
    return (
        <div className='flex flex-col font-mono items-center border-2 border-stone-700 rounded-md m-2 p-2'>
            <h2>{nft.tokenId}</h2>
            <p>{Number(nft.price) / 10 ** 6}TEN</p>
            <div>{nft.owner}</div>
            <div>
                { ownedItem ? (
                    <Button disabled={!isConnected || isProcessing || !nft.selling} onClick={handleUnlistItem}>
                        {nft.selling && (isProcessing ? 'Unlisting...' : 'Unlist') || 'Owned'}
                    </Button>
                ) : ( 
                    <Button disabled={!isConnected || isProcessing || !nft.selling} onClick={handleBuyItem}>
                        {nft.selling && (isProcessing ? 'Buying...' : 'Buy') || 'Sold out'}
                    </Button>
                )}
            </div>
        </div>
    );
}