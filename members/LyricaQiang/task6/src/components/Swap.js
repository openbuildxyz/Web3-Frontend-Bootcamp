import React, { useState, useEffect } from "react";
import { Input, Popover, Radio, Modal, message } from "antd";
import {
  ArrowDownOutlined,
  DownOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import tokenList from "../tokenList.json";
import axios from "axios";
import { Route, Pair, Trade } from "@uniswap/v2-sdk";
import {
  ChainId,
  Token,
  CurrencyAmount,
  TradeType,
  Percent,
} from "@uniswap/sdk-core";
import { ethers } from "ethers";
import { infura_connection_base, pair_abi, router_abi, eth_connection } from "../resource";
import { useAccount, useWriteContract } from "wagmi";


const Swap = () => {
    const [tokenOneAmount, setTokenOneAmount] = useState(null)
    const [tokenTwoAmount, setTokenTwoAmount] = useState(null)
    const [tokenOne, setTokenOne] = useState(tokenList[0])
    const [tokenTwo, setTokenTwo] = useState(tokenList[1])

    const [isOpen, setIsOpen] = useState(false);
    const [changeToken, setChangeToken] = useState(1)
    const [prices, setPrices] = useState(null)
    const [txDetails, setTxDetails] = useState({
        to: null,
        data: null,
        value: null,
    })

    const [slippage, setSlippage] = useState(2.5)


    const account = useAccount()
    const  {writeContract} = useWriteContract()


    useEffect(() => {
        fetchPrices(tokenList[0], tokenList[1])
    }, [])


    const [messageApi, contextHolder] = message.useMessage()

    const approveToken = async (tokenAdress, amount) => {
      const abi = [
         {
          type: 'function',
          name: 'approve',
          stateMutability: 'nonpayable',
          inputs: [
            { name: 'spender', type: 'address' },
            { name: 'amount', type: 'uint256' },
          ],
          outputs: [{ type: 'bool' }],
        }
      ]
      writeContract(
        {
          abi,
          address: tokenAdress,
          functionName: 'approve',
          args: [
            '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
            amount,
          ]
        },
        {
          onSuccess:(tx)=> {
            messageApi.info("Transaction is successful!" + tx.hash);
          },
          onError: (error) => {
            console.log("🚀 ~ fetchDexSwap ~ error:", error.message);
            messageApi.error(error.shortMessage);
          },
        }
      
      )



    }

    const fetchDexSwap = async () => {
        const tokenOneObject = new Token(ChainId.MAINNET, tokenOne.address, tokenOne.decimals)
        const tokenTwoObject = new Token(ChainId.MAINNET, tokenTwo.address, tokenTwo.decimals)

        // 交易对
        const pair = new Pair(
          CurrencyAmount.fromRawAmount(tokenOneObject,formatTokenAmount(tokenOneAmount, tokenOne.decimals)),
          CurrencyAmount.fromRawAmount(tokenTwoObject,formatTokenAmount(tokenTwoAmount, tokenTwo.decimals)))
                            
        // 交易路径
        const route = new Route([pair],tokenOneObject, tokenTwoObject)

        //  创建了一个交易，TradeType.EXACT_INPUT表示精确输入的交易类型。
        const amountIn = formatTokenAmount(tokenOneAmount, tokenOne.decimals) // 输入金额
        const trade = new Trade(route, CurrencyAmount.fromRawAmount(tokenOneObject, amountIn), TradeType.EXACT_INPUT)


        const tokenTwoOut = ((Number(tokenTwoAmount) * (100 - slippage)) /100).toString();
        console.log(tokenTwoOut)
        const amountOutMin = formatTokenAmount(tokenTwoOut, tokenTwo.decimals)
        const deadline = Math.floor(Date.now() / 1000) + 60 * 20
        const path = [tokenOneObject.address, tokenTwoObject.address];
        const to = account.address

        await approveToken(tokenOne.address, amountIn);
        writeContract({
          address: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D', // 主网上router v2地址
          abi: router_abi,
          functionName: "swapExactTokensForTokens",
          args: [amountIn, amountOutMin, path, to, deadline],
        })
    }


    const createPair = async (one, two) => {
        const tokenOneObject = new Token(ChainId.MAINNET, one.address, one.decimals)
        const tokenTwoObject = new Token(ChainId.MAINNET, two.address, two.decimals)
        // 根据token对象，创建交易对
        const pairAddress = Pair.getAddress(tokenOneObject, tokenTwoObject)
        // const provider = new ethers.JsonRpcProvider(sepoliaRpcUrl)  // ethers v6版本的写法
        const provider = new ethers.providers.JsonRpcProvider(eth_connection) // ethers v5版本的写法

        // 根据uniswapv2 pair合约来获取特定交易对的储备量
        const pairContract = new ethers.Contract(pairAddress, pair_abi, provider);
        console.log(pairContract)
        const reserves = await pairContract["getReserves"]();
        const [reserve0, reserve1] = reserves;

        const tokens = [tokenOneObject, tokenTwoObject]
        // 确保创建交易对时，token1和token2的顺序，交易对的功能依赖交易对的顺序
        const [token0, token1] = tokens[0].sortsBefore(tokens[1]) ? tokens : [tokens[1], tokens[0]]
         //  通过CurrencyAmount.fromRawAmount方法处理，返回新的货币金额实例
        const pair = new Pair(CurrencyAmount.fromRawAmount(token0, reserve0), CurrencyAmount.fromRawAmount(token1, reserve1))
        return pair
    }


    const fetchPrices = async (tokenOne, tokenTwo) => {
        const tokenOneObject = new Token(ChainId.MAINNET, tokenOne.address, tokenOne.decimals)
        const tokenTwoObject = new Token(ChainId.MAINNET, tokenTwo.address, tokenTwo.decimals)

        const pair = await createPair(tokenOneObject, tokenTwoObject)
      
        const route = new Route([pair], tokenOneObject, tokenTwoObject)
          
        const tokenOnePrice = route.midPrice.toSignificant(6) // 1901.08
        const tokenTwoPrice = route.midPrice.invert().toSignificant(6) // 0.000526017
        // console.log(route.midPrice.toSignificant(6)) 
        // console.log(route.midPrice.invert().toSignificant(6)) 

        const ratio = tokenOnePrice
        console.log(ratio)
        setPrices({
            tokenOne: tokenOnePrice,
            tokenTwo: tokenTwoPrice,
            ratio: ratio,
        });
        console.log(prices)

    }


    const changeAmount = (e)=> {
        setTokenOneAmount(e.target.value)
        if(e.target.value && prices) {
            setTokenTwoAmount((e.target.value * prices.ratio).toFixed(6))
        } else { 
            setTokenTwoAmount(null)
        }
    }

    const switchTokens = ()=> {
        clearData()
        const one = tokenOne
        const two = tokenTwo
        setTokenOne(two)
        setTokenTwo(one)
        fetchPrices(two, one)
    }


    const clearData = () => {
        setPrices(null)
        setTokenOneAmount(null)
        setTokenTwoAmount(null)
    }


    const modifyToken = (index)=> {
        clearData()
        if(changeToken === 1) {
            setTokenOne(tokenList[index])
            fetchPrices(tokenList[index], tokenTwo)
        } else {
            setTokenTwo(tokenList[index])
            fetchPrices(tokenOne, tokenList[index])
        }
        setIsOpen(false)
    }


    const openModal = (flag) => {
        setChangeToken(flag)
        setIsOpen(true)
    }

   
    const handleSlippageChange = (e)=> {
        setSlippage(e.target.value)
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
        {contextHolder}
        <Modal
            open={isOpen}
            footer={null}
            onCancel={() => setIsOpen(false)}
            title="Select a token"
        >
            <div className="modalContent">
            {tokenList?.map((e, i) => {
                return (
                <div
                    className="tokenChoice"
                    key={i}
                    onClick={() => modifyToken(i)}
                >
                    <img src={e.img} alt={e.ticker} className="tokenLogo" />
                    <div className="tokenChoiceNames">
                    <div className="tokenName">{e.name}</div>
                    <div className="tokenTicker">{e.ticker}</div>
                    </div>
                </div>
                );
            })}
            </div>
        </Modal>
        <div className="tradeBox">
            <div className="tradeBoxHeader">
            <h4>Swap</h4>
            <Popover
                content={settings}
                title="Settings"
                trigger="click"
                placement="bottomRight"
            >
                <SettingOutlined className="cog" />
            </Popover>
            </div>
            <div className="inputs">
            <Input
                placeholder="0"
                value={tokenOneAmount}
                onChange={changeAmount}
                disabled={!prices}
            />
            <Input placeholder="0" value={tokenTwoAmount} disabled={true} />
            <div className="switchButton" onClick={switchTokens}>
                <ArrowDownOutlined className="switchArrow" />
            </div>
            <div className="assetOne" onClick={() => openModal(1)}>
                <img src={tokenOne.img} alt="assetOneLogo" className="assetLogo" />
                {tokenOne.ticker}
                <DownOutlined />
            </div>
            <div className="assetTwo" onClick={() => openModal(2)}>
                <img src={tokenTwo.img} alt="assetOneLogo" className="assetLogo" />
                {tokenTwo.ticker}
                <DownOutlined />
            </div>
            </div>
            <div
            className="swapButton"
            disabled={!tokenOneAmount || !account.isConnected}
            onClick={fetchDexSwap}>
                Swap
            </div>
        </div>
        </>
    );
}


export default Swap;

const formatTokenAmount = (amount, decimals) => {
  // 将数字拆分成整数部分和小数部分
  const [integerPart, decimalPart = ""] = amount.split(".");

  // 组合整数和小数部分
  let combined = integerPart + decimalPart;

  // 计算需要填充的零的数量
  const paddingLength = decimals - decimalPart.length;

  // 如果需要填充零，则填充
  if (paddingLength > 0) {
    combined = combined.padEnd(combined.length + paddingLength, "0");
  } else if (paddingLength < 0) {
    // 如果小数部分长度超出，需要截取
    combined = combined.slice(0, paddingLength);
  }

  combined = combined.replace(/^0+/, "");

  console.log("amount: " + amount + ", result: " + combined);

  return combined;
};
