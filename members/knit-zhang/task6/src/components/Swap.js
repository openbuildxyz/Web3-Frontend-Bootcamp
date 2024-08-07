import React, { useState, useEffect } from "react";
import { Input, Popover, Radio, Modal, message } from "antd";
import {
  ArrowDownOutlined,
  DownOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import tokenList from "../tokenList.json";
import {
  infura_connection,
  uniswapV2poolABI,
  uniswapV2pairABI,
} from "./../resource";
import { Route, Pair, Trade } from "@uniswap/v2-sdk";
import {
  ChainId,
  Token,
  CurrencyAmount,
  TradeType,
  Percent,
} from "@uniswap/sdk-core";
import { useWriteContract, useAccount } from "wagmi";
import { ethers } from "ethers";
import { mainnet } from "viem/chains";

function Swap() {
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

  const { address, isConnected } = useAccount();

  const { writeContract, writeContractAsync } = useWriteContract();

  const { data, sendTransaction } = {};

  const { isLoading, isSuccess } = {};
  function handleSlippageChange(e) {
    setSlippage(e.target.value);
  }

  function changeAmount(e) {
    setTokenOneAmount(e.target.value);
    if (e.target.value && prices) {
      setTokenTwoAmount((e.target.value * prices.ratio).toFixed(6));
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
      fetchPrices(tokenList[i], tokenTwo);
    } else {
      setTokenTwo(tokenList[i]);
      fetchPrices(tokenOne, tokenList[i]);
    }
    setIsOpen(false);
  }

  async function approveToken(tokenAddress, amount) {
    console.log(
      "approve token called, token: " + tokenAddress + " with amount: " + amount
    );

    const tokenABI = [
      {
        constant: false,
        inputs: [
          { name: "_spender", type: "address" },
          { name: "_value", type: "uint256" },
        ],
        name: "approve",
        outputs: [{ name: "", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
    ];
    writeContractAsync(
      {
        abi: tokenABI,
        address: tokenAddress,
        functionName: "approve",
        args: ["0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D", amount],
      },
      {
        onSuccess: (tx) => {
          messageApi.destroy();
          messageApi.info("Transaction is successful" + tx.hash);
          setTxDetails({
            to: tx.to,
            data: tx.data,
            value: tx.value,
          });
        },
        onError: (error) => {
          console.log("~ fetchDexSwap  ~ error", error.message);
          messageApi.error(error.shortMessage);
        },
      }
    );
  }

  async function createPair(one, two) {
    const tokenOneToken = new Token(ChainId.MAINNET, one.address, one.decimals);
    const tokenTwoToken = new Token(ChainId.MAINNET, two.address, two.decimals);
    const pairAddress = Pair.getAddress(tokenOneToken, tokenTwoToken);

    const provider = new ethers.providers.JsonRpcProvider(infura_connection);
    // Setup provider, import necessary ABI ...
    const pairContract = new ethers.Contract(
      pairAddress,
      uniswapV2pairABI,
      provider
    );
    const reserves = await pairContract["getReserves"]();
    const [reserve0, reserve1] = reserves;

    const tokens = [tokenOneToken, tokenTwoToken];
    const [token0, token1] = tokens[0].sortsBefore(tokens[1])
      ? tokens
      : [tokens[1], tokens[0]];

    const pair = new Pair(
      CurrencyAmount.fromRawAmount(token0, reserve0),
      CurrencyAmount.fromRawAmount(token1, reserve1)
    );
    return pair;
  }

  async function fetchPrices(tokenOne, tokenTwo) {
    const tokenOneToken = new Token(
      ChainId.MAINNET,
      tokenOne.address,
      tokenOne.decimals
    );
    const tokenTwoToken = new Token(
      ChainId.MAINNET,
      tokenTwo.address,
      tokenTwo.decimals
    );

    const pair = await createPair(tokenOneToken, tokenTwoToken);
    const route = new Route([pair], tokenOneToken, tokenTwoToken);
    const tokenOnePrice = route.midPrice.toSignificant(6);
    const tokenTwoPrice = route.midPrice.invert().toSignificant(6);
    const ratio = tokenOnePrice;
    setPrices({
      tokenOnePrice,
      tokenTwoPrice,
      ratio,
    });
    // const res = await axios.get(`http://localhost:3001/tokenPrice`, {
    //   params: { addressOne: one, addressTwo: two },
    // });
    // setPrices(res.data);
  }

  async function fetchDexSwap() {
    const tokenOneToken = new Token(
      ChainId.MAINNET,
      tokenOne.address,
      tokenOne.decimals
    );
    const tokenTwoToken = new Token(
      ChainId.MAINNET,
      tokenTwo.address,
      tokenTwo.decimals
    );

    const amountIn = tokenOneAmount * 10 ** tokenOne.decimals; // 1 WETH

    const tokenTwoOut = (
      (Number(tokenTwoAmount) * (100 - slippage)) /
      100
    ).toString();
    const amountOutMin = tokenTwoOut * 10 ** tokenTwo.decimals; // needs to be converted to e.g. decimal string
    const path = [tokenOneToken.address, tokenTwoToken.address];
    const to = address; // should be a checksummed recipient address
    const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from the current Unix time
    // const value = trade.inputAmount.toExact(); // // needs to be converted to e.g. decimal string
    await approveToken(tokenOneToken.address, amountIn);
    console.log(amountIn, amountOutMin, path, to, deadline);
    await writeContractAsync(
      {
        abi: uniswapV2poolABI,
        address: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
        functionName: "swapExactTokensForTokens",
        args: [amountIn, amountOutMin, path, to, deadline],
      },
      {
        onSuccess: (tx) => {
          messageApi.destroy();
          messageApi.info("Transaction is successful" + tx.hash);
          setTxDetails({
            to: tx.to,
            data: tx.data,
            value: tx.value,
          });
        },
        onError: (error) => {
          messageApi.destroy();
          messageApi.info(error.shortMessage);
          console.log(error);
        },
      }
    );

    // setTokenTwoAmount((Number(tx.data.toTokenAmount) / decimals).toFixed(6));

    // setTxDetails(tx.data.tx);
  }
  // async function addLiquidity() {
  //   const tokenOneToken = new Token(
  //     ChainId.MAINNET,
  //     tokenOne.address,
  //     tokenOne.decimals
  //   );
  //   const tokenTwoToken = new Token(
  //     ChainId.MAINNET,
  //     tokenTwo.address,
  //     tokenTwo.decimals
  //   );
  //   const to = address;
  //   const deadline = Math.floor(Date.now() / 1000) + 60 * 20;

  //   await approveToken(tokenOne.address, amountOneDesired);
  //   await approveToken(tokenTwo.address, amountTwoDesired);

  //   const amountOneMin = (amountOneDesired * (100 - slippage)) / 100;
  //   const amountTwoMin = (amountTwoDesired * (100 - slippage)) / 100;

  //   writeContract(
  //     {
  //       abi: uniswapV2poolABI,
  //       address: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
  //       functionName: "addLiquidity",
  //       args: [
  //         tokenOne.address,
  //         tokenTwo.address,
  //         amountOneDesired,
  //         amountTwoDesired,
  //         amountOneMin,
  //         amountTwoMin,
  //         to,
  //         deadline,
  //       ],
  //     },
  //     {
  //       onSuccess: (tx) => {
  //         messageApi.destroy();
  //         messageApi.info(
  //           "Transaction is successful" +
  //             tx.hash +
  //             ", " +
  //             tx.to +
  //             " will receive " +
  //             tx.liquidity +
  //             " LPs."
  //         );
  //       },
  //       onError: (error) => {
  //         messageApi.destroy();
  //         messageApi.error(error.shortMessage);
  //         console.log(error);
  //       },
  //     }
  //   );
  // }

  // async function removeLiquidity() {
  //   const tokenOneToken = new Token(
  //     ChainId.MAINNET,
  //     tokenOne.address,
  //     tokenOne.decimals
  //   );
  //   const tokenTwoToken = new Token(
  //     ChainId.MAINNET,
  //     tokenTwo.address,
  //     tokenTwo.decimals
  //   );

  //   const liquidity = 3;

  //   const to = address;
  //   const deadline = Math.floor(Date.now() / 1000) + 60 * 20;

  //   writeContract(
  //     {
  //       abi: uniswapV2poolABI,
  //       address: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
  //       functionName: "removeLiquidity",
  //       arg: [
  //         tokenOne.address,
  //         tokenTwo.address,
  //         liquidity,
  //         amountOneMin,
  //         amountTwoMin,
  //         to,
  //         deadline,
  //       ],
  //     },
  //     {
  //       onSuccess: (tx) => {
  //         messageApi.destroy();
  //         messageApi.info(
  //           "Transaction is successful" +
  //             tx.hash +
  //             ", " +
  //             tx.to +
  //             " will receive " +
  //             tx.liquidity +
  //             " LPs."
  //         );
  //       },
  //     }
  //   );
  // }

  useEffect(() => {
    fetchPrices(tokenList[0], tokenList[1]);
  }, []);

  useEffect(() => {
    if (txDetails.to && isConnected) {
      sendTransaction();
    }
  }, [txDetails]);

  useEffect(() => {
    messageApi.destroy();

    if (isLoading) {
      messageApi.open({
        type: "loading",
        content: "Transaction is Pending...",
        duration: 0,
      });
    }
  }, [isLoading]);

  useEffect(() => {
    messageApi.destroy();
    if (isSuccess) {
      messageApi.open({
        type: "success",
        content: "Transaction Successful",
        duration: 1.5,
      });
    } else if (txDetails.to) {
      messageApi.open({
        type: "error",
        content: "Transaction Failed",
        duration: 1.5,
      });
    }
  }, [isSuccess]);

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
        <div
          className="swapButton"
          disabled={!tokenOneAmount || !isConnected}
          onClick={fetchDexSwap}
        >
          Swap
        </div>
      </div>
    </>
  );
}

export default Swap;
