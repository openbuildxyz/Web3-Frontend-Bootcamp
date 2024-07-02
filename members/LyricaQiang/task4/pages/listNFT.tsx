import { useState } from 'react';
import { getNFTContract } from "../util/index"
import { useAccount } from "wagmi"

const ListNFT = ({click}) => {
    const [addresss, setAddresss] = useState('')
    const [marketAddresss, setMarketAddresss] = useState('')
    const [tokenId, setTokenId] = useState('')
    const [data, setData] = useState('0x0000000000000000000000000000000000000000000000000001c6bf52634000')


    const handleClick = ()=> {
        click({addresss, marketAddresss, tokenId, data})
    }

    return (
        <div className="list-nft padding">
            <input type="text" value={addresss} placeholder="token拥有者地址" onChange={(e) => setAddresss(e.target.value)}/>
            <input type="text" value={marketAddresss} placeholder="NFT Market合约地址" onChange={(e) => setMarketAddresss(e.target.value)}/>
            <input type="text" value={tokenId} placeholder="tokenId" onChange={(e) => setTokenId(e.target.value)}/>
            <input type="text" value={data} placeholder="data" onChange={(e) => setData(e.target.value)}/>
            <button className="button" onClick={handleClick}>上架NFT</button>
        </div>
    );
};

export default ListNFT;