import { Input, Button, Widget } from "@web3uikit/core";
import { useState } from "react";
import nftMarketContractAbiJson from './contracts/NFTMarket.json'
import nftContractAbiJson from './contracts/NFT.json'
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseEther, parseUnits } from "viem";


// init 
export function NftListing() {
    const [nftMarketContractAddr, setNftMarketContractAddr] = useState('0xf0E90cd46e97170d7E6E976d30A6e721882Bd450')
    const [nftContractAddr, setNftContractAddr] = useState('0x905278fA586a5852612f271C380905fc9e2FD6a8')
    const [ftContractAddr, setFtContractAddr] = useState('0xa442DC529a293Cf72DccbFb46f929096D591E95d')
    const [tokenId, setTokenId] = useState('1')
    const [price, setPrice] = useState('')

    // 0.3 write contract
    const { data: hash, isPending, writeContract, error } = useWriteContract()

    async function approve() {
        writeContract({
            abi: nftContractAbiJson.abi,
            address: nftContractAddr,
            functionName: 'approve',
            args: [nftMarketContractAddr, tokenId],
        })
        console.log(Date(), 'approve function nftMarketAddr tokenId', nftMarketContractAddr, tokenId)
    }

    async function listing() {
        writeContract({
            abi: nftMarketContractAbiJson.abi,
            address: nftMarketContractAddr,
            functionName: 'listItem',
            args: [nftContractAddr, tokenId, parseEther(price)],
        })
        console.log(Date(), 'NftListing function nftContractAddr tokenId price', nftContractAddr, tokenId, price,parseEther(price))
    }

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({
            hash,
        })


    // 0.1 input data
    // RPC "message": "invalid 1st argument: transaction 'to': value was not valid hexadecimal"
    return (
        <>
            <section style={{ display: 'flex', gap: '20px' }}>
                <Widget
                    title="Step 1">

                    <Input
                        disabled
                        hasCopyButton
                        label="Nft Contract Address"
                        placeholder="0x..."
                        value={nftContractAddr}
                    />
                    <Input
                        disabled
                        hasCopyButton
                        label="Nft Market Address"
                        placeholder="0x..."
                        value={nftMarketContractAddr}
                    />
                    <Input
                        label="Token Id"
                        placeholder="id"
                        value={tokenId}
                        onChange={(e) => {
                            let temp = e.target.value
                            setTokenId(temp)
                            console.log(Date(), 'Nft Approve input onChange tokenId', temp)
                        }}
                    />
                    <div >
                        <Button
                            text={isPending ? 'Confirming...' : 'Approve'}
                            onClick={() => {
                                approve()
                                console.log(Date(), 'approve Button onClick')
                            }}
                        >
                        </Button>
                    </div>
                </Widget>

            </section>
            <section style={{ display: 'flex', gap: '20px' }}>
                <Widget
                    title="Step 2">
                    <Input
                    disabled
                        hasCopyButton
                        label="Nft Contract Address"
                        placeholder="0x..."
                        value={nftContractAddr}
                    />
                    <Input
                        disabled
                        label="Token Id"
                        placeholder="id"
                        value={tokenId}
                    />
                    <Input
                        label="Price"
                        placeholder="1"
                        value={price}
                        onChange={(e) => {
                            let price = e.target.value
                            let priceFormat = parseEther(price)
                            setPrice(price)
                            console.log(Date(), 'NftListing input onChange Price', price,priceFormat)
                        }}
                    />
                    <div>
                        <Button
                            text={isPending ? 'Confirming...' : 'Listing'}
                            onClick={() => {
                                listing()
                                console.log(Date(), 'NftListing Button onClick')
                            }}
                        >
                        </Button>

                    </div>
                </Widget>




            </section>
            <section style={{ display: 'flex', gap: '20px' }}>
                <Widget
                    title="Response">
                    {hash && <div>Transaction Hash: {hash}</div>}
                    {isConfirming && <div>Waiting for confirmation...</div>}
                    {isConfirmed && <div>Transaction confirmed.</div>}
                    {error && (<div>Error: {error.shortMessage || error.message}</div>
                    )}

                </Widget>

            </section>




        </>

    )
}