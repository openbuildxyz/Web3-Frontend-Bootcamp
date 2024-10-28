import React, { useState, useEffect } from "react";
import { Input, Popover, Radio, Modal, message } from "antd";
import {
  ArrowDownOutlined,
  DownOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import tokenList from "../tokenList.json";
import { 
  useReadContract,
  useSendTransaction, 
  useWaitForTransactionReceipt, 
  useWriteContract, 
  useAccount  
} from "wagmi";
import { ethers } from "ethers";
import { ChainId,Token, CurrencyAmount, TradeType, Percent } from '@uniswap/sdk-core'
import { Pair, Route, Trade   } from '@uniswap/v2-sdk'
// import {   } from "@uniswap/v3-sdk";
import UniswapV2Pair from "../abi/UniswapV2Pair.json"
import UniswapV2Router02 from "../abi/UniswapV2Router02.json"
import { REACT_APP_ALCHEMY_API_KEY } from "../utils/index";
function Swap(props) {
  const { address, isConnected } = props;
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
    to:null,
    data: null,
    value: null,
  }); 
  const [liquidityAmount, setLiquidityAmount] = useState(null);
  const { writeContract } = useWriteContract();
  const account  = useAccount();
  const wagmiUserAddress = account.address;
  // 正式
  const mainnetRouterContractAddress = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"; 
  const ChainIdCount = ChainId.MAINNET;
  const urlProvider = `https://mainnet.chainnodes.org/要自己去申请`
  // 测试
  // const seploiaRouterContractAddress = "0xC532a74256D3Db42D0Bf7a0400fEFDbad7694008";
  // const ChainIdCount = ChainId.SEPOLIA;
  // const urlProvider = `https://sepolia.infura.io/v3/${REACT_APP_ALCHEMY_API_KEY}`;
  

  const uniswapRouterContractAddress =mainnetRouterContractAddress;
  
  const {data, sendTransaction} = useSendTransaction({
    request: {
      from: address,
      to: String(txDetails.to),
      data: String(txDetails.data),
      value: String(txDetails.value),
    }
  })

  const getFactory = useReadContract({
    address: uniswapRouterContractAddress,
    abi: UniswapV2Router02,
    functionName: "factory",
  })
  const factoryAddress = getFactory.data;
  const { isLoading, isSuccess } = useWaitForTransactionReceipt ({
    hash: data?.hash,
  })

  function handleSlippageChange(e) {
    setSlippage(e.target.value);
  }

  function changeAmount(e) {
    setTokenOneAmount(e.target.value);
    if(e.target.value && prices){
      setTokenTwoAmount((e.target.value * prices.ratio).toFixed(2))
    }else{
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

  function modifyToken(i){
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

  async function fetchPrices(one, two){
    try {

      const tokenOneToken = new Token(ChainIdCount, one.address, one.decimals);
      const tokenTwoToken = new Token(ChainIdCount, two.address, two.decimals);
      const pair = await createPair(tokenOneToken, tokenTwoToken);
      const route = new Route([pair], tokenOneToken, tokenTwoToken);
      
      const tokenOnePrice = route.midPrice.toSignificant(6);
      const tokenTwoPrice = route.midPrice.invert().toSignificant(6);
      const ratio = tokenOnePrice ; // 因为 tokenOnePrice 已经是 tokenOneToken 到 tokenTwoToken 的价格
      setPrices({
        ratio: ratio,
        oneToTwo: tokenOnePrice,
        twoToOne: tokenTwoPrice,
      });
    } catch (error) {
      console.error('Failed to fetch prices:', error);
      messageApi.open({
        type: 'error',
        content: 'Failed to fetch prices',
        duration: 1.5,
      });
    }
  }
  async function createPair(tokenOne, tokenTwo) {
    // ChainIdCount
    const tokenOneToken = new Token(ChainIdCount, tokenOne.address, tokenOne.decimals)
    const tokenTwoToken = new Token(ChainIdCount, tokenTwo.address, tokenTwo.decimals)

    const pairAddress = Pair.getAddress(tokenOneToken, tokenTwoToken)
    const provider = new ethers.providers.JsonRpcBatchProvider(urlProvider);
    const pairContract = new ethers.Contract(pairAddress, UniswapV2Pair, provider)
    const reserves = await pairContract.getReserves()

    console.log("reserves",reserves);
    const [reserve0, reserve1] = reserves
    const tokens = [tokenOneToken, tokenTwoToken]
    const [token0, token1] = tokens[0].sortsBefore(tokens[1]) ? tokens : [tokens[1], tokens[0]]
  
    const pair = new Pair(CurrencyAmount.fromRawAmount(token0, reserve0), CurrencyAmount.fromRawAmount(token1, reserve1))
    return pair
  }

  async function fetchDexSwap(){
    //  转账
    const tokenOneToken = new Token(ChainIdCount, tokenOne.address, tokenOne.decimals);
    const tokenTwoToken = new Token(ChainIdCount, tokenTwo.address, tokenTwo.decimals);
    const pair = await createPair(tokenOneToken, tokenTwoToken);
    const route = new Route([pair], tokenOneToken, tokenTwoToken);

    // 
    const amountIn = tokenOneAmount;  
    const trade = new Trade(route, CurrencyAmount.fromRawAmount(tokenOneToken, amountIn), TradeType.EXACT_INPUT);
    const slippageTolerance = new Percent(slippage * 100, '10000') // 1，2.5 5滑点
    
    const amountOutMin = trade.minimumAmountOut(slippageTolerance).toExact() // needs to be converted to e.g. decimal string
    const path = [tokenOneToken.address, tokenTwoToken.address]// 从one到two的流向
    const to = wagmiUserAddress // 到自己的账户吧
    const deadline = Math.floor(Date.now() / 1000) + 60 * 20 // 20 minutes from the current Unix time

    await approveToken(tokenOne.address, amountIn);

    writeContract({
      address: uniswapRouterContractAddress,
      abi: UniswapV2Router02,
      functionName: "swapExactTokensForETH",
      args: [
        amountIn,
        amountOutMin,
        path,
        to,
        deadline
      ],
      onSuccess: (tx) => {
        console.log("Transaction successful:", tx);
        setTxDetails({
          to: tx.to,
          data: tx.data,
          value: tx.value
        });
      },
      onError: (error) => {
        console.error("Transaction error:", error);
      }
    });
    
  }

// 执行代币授权
async function approveToken(tokenAddress, amountIn) {

 const tokenABI = [{
  "inputs": [
    {
      "name": "guy",
      "type": "address"
    },
    {
      "name": "wad",
      "type": "uint256"
    }
  ],
  "name": "approve",
  "outputs": [
    {
      "name": "",
      "type": "bool"
    }
  ],
  "type": "function"
}];

 // 转换amountIn为适当的单位
  const amountInBigNumber = ethers.utils.parseUnits(amountIn, 18); // 18 是假设的代币小数位

  writeContract({
    address:tokenAddress,
    abi:tokenABI,
    functionName:"approve",
    args:[
      factoryAddress, // 给想用钱的地址, 给到工厂factory
      amountInBigNumber
    ],
  },{
    onSuccess:(tx)=>{
      console.log("成功了");
    }
  }
)

  
  
}

// 添加代币到流动池 wagmiUserAddress
async function addLiquidity(){
  // 必须要有x * tokenOneToken == y * tokenTwoToken 数量的代币。才能投入 分别 x、y数量的代币进入流动池
  const tokenOneToken = new Token(ChainIdCount, tokenOne.address, tokenOne.decimals);
  const tokenTwoToken = new Token(ChainIdCount, tokenTwo.address, tokenTwo.decimals);
  // const pair = await createPair(tokenOneToken, tokenTwoToken);
  // const route = new Route([pair], tokenOneToken, tokenTwoToken);
  const amountOne = tokenOneAmount;
  const amountTwo = tokenTwoAmount;
  await approveToken(tokenOneToken.address, amountOne);
  await approveToken(tokenTwoToken.address, amountTwo);

  writeContract({
    address:uniswapRouterContractAddress,
    abi:UniswapV2Router02,
    functionName:"addLiquidity",
    args:[
      tokenOne.address,
      tokenTwo.address,
      amountOne,
      amountTwo,
      0,
      0,
      wagmiUserAddress,
      Math.floor(Date.now() / 1000) + 60 * 20,
    ]
  },
  {
    onSuccess:(tx)=>{
      console.log("txtx",tx);
      setTxDetails({
        to:tx.to,
        data:tx.data,
      })
    },
  },
  {
    onerror:(error)=>{
      console.log("error",error);
    }
  }
)
}

async function removeLiquidity(liquidityAmount){

  const tokenOneToken = new Token(ChainIdCount, tokenOne.address, tokenOne.decimals);
  const tokenTwoToken = new Token(ChainIdCount, tokenTwo.address, tokenTwo.decimals);
  const pairAddress= Pair.getAddress(tokenOneToken, tokenTwoToken);
  // 获取池子合约地址
  await approveToken(pairAddress, liquidityAmount);

  writeContract({
    address:uniswapRouterContractAddress,
    abi:UniswapV2Router02,
    functionName:"removeLiquidity",
    args:[
      tokenOneToken.address,
      tokenTwoToken.address,
      liquidityAmount,
      0,
      0,
      wagmiUserAddress,
      Math.floor(Date.now() / 1000) + 60 * 20,
    ]
  })
}


useEffect(()=>{

    fetchPrices(tokenList[0], tokenList[1])

  }, [])

  useEffect(()=>{

      if(txDetails.to && isConnected){
        sendTransaction();
      }
  }, [txDetails])

  useEffect(()=>{

    messageApi.destroy();

    if(isLoading){
      messageApi.open({
        type: 'loading',
        content: 'Transaction is Pending...',
        duration: 0,
      })
    }    

  },[isLoading])

  useEffect(()=>{
    messageApi.destroy();
    if(isSuccess){
      messageApi.open({
        type: 'success',
        content: 'Transaction Successful',
        duration: 1.5,
      })
    }else if(txDetails.to){
      messageApi.open({
        type: 'error',
        content: 'Transaction Failed',
        duration: 1.50,
      })
    }


  },[isSuccess])


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
        <div className="swapButton" disabled={!tokenOneAmount || !isConnected} onClick={addLiquidity}>添加流动池</div>
        <Input
          placeholder="从流动池移除多少"
          value={liquidityAmount}
          onChange={(e) => setLiquidityAmount(e.target.value)}
        />
          <div className="swapButton" disabled={!liquidityAmount} onClick={() => removeLiquidity(liquidityAmount)}>移出流动池</div>
      </div>
    </>
  );
}

export default Swap;
