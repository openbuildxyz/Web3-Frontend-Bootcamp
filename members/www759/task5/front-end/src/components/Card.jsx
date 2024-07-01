import "../css/card.css";
import { useEffect, useState } from "react";


const Card = ({order, handleBuy, address}) => {
    const gateway = import.meta.env.VITE_GATEWAY
    const [showFullSeller, setShowFullSeller] = useState(false);
    const [showFullTokenURI, setShowFullTokenURI] = useState(false);
    const [timestamp, setTimestamp] = useState("");

    useEffect(() => {
        // console.log(order)
        if (order.timestamp) {
            const date = new Date(parseInt(order.timestamp) * 1000);
            const formattedDate = date.toLocaleString();
            setTimestamp(formattedDate);
        }
    }, [order.timestamp])

    const handleClick = () => {
        handleBuy({tokenId: order.tokenId, price: order.price});
    }

    const toggleSeller = () => {
        setShowFullSeller(!showFullSeller);
    };

    const toggleTokenURI = () => {
        setShowFullTokenURI(!showFullTokenURI);
    };

    
    
    return (
        <div className="nft-card">
            { order.image ?
            (<img src={`${gateway}${order.image.slice(7)}`} alt="NFT image"></img>) : 
            (<div>No image available</div>)
            }
            <div className="nft-details">

                <div className="nft-detail-item">
                    <span className="nft-detail-label">Token ID:</span>
                    <span className="nft-detail-value">{order.tokenId.toString()}</span>
                </div>
                <div className="nft-detail-item">
                    <span className="nft-detail-label">Price:</span>
                    <span className="nft-detail-value">{order.price.toString()}</span>
                </div>
                <div className="nft-detail-item">
                    <span className="nft-detail-label">ListTime:</span>
                    <span className="nft-detail-value">{timestamp}</span>
                </div>
                <div className="nft-detail-item">
                    <span className="nft-detail-label">Seller:</span>
                    <span className={`nft-detail-value ${showFullSeller ? "full" : "truncated"}`}>{order.seller}</span>
                    {!showFullSeller && (
                        <button className="toggle-button" onClick={toggleSeller}>
                            ...
                        </button>
                    )}
                    {showFullSeller && (
                        <button className="toggle-button" onClick={toggleSeller}>
                            隐藏
                        </button>
                    )}
                </div>
                
                <div className="nft-detail-item">
                    <span className="nft-detail-label">Token URI:</span>
                    <span className={`nft-detail-value ${showFullTokenURI ? "full" : "truncated"}`}>
                        {order.tokenURI}
                    </span>
                    {!showFullTokenURI && (
                        <button className="toggle-button" onClick={toggleTokenURI}>
                            ...
                        </button>
                    )}
                    {showFullTokenURI && (
                        <button className="toggle-button" onClick={toggleTokenURI}>
                            隐藏
                        </button>
                    )}
                </div>
                { address !== order.seller? 
                (<button className="buy-button" onClick={handleClick}>Buy</button>) : <span className="you-seller">you are seller</span>}
            </div>
        </div>
    )
}

export default Card;