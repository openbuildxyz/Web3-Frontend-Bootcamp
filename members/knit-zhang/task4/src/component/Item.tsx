import { type NFT } from '../type/NFT';
import { useAccount } from 'wagmi';
import { useState } from 'react';
import { formatUnits } from 'ethers';
import Address from './Address';
import Button from './Button';
import useEthersContract from '../utilities/contract';
export default function Item({ nft, onDelete }: { nft: NFT, onDelete: (tokenId: NFT['tokenId']) => void }) {
    const { address, isConnected } = useAccount();
    const ownedItem: boolean = nft.owner === address;
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const TENContract = useEthersContract('Token', true);
    const MarketContract = useEthersContract('Market', true);
    const TECContract = useEthersContract('NFT', true);

    const handleUnlistItem = async () => {
        try {
            setIsProcessing(true);
            await MarketContract.unlistCollection(await MarketContract.getAddress(), nft.tokenId);
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
            await TENContract.approveForMarket(await MarketContract.getAddress(), nft.price);
            await MarketContract.buyCollection(await TECContract.getAddress(), nft.tokenId);
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
            <p>{formatUnits(nft.price, 6)}TEN</p>
            <Address address={nft.owner} />
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