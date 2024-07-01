import { Contract, toNumber, formatUnits } from 'ethers';
import { marketAbi } from '../abi/marketAbi';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEthers } from './EthersContext';
import '../css/home.css'
// import "dotenv/config";

const FNFT_ADDRESS = import.meta.env.VITE_FNFT_ADDRESS;
const MARKET_ADDRESS = import.meta.env.VITE_MARKET_ADDRESS;

const Home = () => {
    const { provider } = useEthers();
    const [market, setMarket] = useState(null);
    const [orderLength, setOrderLength] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (provider) {
            getContract()
        }
    }, [provider])

    const getContract = async () => {
        const marketContract = new Contract(MARKET_ADDRESS, marketAbi, provider);
        let _orderLength = await marketContract.getOrderLength(FNFT_ADDRESS);
        
        setMarket(marketContract);
        setOrderLength(toNumber(_orderLength));
    }

    const handleClick = async () => {
        console.log('handleClick')
        let orders = await market.getAllOrders(FNFT_ADDRESS);
        console.log(orders)
        orders = orders.map(order => ({
            contractAddress: order[0],
            tokenId: toNumber(order[1]),
            seller: order[2],
            price: formatUnits(order[3], 18),
            timestamp: order[4].toString()
        }))
        navigate('/collection', {state: { FNFT_ADDRESS, orders }});
    }


    return (
        <div className="collections">
            <button className="collection-button" onClick={handleClick}>
                FNFT 订单数: {orderLength}
            </button>
        </div>
    )
}

export default Home;