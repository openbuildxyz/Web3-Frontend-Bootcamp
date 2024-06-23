import Item from "./Item";
import { type NFT } from "../type/NFT";
import ListCollection from "./ListCollection";
import { useState, useEffect } from "react";
import useEthersContract from "../utilities/contract";
import SwitchView from "./SwitchView";

export default function Market() {
    const [ NFTs, setNFTs ] = useState<NFT[]>([]);
    const [ viewSoldout, setViewSoldout ] = useState<boolean>(true);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const MarketContract = useEthersContract('Market');
    const optionalNFTs: NFT[] = viewSoldout ? NFTs : NFTs.filter((nft) => nft.selling);

    const handleDelete = (tokenId: NFT['tokenId']) => {
        setNFTs(NFTs.filter((nft) => nft.tokenId !== tokenId));
    };

    const handleAdd = (nft: NFT) => {
        setNFTs([...NFTs, nft]);
    }
    
    useEffect(() => {
        async function fetchNFTs() {
            try {
                setIsProcessing(true);
                const collectionList: NFT['tokenId'][] = await MarketContract.getListedItem();
                const nftArray: NFT[] = await Promise.all(
                    collectionList.map(async (tokenId) => {
                        console.log(Number(tokenId));
                        const item =  await MarketContract.getItem(Number(tokenId));
                        return {
                            collectionAddress: item[0],
                            tokenId: Number(item[1]),
                            owner: item[2],
                            price: item[3],
                            selling: item[4]
                        }
                    })
                );
                setNFTs(nftArray);
                console.log(nftArray);
            } catch (error) {
                console.error("Failed to fetch NFTs: ", error);
            } finally {
                setIsProcessing(false);
            }
        }
        fetchNFTs();
        return () => {
            setNFTs([]);
        }
    }, []);
    return (
        <>
            <div className='flex flex-col items-center justify-center text-2xl font-mono font-bold mt-5'>
                <h2>Market</h2>
                <ListCollection onAdd={handleAdd} />
                <SwitchView checked={viewSoldout} setChecked={setViewSoldout}/>
            </div>
            {isProcessing ? (
                <div className="flex justify-center items-center h-96">
                    <span>Fetching NFTs...</span>
                </div>
            ): (
                <div className="grid grid-cols-3 m-40 mt-4 mb-0 gap-20">
                    {optionalNFTs.map((nft) => (
                        <Item key={nft.collectionAddress + nft.tokenId} nft={nft} onDelete={handleDelete} />
                    ))}
                </div>
            )}
            
        </>
    );
}