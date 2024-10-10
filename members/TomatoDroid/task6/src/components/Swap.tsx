import { Popover, Input, Radio, RadioChangeEvent, Modal, message } from 'antd';
import {
    ArrowDownOutlined,
    DownOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import { ChangeEvent, useEffect, useState } from 'react';
import tokenList from "../tokenList.json";
import { Pair, Route, Trade } from '@uniswap/v2-sdk';
import { BigintIsh, ChainId, CurrencyAmount, Percent, Token, TradeType } from '@uniswap/sdk-core';
import { ethers } from 'ethers';
import { uniswapV2Pair, uniswapV2Router02 } from '../resouse';
import { useAccount, useWriteContract, BaseError } from 'wagmi';
import { parseUnits } from 'ethers/lib/utils';

const APPROVE_ABI = [{
"inputs": [
    {
    "internalType": "address",
    "name": "spender",
    "type": "address"
    },
    {
    "internalType": "uint256",
    "name": "value",
    "type": "uint256"
    }
],
"name": "approve",
"outputs": [
    {
    "internalType": "bool",
    "name": "",
    "type": "bool"
    }
],
"stateMutability": "nonpayable",
"type": "function"
}] as const;

type TokenProps = typeof tokenList[0]

const SEPOLIA_PROVIDER_URI = `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`;

const uniswapV2Router02Address = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"

export const Swap = () => {
    const {address: accountAddress} = useAccount()
    const [slippage, setSlippage] = useState(2.5)
    const [changeToken, setChangeToken] = useState(1)
    const [isOpen, setIsOpen] = useState(false)
    const [tokenOne, setTokenOne] = useState(tokenList[0])
    const [tokenTwo, setTokenTwo] = useState(tokenList[1])
    const [tokenOneAmount, setTokenOneAmount] = useState<string | undefined>()
    const [tokenTwoAmount, setTokenTwoAmount] = useState<string | undefined>()
    const [prices, setPrices] = useState<{
        tokenOne: string,
        tokenTwo: string,
        radio: string
    }>()

    const {writeContractAsync} = useWriteContract()
        
    const handleSlippageChange = (e: RadioChangeEvent) => {
        setSlippage(e.target.value)
    }
    
    function openModal(asset: number) {
        setChangeToken(asset)
        setIsOpen(true)
    }

    function modifyToken(i: number) {
        setPrices(undefined)
        setTokenOneAmount(undefined)
        setTokenTwoAmount(undefined)
        if (changeToken === 1) {
            setTokenOne(tokenList[i])
            fetchPrices(tokenList[i], tokenTwo)
        } else {
            setTokenTwo(tokenList[i])
            fetchPrices(tokenOne, tokenList[i])
        }
        setIsOpen(false)
    }

    function changeAmount(e: ChangeEvent<HTMLInputElement>) {
        setTokenOneAmount(e.target.value)
        if(e.target.value && prices){
            setTokenTwoAmount((Number(e.target.value) * Number(prices.radio)).toFixed(6))
        }else{
            setTokenTwoAmount(undefined);
        }
    }

    function switchTokens() {
        setTokenOneAmount(undefined)
        setTokenTwoAmount(undefined)
        setTokenOne(tokenTwo)
        setTokenTwo(tokenOne)
        fetchPrices(tokenTwo, tokenOne)
    }

    async function fetchPrices(one: TokenProps, two: TokenProps) {
        const tokenOne = new Token(ChainId.MAINNET, one.address, one.decimals)
        const tokenTwo = new Token(ChainId.MAINNET, two.address, two.decimals)
        const pair = await createPair(tokenOne, tokenTwo);
        const route = new Route([pair], tokenOne, tokenTwo)

        const priceOne = route.midPrice.toSignificant(6)
        const priceTwo = route.midPrice.invert().toSignificant(6)
        const radio = priceOne;
        setPrices({
            tokenOne: priceOne,
            tokenTwo: priceTwo,
            radio,
        })
    }

    async function createPair(tokenOne: Token, tokenTwo: Token): Promise<Pair> {
        const pairAddress = Pair.getAddress(tokenOne, tokenTwo)
        const provider = new ethers.providers.JsonRpcProvider(SEPOLIA_PROVIDER_URI);
        // uniswapV2address 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D
        const pairContract = new ethers.Contract(pairAddress, uniswapV2Pair, provider)
        const reserves = await pairContract["getReserves"]()
        const [reserve0, reserve1] = reserves
        const tokens = [tokenOne, tokenTwo]
        const [token0, token1] = tokens[0].sortsBefore(tokens[1]) ? tokens : [tokens[1], tokens[0]]
        /** 
         * 
         * ethers v6版本会导致CurrencyAmount.fromRawAmount报错 Cannot convert x to a BigInt
        */
        const pair = new Pair(CurrencyAmount.fromRawAmount(token0, reserve0), CurrencyAmount.fromRawAmount(token1, reserve1))
        return pair
    }

    useEffect(() => {
        fetchPrices(tokenOne, tokenTwo)
    }, [])

    async function fetchDexSwap() {
        if (!tokenOneAmount || !accountAddress || !tokenTwoAmount) {
            return
        }
        message.destroy()
        try {
            const one = new Token(ChainId.SEPOLIA, tokenOne.address, tokenOne.decimals)
            const two = new Token(ChainId.SEPOLIA, tokenTwo.address, tokenTwo.decimals)
            // const pair = await createPair(one, two)
            const amountOne = parseUnits(tokenOneAmount, tokenOne.decimals) as unknown as BigintIsh
            const amountTwo = parseUnits(tokenTwoAmount, tokenTwo.decimals) as unknown as BigintIsh
            const pair = new Pair(CurrencyAmount.fromRawAmount(one, amountOne), CurrencyAmount.fromRawAmount(two, amountTwo))

            const route = new Route([pair], one, two)

            const amountIn = parseUnits(tokenOneAmount, tokenOne.decimals) as any
            
            const trade = new Trade(route, CurrencyAmount.fromRawAmount(one, amountIn), TradeType.EXACT_INPUT)

            const slippageTolerance = new Percent(slippage * 100, '10000') // 50 bips, or 0.50%

            const amountOutMin = trade.minimumAmountOut(slippageTolerance).toExact() // needs to be converted to e.g. decimal string
            const path = [one.address, two.address] as `0x${string}`[]
            const to = accountAddress // should be a checksummed recipient address
            const deadline = Math.floor(Date.now() / 1000) + 60 * 20 // 20 minutes from the current Unix time
            // const value = trade.inputAmount.toExact() // // needs to be converted to e.g. decimal string

            await writeContractAsync({
                address: one.address as `0x${string}`,
                abi: APPROVE_ABI,
                functionName: 'approve',
                args: [uniswapV2Router02Address, amountIn]
            })

            const txHash = await writeContractAsync({
                address: uniswapV2Router02Address,
                abi: uniswapV2Router02,
                functionName: "swapExactTokensForTokens",
                args: [amountIn as bigint ,BigInt(amountOutMin), path, to, BigInt(deadline)]
            })
            message.success(`contract hash: ${txHash}`)
        } catch (error) {
            message.error((error as BaseError).shortMessage)
        }
    }

    const settings = (
        <>
            <div>Slippage Tolerance</div>
            <div>
                <Radio.Group value={slippage} onChange={handleSlippageChange}>
                    <Radio.Button value={0.5}>0.5%</Radio.Button>
                    <Radio.Button value={2.5}>2.5%</Radio.Button>
                    <Radio.Button value={5}>5.0%</Radio.Button>
                </Radio.Group>
            </div>
        </>
    )

    return (
        <>
            <Modal
                open={isOpen}
                footer={null}
                onCancel={() => setIsOpen(false)}
                title="Select a token"
            >
                <div className='border-t border-[#363e54] mt-5 flex flex-col gap-[10px]'>
                    {
                        tokenList.map((e, i) => (
                            <div
                                className='flex justify-start items-center px-5 py-3 hover:bg-[#1f2639] hover:cursor-pointer'
                                key={i}
                                onClick={() => modifyToken(i)}
                            >
                                <img className='w-10 h-10' src={e.img} alt={e.ticker} />
                                <div className='ml-3'>
                                    <div className='text-base font-medium'>{e.name}</div>
                                    <div className='text-sm font-light text-[#51596f]'>{e.ticker}</div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </Modal>
            <div className="w-[464px] bg-[#0E111B] border-2 border-solid border-[#21273a] min-h-[300px] rounded-2xl flex flex-col justify-start px-[30px]">
                <div className="flex justify-between items-center">
                    <div className="text-xl my-4 font-bold">Swap</div>
                    <Popover 
                        content={settings}
                        title='Settings'
                        trigger='click'
                        placement='bottomRight'
                    >
                        <SettingOutlined className='hover:rotate-90 hover:text-white text-[#51586f] duration-300'/>
                    </Popover>
                </div>
                <div className='relative'>
                    <Input 
                        placeholder='0'
                        value={tokenOneAmount}
                        onChange={changeAmount}
                        disabled={!prices}
                    />
                    <Input placeholder='0' value={tokenTwoAmount} disabled />
                    <div 
                        className='bg-[#3a4157] w-[31px] h-[31px] flex justify-center items-center rounded-lg absolute top-[86px] left-[180px] text-[#5F6783] border-[3px] border-solid border-[#0E111B] text-xs duration-300 cursor-pointer'
                        onClick={switchTokens}
                    >
                        <ArrowDownOutlined />
                    </div>
                    <div
                        className='absolute min-w-[50px] h-[30px] bg-[#3a4157] top-[36px] right-[20px] rounded-full flex justify-start items-center gap-1 text-base pr-2 cursor-pointer'
                        onClick={() => openModal(1)}
                    >
                        <img src={tokenOne.img} alt='assetOnwLogo' className='h-[22px] ml-[5px]'/>
                        <span className='font-bold'>{tokenOne.ticker}</span>
                        <DownOutlined className='w-[17px] h-[17px]' />
                    </div>
                    <div
                        className='absolute min-w-[50px] h-[30px] bg-[#3a4157] top-[135px] right-[20px] rounded-full flex justify-start items-center gap-1 text-base pr-2 cursor-pointer'
                        onClick={() => openModal(2)}
                    >
                        <img src={tokenTwo.img} alt='assetOnwLogo' className='h-[22px] ml-[5px]'/>
                        <span className='font-bold'>{tokenTwo.ticker}</span>
                        <DownOutlined className='w-[17px] h-[17px]' />
                    </div>
                </div>
                <button
                    className='disabled:bg-[#243056] disabled:opacity-40 disabled:text-[#5982f39b] disabled:cursor-not-allowed h-[55px] w-full rounded-xl flex justify-center items-center bg-[#243056] text-[#5981F3] text-xl font-bold duration-300 mb-[30px] mt-2 cursor-pointer'
                    onClick={fetchDexSwap}
                    disabled={!accountAddress || !tokenOneAmount}
                >
                    Swap
                </button>
            </div>
        </>
    )
}