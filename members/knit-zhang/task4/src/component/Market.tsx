import Item from "./Item";
import { type NFT } from "../type/NFT";
import ListCollection from "./ListCollection";
import { useState } from "react";

export default function Market() {
    const [ NFTs, setNFTs ] = useState<NFT[]>([]);

    const handleDelete = (tokenId: NFT['tokenId']) => {
        setNFTs(NFTs.filter((nft) => nft.tokenId !== tokenId));
    };

    const handleAdd = (nft: NFT) => {
        setNFTs([...NFTs, nft]);
    }
    
    return (
        <>
            <div className='flex flex-col items-center justify-center text-2xl font-mono font-bold mt-5'>
                <h2>Market</h2>
                <ListCollection onAdd={handleAdd} />
            </div>
            <div className="grid grid-cols-3 m-40 mt-4 mb-0 gap-20">
                {NFTs.map((nft) => (
                    <Item key={nft.collectionAddress + nft.tokenId} nft={nft} onDelete={handleDelete} />
                ))}
            </div>
        </>
    );
}