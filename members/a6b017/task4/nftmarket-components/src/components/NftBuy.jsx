import { Input, Button, Widget } from "@web3uikit/core";
import { useState } from "react";
import nftMarketContractAbiJson from './contracts/NFTMarket.json'
import nftContractAbiJson from './contracts/NFT.json'
import ftContractAbiJson from './contracts/FT.json'
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseUnits, parseEther } from "viem";


// init 
export function NftBuy() {

    // 0.2 define state
    const [nftMarketContractAddr, setNftMarketContractAddr] = useState('0xf0E90cd46e97170d7E6E976d30A6e721882Bd450')
    const [nftContractAddr, setNftContractAddr] = useState('0x905278fA586a5852612f271C380905fc9e2FD6a8')
    const [ftContractAddr, setFtContractAddr] = useState('0xa442DC529a293Cf72DccbFb46f929096D591E95d')
    const [prePaid, setPrePaid] = useState('')
    const [price, setPrice] = useState('')
    const [tokenId, setTokenId] = useState('')

    // 0.3 write contract
    const { data: hash, isPending, writeContract, error } = useWriteContract()

    async function ftApprove() {
        writeContract({
            abi: ftContractAbiJson.abi,
            address: ftContractAddr,
            functionName: 'approve',
            args: [nftMarketContractAddr, parseEther(prePaid)],
        })
        console.log(Date(), 'ftApprove function nftMarketAddr prePaid', nftMarketContractAddr, prePaid, parseEther(prePaid))
    }

    async function nftBuy() {
        writeContract({
            abi: nftMarketContractAbiJson.abi,
            address: nftMarketContractAddr,
            functionName: 'buyItem',
            args: [ftContractAddr, nftContractAddr, tokenId],
        })
        console.log(Date(), 'nftBuy function ftContractAddr, nftContractAddr,tokenId, price', ftContractAddr, nftContractAddr, tokenId)
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
                        label="Ft Contract Address"
                        placeholder="0x..."
                        value={ftContractAddr}
                    />
                    <Input
                        disabled
                        hasCopyButton
                        label="Nft Market Address"
                        placeholder="0x..."
                        value={nftMarketContractAddr}
                    />
                    <Input
                        label="Pre Paid (USDx)"
                        placeholder="number"
                        value={prePaid}
                        onChange={(e) => {

                            let temp = e.target.value
                            let temp1 = parseEther(temp)
                            setPrePaid(temp)
                            console.log(Date(), 'FT Approve input onChange', temp, temp1)
                        }}
                    />
                    <div >
                        <Button
                            text={isPending ? 'Confirming...' : 'Approve'}
                            onClick={() => {
                                ftApprove()
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
                        label="Token Id"
                        placeholder="id"
                        value={tokenId}
                        onChange={(e) => {
                            setTokenId(e.target.value)
                            console.log(Date(), 'TokenId', tokenId)
                        }}
                    />
                    <Input
                        label="Price (USDx)"
                        placeholder="1"
                        onChange={(e) => {
                            let price = e.target.value
                            let priceFormat = parseEther(price)
                            setPrice(price)
                            console.log(Date(), 'NftBuy input onChange', price, priceFormat)
                        }}
                    />
                    <div>
                        <Button
                            text={isPending ? 'Confirming...' : 'Buy'}
                            onClick={() => {
                                nftBuy()
                                console.log(Date(), 'NftBuy Button onClick')
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