import Item from "./Item";
import type { NFT } from "../type/NFT";
import ListCollection from "./ListCollection";
import { useState, useEffect } from "react";
import useEthersContract from "../utilities/contract";

export default function Market() {
    const [ NFTs, setNFTs ] = useState<NFT[]>([]);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [isFetching, setIsFetching] = useState<boolean>(true);
    const MarketContract = useEthersContract('Market');

    const handleAdd = (nft: NFT) => {
        setNFTs([...NFTs, nft]);
    }

    const handleDelete = (tokenId: NFT['tokenId']) => {
        setNFTs(NFTs.filter((nft) => nft.tokenId !== tokenId));
    }

    MarketContract.addListener('ListCollection', async (tokenId) => {
        const newNFTs = await MarketContract.getItem(Number(tokenId));
        newNFTs.wait();
        setNFTs([...NFTs, newNFTs]);
    });
    
    useEffect(() => {
        async function fetchNFTs() {
            try {
                setIsFetching(true);
                const collectionList: NFT['tokenId'][] = await MarketContract.getListedItem();
                const nftArray: NFT[] = await Promise.all(
                    collectionList.map(async (tokenId) => {
                        const item =  await MarketContract.getItem(Number(tokenId));
                        const returnItem: NFT = {
                            collectionAddress: item[0],
                            tokenId: Number(item[1]),
                            listTimestamp: Number(item[2]),
                            owner: item[3],
                            price: item[4],
                            selling: item[5],
                        }
                        return returnItem
                    })
                );
                setNFTs(nftArray);
            } catch (error) {
                console.error("Failed to fetch NFTs: ", error);
            } finally {
                setIsFetching(false);
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
                <ListCollection onAdd={handleAdd} isProcessing={isProcessing} setIsProcessing={setIsProcessing} />
            </div>
            {isFetching ? (
                <div className="flex justify-center items-center h-96">
                    <span>Fetching NFTs...</span>
                </div>
            ): (
                <div className="grid grid-cols-3 mx-80 mt-4 mb-0 gap-40">
                    {NFTs.map((nft) => (
                        <Item key={nft.collectionAddress + nft.tokenId} nft={nft} isProcessing={isProcessing} setIsProcessing={setIsProcessing} onDelete={handleDelete} />
                    ))}
                </div>
            )}
            
        </>
    );
}