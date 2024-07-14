import { useEffect, useState } from "react";
import { Contract, parseUnits } from "ethers";
import { useLocation } from "react-router-dom";
import { fnftAbi } from "../abi/nftAbi";
import { useEthers } from "./EthersContext";
import  Card  from './Card';
import { fetchFile } from "../utils/ipfs";
import { marketAbi } from "../abi/marketAbi";
import '../css/collection.css'
import { tokenAbi } from "../abi/tokenAbi";


const MARKET_ADDRESS = import.meta.env.VITE_MARKET_ADDRESS;
const FCOIN_ADDRESS = import.meta.env.VITE_FCOIN_ADDRESS;

const Collection = ({updateBalance}) => {
    const [address, setAddress] = useState('');
    const location = useLocation();
    const { provider, signer } = useEthers();
    const { FNFT_ADDRESS, orders: initialOrders } = location.state || {};
    const [ nft, setNft] = useState(null);
    const [orders, setOrders] = useState(initialOrders);
    const [nftName, setNftName] = useState('');

    useEffect(() => {
        if (provider) {
            const nftContract = new Contract(FNFT_ADDRESS, fnftAbi, provider);
            setNft(nftContract);
        }
    }, [provider]);

    useEffect(() => {
        getAddress()
    }, [signer, FNFT_ADDRESS])
    

    useEffect(() => {
        if (nft) {
            getNftInfo();
            getNftName();
        }
    }, [nft]);

    const getNftInfo = async() => {
        let updateOrders = [...orders]
        for (let i = 0; i < orders.length; i++) {
            try {
                let tokenURI = await nft.tokenURI(updateOrders[i].tokenId)
                let metadata = await fetchFile({cid: tokenURI.slice(7)})
                metadata = JSON.parse(metadata)
                updateOrders[i] = {...updateOrders[i], ...metadata, 'tokenURI': tokenURI}
            } catch(error) {
                console.log(`get nft info error: ${error.message}`);
            }
        }
        setOrders(updateOrders)
    }

    const getNftName = async() => {
        try{
            let _name = await nft.name();
            setNftName(_name);
        } catch(error) {
            console.log(`getNftName error: ${error.message}`)
        }
    }

    const getAddress = async () => {
        if (signer) {
            try{
                const address = await signer.getAddress();
                setAddress(address)
            } catch(error) {
                console.log(`get Address error: ${error.message}`)
            }
        }
    }

    const handleBuy = async ({tokenId, price}) => {
        const market = new Contract(MARKET_ADDRESS, marketAbi, signer);
        const tokenReader = new Contract(FCOIN_ADDRESS, tokenAbi, provider);
        
        let _price = parseUnits(price);
        try {
            let balance = await tokenReader.balanceOf(address);
            if (balance < _price) {
                alert("balance not enough");
                return;
            }

            let allowance = await tokenReader.allowance(address, MARKET_ADDRESS);
            if (allowance <= _price) {
                const tokenWriter = new Contract(FCOIN_ADDRESS, tokenAbi, signer);
                let tx = await tokenWriter.approve(MARKET_ADDRESS, _price);
                await tx.wait()
            }
            
            let tx = await market.buy(FNFT_ADDRESS, tokenId);
            await tx.wait()

            const updatedOrders = orders.filter(order => order.tokenId !== tokenId);
            console.log(updatedOrders)
            setOrders(updatedOrders);

            updateBalance();
        } catch(error) {
            alert(`buy nft failed, error: ${error.message}`)
        }
        // await getNftInfo()
    }

    return (
        <div className="collection">
            <p className="nft-name">{nftName}</p>
            <p className="contract-address">{ FNFT_ADDRESS }</p>
            {orders.map(order => {
                return (
                    <Card key={order.tokenId} order={order} handleBuy={handleBuy} address={address}></Card>
                )
            })}
        </div>
    )
}

export default Collection;