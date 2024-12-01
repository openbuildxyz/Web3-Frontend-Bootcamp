import { useEffect, useState } from "react";
import { useEthers } from "./EthersContext";
import { ethers, parseUnits, toNumber, formatUnits } from "ethers";
import { fnftAbi } from "../abi/nftAbi";
import { fetchFile } from "../utils/ipfs";
import { marketAbi } from "../abi/marketAbi";
import { MynftCard } from "./MynftCard";

import "../css/mynft.css";
import { Contract } from "ethers";

const MARKET_ADDRESS = import.meta.env.VITE_MARKET_ADDRESS;
const FNFT_ADDRESS = import.meta.env.VITE_FNFT_ADDRESS;

const Mynft = ({address}) => {
    const {provider, signer} = useEthers();
    const [nfts, setNfts] = useState([]);
    const [market, setMarket] = useState(null);

    
    useEffect(() => {
        if (provider) {
            const market = new Contract(MARKET_ADDRESS, marketAbi, signer);
            setMarket(market);
            getAllNFTs();
        }
    },[provider, signer])

    const getAllNFTs = async () => {
        let _nfts = [];
        const nft = new ethers.Contract(FNFT_ADDRESS, fnftAbi, provider);
        const marketReader = new ethers.Contract(MARKET_ADDRESS, marketAbi, provider)

        try {
            let address = await signer.getAddress();
            let balance = await nft.balanceOf(address);
            for (let i = 0; i < balance; i++) {
                let tokenId = await nft.tokenOfOwnerByIndex(address, i.toString());
                let tokenURI = await nft.tokenURI(tokenId);
                if (!tokenURI.startsWith("ipfs")) {
                    console.log(tokenId, "not pin image to ipfs, ignore")
                    continue;
                }
                let isListed = await marketReader.isListed(FNFT_ADDRESS, tokenId)
                let price = 0;
                if (isListed) {
                    let _order = await marketReader.orderOfTokenId(FNFT_ADDRESS, tokenId);
                    price = formatUnits(_order.price, 18);
                }
                let metadata = await fetchFile({cid: tokenURI.slice(7)})
                tokenId = toNumber(tokenId)
                metadata = JSON.parse(metadata)


                _nfts.push({tokenId, tokenURI, isListed, price, ...metadata});
            }
        } catch (error) {
            console.log("get all nfts error:", error);
        }
        setNfts(_nfts);
    }

    const handleListSubmit = async ({tokenId, price}) => {
        try {// 上架
            const _price = parseUnits(price, 18);
            const nftReader = new Contract(FNFT_ADDRESS, fnftAbi, provider);

            let isApprovedForAll = await nftReader.isApprovedForAll(address, MARKET_ADDRESS);
            
            if (!isApprovedForAll) {
                console.log("Set Approval for all")
                const nftWriter = new Contract(FNFT_ADDRESS, fnftAbi, signer);
                let tx = await nftWriter.setApprovalForAll(MARKET_ADDRESS, "true");
                await tx.wait();
            }
            
            let tx = await market.listNFT(FNFT_ADDRESS, tokenId.toString(), _price);
            await tx.wait()

            // await getAllNFTs()
            window.location.reload();
        } catch (error) {
            console.error("list submit error: ", error);
        }
    }

    const handleUnList= async ({tokenId}) => {
        try {
            let tx = await market.unlistNFT(FNFT_ADDRESS, tokenId);
            await tx.wait()

            window.location.reload()
        } catch (error) {
            console.error("unlist submit error: ", error);
        }
    }



    const handleChangePriceSubmit = async ({tokenId, price}) => {
        try {
            const _price = parseUnits(price, 18);
            let tx = await market.changePrice(FNFT_ADDRESS, tokenId, _price);
            await tx.wait()

            window.location.reload()
        } catch (error) {
            console.error("Change price submit error: ", error)
        }
    }

    return (
        <div className="nft-container">
            {nfts.length ? nfts.map((nft) => {
                return (
                    <MynftCard key={nft.tokenId} nft={nft} handleUnList={handleUnList} handleChangePriceSubmit={handleChangePriceSubmit} handleListSubmit={handleListSubmit} ></MynftCard>
                )
            }) : <span className="no-nft">you dont have any NFT</span>}
        </div>
    )
}

export default Mynft;