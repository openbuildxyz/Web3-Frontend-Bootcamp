
import { useState } from "react";
import { Input, Button } from 'antd';
import { getMarketContract, getNFTContract, getTokenContract } from "@/config/contract";

export default function Home() {
    const [tokenId, setTokenId] = useState<string>("");
    const [price, setPrice] = useState<number>();
    const [listId, setListId] = useState<number>();




    const listNFT = async () => {
        const { contract, signer } = await getMarketContract();
        await contract.connect(signer).listNFT('0x6F817c5d3ccd451fd38B4cB77E78d85FD1F0810d', tokenId, price);
    };

    const buyNFT = async () => {

        const { contract: market, signer: signMar } = await getMarketContract();
        const { contract: token, signer: signTok } = await getTokenContract();
        const { contract: nft, signer: signNft } = await getNFTContract()
        await token.connect(signTok).approval("0x804D1F8eDcd0dC5F87D25F2B36D0655a7CABf50A", 1000);
        await nft.connect(signNft).setApprovalForAll("0x804D1F8eDcd0dC5F87D25F2B36D0655a7CABf50A", true);
        await market.connect(signMar).buyNFT(listId);
    };


    return (
        <div>
            <div className="w-80 rounded">

                {/* <Input /> */}
                <Input placeholder=" tokenid " value={tokenId} onChange={e => setTokenId(e.target.value)} />

                <Input placeholder=" price " type="number" value={price} onChange={e => setPrice(Number(e.target.value))} />
                <Button type="primary" onClick={listNFT}>上架 NFT</Button>

                <Input placeholder=" listid " type="number" value={listId} onChange={e => setListId(Number(e.target.value))} />

                <Button type="primary" onClick={buyNFT}>购买 NFT</Button>

            </div>
        </div>
    )
}




