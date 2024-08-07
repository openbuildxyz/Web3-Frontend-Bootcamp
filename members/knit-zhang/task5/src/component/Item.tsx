import type { NFT } from '../type/NFT';
import { useAccount } from 'wagmi';
import { formatUnits } from 'ethers';
import Address from './Address';
import Button from './Button';
import useEthersContract from '../utilities/contract';
import Collection from './Collection';
export default function Item({ nft, isProcessing, setIsProcessing, onDelete }: { nft: NFT, isProcessing: boolean, setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>, onDelete: (tokenId: NFT['tokenId']) => void }) {
    const { address, isConnected } = useAccount();
    const ownedItem: boolean = nft.owner === address;
    const TENContract = useEthersContract('Token', true);
    const MarketContract = useEthersContract('Market', true);
    const TECContract = useEthersContract('NFT', true);

    const handleUnlistItem = async () => {
        try {
            setIsProcessing(true);
            await MarketContract.unlistCollection(await TECContract.getAddress(), nft.tokenId);
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
            const approveToken = await TENContract.approveForMarket(await MarketContract.getAddress(), nft.price);
            await approveToken.wait();
            const buyNFT = await MarketContract.buyCollection(await TECContract.getAddress(), nft.tokenId);
            await buyNFT.wait();
            onDelete(nft.tokenId);
        } catch(error) {
            console.error("Failed to buy item: ", error);
        } finally {
            setIsProcessing(false);
        }
    }
    
    return (
        <div className='flex flex-col font-mono items-center border-2 border-stone-700 rounded-md m-2 p-2 max-w-48'>
            <Collection tokenId={nft.tokenId} />
            <p>{formatUnits(nft.price, 6)}TEN</p>
            <Address address={nft.owner} />
            <div>{nft.listTimestamp === 0 ? null : new Date(nft.listTimestamp).toLocaleString()}</div>
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