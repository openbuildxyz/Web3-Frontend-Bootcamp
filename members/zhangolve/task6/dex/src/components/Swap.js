import React, { useState, useEffect } from "react";
import { Input, Popover, Radio, Modal, message } from "antd";
import { ArrowDownOutlined, DownOutlined, SettingOutlined, } from "@ant-design/icons";
import tokenList from "../tokenList.json";
import { ChainId, Token, CurrencyAmount } from '@uniswap/sdk-core'
import { Pair, Route } from '@uniswap/v2-sdk'
import { ethers } from 'ethers'
import { infura_connection, pair_abi, router_abi, token_abi } from '../resource'
import { useAccount, useWriteContract } from "wagmi";

function Swap() {
  const { isConnected } = useAccount();
  const [messageApi, contextHolder] = message.useMessage();
  const [slippage, setSlippage] = useState(2.5);
  const [tokenOneAmount, setTokenOneAmount] = useState(null);
  const [tokenTwoAmount, setTokenTwoAmount] = useState(null);
  const [tokenOne, setTokenOne] = useState(tokenList[0]);
  const [tokenTwo, setTokenTwo] = useState(tokenList[1]);
  const [isOpen, setIsOpen] = useState(false);
  const [changeToken, setChangeToken] = useState(1);
  const [prices, setPrices] = useState(null);
  const [txDetails, setTxDetails] = useState({
    to: null,
    data: null,
    value: null,
  });
  const { isLoading, isSuccess } = {};
  const { writeContractAsync } = useWriteContract();
  const account = useAccount();

  function handleSlippageChange(e) {
    setSlippage(e.target.value);
  }

  function changeAmount(e) {
    setTokenOneAmount(e.target.value);
    if (e.target.value && prices) {
      setTokenTwoAmount((e.target.value * prices.ratio).toFixed(6))
    } else {
      setTokenTwoAmount(null);
    }
  }

  function switchTokens() {
    setPrices(null);
    setTokenOneAmount(null);
    setTokenTwoAmount(null);
    const one = tokenOne;
    const two = tokenTwo;
    setTokenOne(two);
    setTokenTwo(one);
    fetchPrices(two, one);
  }

  function openModal(asset) {
    setChangeToken(asset);
    setIsOpen(true);
  }

  function modifyToken(i) {
    setPrices(null);
    setTokenOneAmount(null);
    setTokenTwoAmount(null);
    if (changeToken === 1) {
      setTokenOne(tokenList[i]);
      fetchPrices(tokenList[i], tokenTwo)
    } else {
      setTokenTwo(tokenList[i]);
      fetchPrices(tokenOne, tokenList[i])
    }
    setIsOpen(false);
  }

  async function createPair(one, two) {
    const tokenOneToken = new Token(ChainId.MAINNET, one.address, one.decimals);
    const tokenTwoToken = new Token(ChainId.MAINNET, two.address, two.decimals);

    const pairAddress = Pair.getAddress(tokenOneToken, tokenTwoToken);

    // router 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D 
    // factory 0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f 
    const provider = new ethers.providers.JsonRpcProvider(infura_connection);
    const pairContract = new ethers.Contract(pairAddress, pair_abi, provider)

    const reserves = await pairContract["getReserves"]()
    const [reserve0, reserve1] = reserves

    const tokens = [tokenOneToken, tokenTwoToken]
    const [token0, token1] = tokens[0].sortsBefore(tokens[1]) ? tokens : [tokens[1], tokens[0]]

    const pair = new Pair(CurrencyAmount.fromRawAmount(token0, reserve0), CurrencyAmount.fromRawAmount(token1, reserve1))
    return pair
  }

  async function fetchPrices(tokenOne, tokenTwo) {
    const tokenOneToken = new Token(ChainId.MAINNET, tokenOne.address, tokenOne.decimals);
    const tokenTwoToken = new Token(ChainId.MAINNET, tokenTwo.address, tokenTwo.decimals);

    const pair = await createPair(tokenOneToken, tokenTwoToken);

    console.log('pair', pair)

    const route = new Route([pair], tokenOneToken, tokenTwoToken);

    console.log('route', route)

    const tokenOnePrice = route.midPrice.toSignificant(6);
    const tokenTwoPrice = route.midPrice.invert().toSignificant(6);

    const ratio = tokenOnePrice;
    console.log({
      tokenOne: tokenOnePrice,
      tokenTwo: tokenTwoPrice,
      ratio: ratio,
    })
    setPrices({
      tokenOne: tokenOnePrice,
      tokenTwo: tokenTwoPrice,
      ratio: ratio,
    });
  }

  // 请求申请
  async function approveToken(tokenAddress, amount) {
    await writeContractAsync({
      abi: token_abi,
      functionName: "approve",
      address: tokenAddress,
      args: ["0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D", amount],
    })
  }

  // 兑换
  async function fetchDexSwap() {
    const tokenOneToken = new Token(ChainId.MAINNET, tokenOne.address, tokenOne.decimals);
    const tokenTwoToken = new Token(ChainId.MAINNET, tokenTwo.address, tokenTwo.decimals);

    const amountIn = tokenOneAmount * 10 ** tokenOne.decimals; // 1 WETH
    const tokenTwoOut = (
      (Number(tokenTwoAmount) * (100 - slippage)) /
      100
    ).toString();

    const amountOutMin = tokenTwoOut * 10 ** tokenTwo.decimals;

    const path = [tokenOneToken.address, tokenTwoToken.address];
    const to = account.address; // should be a checksummed recipient address
    const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from the current Unix time

    try {
      const tx = await approveToken(tokenOneToken.address, amountIn);

      setTxDetails({
        to: tx.to,
        data: tx.data,
        value: tx.value,
      });

      writeContractAsync(

        {
          abi: router_abi,
          address: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
          functionName: "swapExactTokensForTokens",
          args: [amountIn, amountOutMin, path, to, deadline],
        }

      ).then((tx) => {

        messageApi.info("Transaction is successful!" + tx.hash);
        setTxDetails({
          to: tx.to,
          data: tx.data,
          value: tx.value,
        });

      }).catch((error) => {

        console.log("fetchDexSwap-error:", error.shortMessage);
        messageApi.error(error.shortMessage);

      });
    }
    catch(error) {
      console.log("approveToken-error:", error.message);
      messageApi.error(error.shortMessage);
    }
  }

  useEffect(() => {

    fetchPrices(tokenList[0], tokenList[1])

  }, [])

  useEffect(() => {

    messageApi.destroy();

    if (isLoading) {
      messageApi.open({
        type: 'loading',
        content: 'Transaction is Pending...',
        duration: 0,
      })
    }

  }, [isLoading])

  useEffect(() => {
    messageApi.destroy();
    if (isSuccess) {
      messageApi.open({
        type: 'success',
        content: 'Transaction Successful',
        duration: 1.5,
      })
    } else if (txDetails.to) {
      messageApi.open({
        type: 'error',
        content: 'Transaction Failed',
        duration: 1.50,
      })
    }


  }, [isSuccess])


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
  );

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
        <div className="swapButton" disabled={!tokenOneAmount || !isConnected} onClick={fetchDexSwap}>Swap</div>
      </div>
    </>
  );
}

export default Swap;