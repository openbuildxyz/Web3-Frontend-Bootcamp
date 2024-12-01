import { useState } from 'react';
import {useAccount} from "wagmi";
import {getTokenContract, getMarketContract} from "../util/index"
import AllNFT from './allNFT';

const BuyNFT = ({allNFTList, click}) => {
    const [tokenId, setTokenId] = useState('')

        
    const handleClick = ()=> {
        click(tokenId)
    }

    return (
        <div>
            <div className="buy-nft padding">
                <input type="text" value={tokenId} placeholder="tokenId" onChange={(e) => setTokenId(e.target.value)}/>
                <button className="button" onClick={handleClick}>购买NFT</button>
            </div>
            <AllNFT list={allNFTList} />
        </div>
    );
};

export default BuyNFT;