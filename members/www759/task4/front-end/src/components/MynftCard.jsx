import { useEffect, useState } from "react";
import "../css/mynft.css"

const GATEWAY = import.meta.env.VITE_GATEWAY;

export const MynftCard = ({ nft, handleUnList, handleChangePriceSubmit, handleListSubmit }) => {
    const [showFullTokenURI, setShowFullTokenURI] = useState(false);
    const [showChangeInput, setShowChangeInput] = useState(false);
    const [price, setPrice] = useState('');
    const [showListInput, setShowListInput] = useState(false);
    // const [currentPrice, setCurrentPrice] = useState(0);

    // useEffect(() => {
    //     if (nft?.isListed) {
    //         const _currentPrice = await market.
    //     }
    // }, [nft])

    const toggleTokenURI = () => {
        setShowFullTokenURI(!showFullTokenURI);
    };

    const handleClick = () => {
        if (nft.isListed) {
            handleUnList({tokenId: nft.tokenId});
        } else {
            setShowListInput(!showListInput)
        }
    }

    const handlePriceChange = (e) => {
        setPrice(e.target.value)
    }

    const handleChangePrice = () => {
        setShowChangeInput(!showChangeInput);
    }

    const handleCancel = () => {
        setShowListInput(false)
        setShowChangeInput(false)
    }
    

    return (
        <div className="nft-card" key={nft.tokenId}>
            <img 
                src={GATEWAY + nft.image.slice(7)}
            ></img>
            <div className="nft-details">
                <div className="nft-detail-item">
                    <span className="nft-detail-label">Token ID:</span>
                    <span className="nft-detail-value">{nft.tokenId}</span>
                </div>
                {nft.isListed && (
                <div className="nft-detail-item">
                    <span className="nft-detail-label">Price:</span>
                    <span className="nft-detail-value">{nft.price}</span>
                </div>
                )}
                <div className="nft-detail-item">
                    <span className="nft-detail-label">Token URI:</span>
                    <span className={`nft-detail-value ${showFullTokenURI ? "full" : "truncated"}`}>
                        {nft.tokenURI}
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
                <div className="nft-detail-item">
                    <span className="nft-detail-label">Token Description:</span>
                    <span className="nft-detail-value">{nft.description}</span>
                </div>
                
            </div>
            

            {nft.isListed && !showChangeInput && (
                <>
                    <button onClick={() => handleChangePrice()}>changePrice</button>
                    <button onClick={() => handleClick()}>unList</button>
                </>
            )}

            
            {showChangeInput  && (<div id="priceInputDiv">
                <label htmlFor="price"> Please Enter the price</label>
                <input type="text" id="price" value={price} onChange={handlePriceChange}></input>
                <div className="button-group">
                <button onClick={handleCancel}>Cancel</button>
                <button onClick={() => {handleChangePriceSubmit({tokenId: nft.tokenId, price: price})}}>Submit</button>
                </div>
            </div>)
            }

            {!nft.isListed && !showListInput && (
                <button onClick={() => handleClick()}>List</button>
            )}
            {showListInput && (<div id="priceInputDiv">
                <label htmlFor="price">Please Enter the Price</label>
                <input type="text" id="price" value={price} onChange={handlePriceChange}></input>
                <div className="button-group">
                    <button onClick={handleCancel}>Cancel</button>
                    <button onClick={() => {handleListSubmit({tokenId: nft.tokenId, price: price})}}>Submit</button>
                </div>
            </div>)}
        </div>
    )
}

