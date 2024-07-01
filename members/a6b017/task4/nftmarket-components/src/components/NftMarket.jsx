// dependences auto 
import { useReadContract } from "wagmi";
import nftMarketContractAbiJson from './contracts/NFTMarket.json'
import { Card, Information, Widget, Button, Input, Typography } from "@web3uikit/core";
import { formatEther, formatUnits,zeroAddress  } from 'viem';
import { useState } from "react";

// init use static data to make sure the workfolow is correct 240625
// v1 need to update contract 
export default function NFTMarket() {
    // 0.1 define the contract address  
    const [nftMarketContractAddr, setNftMarketContractAddr] = useState('0xf0E90cd46e97170d7E6E976d30A6e721882Bd450')
    const [nftContractAddr, setNftContractAddr] = useState('0x905278fA586a5852612f271C380905fc9e2FD6a8')
    const [ftContractAddr, setFtContractAddr] = useState('0xa442DC529a293Cf72DccbFb46f929096D591E95d')
    const [tokenId, setTokenId] = useState('1')



    // 0.3 Problem Uncaught TypeError: contract.abi.filter is not a function at getAbiItem
    // solution1: wagmi abi input type define the contract abi
    //            const nftMarketContractAbi = JSON.parse(JSON.stringify(nftMarketContractAbiJson))
    // solution2: find the real problem and fix it
    //            nftMarketContractAbiJson.abi
    // 0.2 read the contract
    const { status, data, error } = useReadContract({
        abi: nftMarketContractAbiJson.abi,
        address: nftMarketContractAddr,
        functionName: 'getAllListing',
        args: [],
    })

    console.log(Date(), status, data, error)


    // 0.4 show the info of the result use nftcard
    /*let nftInfo = {
        tokenName: 'Mountain',
        tokenOwner: data?.seller,
        tokenPrice: formatPrice(data),
        tokenId: tokenId,
    }

    function formatPrice(data) {
        if (data === undefined) {
            return 0
        }  
        return formatEther(data.price)
    }*/


    return (
        <>
            <section style={{ display: 'flex', gap: '10px' }}>
                <Widget
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Input
                        width='800px'
                        disabled
                        hasCopyButton
                        label="Nft Market Contract Address"
                        placeholder="0x..."
                        value={nftMarketContractAddr}
                    />
                </Widget>


            </section>

            <section style={{ display: 'flex', gap: '10px' }}>
                {data?.map((listing, index) => {
                    if (listing.nftContractAddr === zeroAddress) {
                        return null
                    }
                    return (
                        <Card
                            key={index}
                        >
                            <p>nftAddr: <Typography copyable>{listing.nftContractAddr}</Typography></p>
                            <p>tokenId: {String(listing.tokenId)}</p>
                            <p>seller: <Typography copyable>{listing.seller}</Typography></p>
                            <p>price: {formatEther(listing.price) + ' USDx'}</p>
                            <p>listedTime:  {String(new Date(Number(listing.listedTime) * 1000))}</p>
                        </Card>
                    )
                })}
            </section>
        </>
    )
}

/*
    const getEllipsisTxt = (str, n = 6) => {
        if (str) {
            return `${str.slice(0, n)}...${str.slice(str.length - n)}`;
        }
        return '';
    };
*/