import React, { useState, useEffect } from "react";
import { erc20Abi } from "viem";
import { Input, Popover, Radio, Modal, message } from "antd";
import {
  ArrowDownOutlined,
  DownOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import tokenList from "../tokenList.json";
import { Pair, Route, Trade } from "@uniswap/v2-sdk";
import {
  ChainId,
  Token,
  CurrencyAmount,
  TradeType,
  Percent,
} from "@uniswap/sdk-core";
import { ethers } from "ethers";
import { ALCHEMY_RPC_SEPOLIA, pair_ABI, route02_ABI } from "../resource";
import {
  useWriteContract,
  useAccount,
  useWaitForTransactionReceipt,
} from "wagmi";
import { waitForTransactionReceipt } from "@wagmi/core";
import { sepolia } from "@wagmi/core/chains";
import { config } from "../index";

function Swap() {
  // 从props中获取钱包地址和连接状态
  const { address, isConnected } = useAccount();

  // 状态管理
  const [messageApi, contextHolder] = message.useMessage(); // 用于显示交易状态消息
  const [slippage, setSlippage] = useState(2.5); // 滑点容差，控制交易价格变化的容许范围
  const [tokenOneAmount, setTokenOneAmount] = useState(null); // 用户想要支付的代币数量
  const [tokenTwoAmount, setTokenTwoAmount] = useState(null); // 用户将收到的代币数量
  const [tokenOne, setTokenOne] = useState(tokenList[0]); // 用户支付的代币信息
  const [tokenTwo, setTokenTwo] = useState(tokenList[1]); // 用户接收的代币信息
  const [isOpen, setIsOpen] = useState(false); // 控制代币选择模态框的显示
  const [changeToken, setChangeToken] = useState(1); // 标记当前正在更改哪个代币（1或2）
  const [prices, setPrices] = useState(null); // 存储代币价格信息
  const [txDetails, setTxDetails] = useState({
    // 存储交易详情
    to: null, // 交易目标地址
    data: null, // 交易数据
    value: null, // 交易金额
  });

  // Uniswap V2 Router地址
  // Mainnet地址为0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D
  // 测试网地址为0x86dcd3293C53Cf8EFd7303B57beb2A3F671dDE98
  const UNISWAP_ROUTER_ADDRESS = "0xeE567Fe1712Faf6149d80dA1E6934E354124CfE3";

  // 从钱包获取用户地址

  const { data, sendTransaction } = {};

  const { writeContract } = useWriteContract();

  const [hash, setHash] = useState(null);
  const { receipt, isError, isLoading } = useWaitForTransactionReceipt({
    hash,
  });

  // 处理滑点设置改变
  function handleSlippageChange(e) {
    setSlippage(e.target.value);
  }

  // 处理用户输入代币数量变化
  function changeAmount(e) {
    setTokenOneAmount(e.target.value);
    // 如果有输入值且有价格数据，自动计算另一个代币的数量
    if (e.target.value && prices) {
      setTokenTwoAmount((e.target.value * prices.ratio).toFixed(2));
    } else {
      setTokenTwoAmount(null);
    }
  }

  // 切换代币位置
  function switchTokens() {
    setPrices(null);
    setTokenOneAmount(null);
    setTokenTwoAmount(null);
    const one = tokenOne;
    const two = tokenTwo;
    setTokenOne(two);
    setTokenTwo(one);
    fetchPrices(two, one, "switch");
  }

  // 打开代币选择模态框
  function openModal(asset) {
    setChangeToken(asset);
    setIsOpen(true);
  }

  // 选择新的代币
  async function modifyToken(i) {
    try {
      // 1. 更新代币
      if (changeToken === 1) {
        setTokenOne(tokenList[i]);
        // 2. 等待价格获取完成
        await fetchPrices(tokenList[i], tokenTwo);
      } else {
        setTokenTwo(tokenList[i]);
        // 2. 等待价格获取完成
        await fetchPrices(tokenOne, tokenList[i]);
      }
      // 3. 关闭模态框
      setIsOpen(false);
    } catch (error) {
      console.error("Error modifying token:", error);
      // 4. 错误处理
      messageApi.open({
        type: "error",
        content: "Failed to get token price",
        duration: 2,
      });
    }
  }

  async function createPair(tokenOneToken, tokenTwoToken) {
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        ALCHEMY_RPC_SEPOLIA
      );
      const factoryAddress = "0xF62c03E08ada871A0bEb309762E260a7a6a880E6"; // Uniswap V2 工厂合约地址
      const factoryAbi = [
        // Uniswap V2 工厂合约的 ABI
        "function getPair(address tokenA, address tokenB) external view returns (address pair)",
      ];

      console.log("正在创建工厂合约实例...");
      const factoryContract = new ethers.Contract(
        factoryAddress,
        factoryAbi,
        provider
      );

      console.log("调用 getPair...");
      const pairAddress = await factoryContract.getPair(
        tokenOneToken.address,
        tokenTwoToken.address
      );
      console.log("获取到的交易对地址:", pairAddress);

      if (pairAddress === ethers.constants.AddressZero) {
        throw new Error("交易对不存在");
      }

      console.log("正在创建代币对合约实例...");
      const pairContract = new ethers.Contract(pairAddress, pair_ABI, provider);

      console.log("调用 getReserves...");
      const reserves = await pairContract.getReserves();
      console.log("获取到的储备量:", reserves);

      const [reserve0, reserve1] = reserves;

      if (reserve0.isZero() && reserve1.isZero()) {
        throw new Error("流动性池为空");
      }

      // 这里直接使用 Token 实例，不需要排序，因为池子已经确定了顺序
      return new Pair(
        CurrencyAmount.fromRawAmount(tokenOneToken, reserve0),
        CurrencyAmount.fromRawAmount(tokenTwoToken, reserve1)
      );
    } catch (error) {
      console.error("创建代币对时出错:", error);
      throw error;
    }
  }

  async function fetchPrices(tokenOne, tokenTwo, type = "") {
    try {
      console.log("开始获取价格...");
      console.log("代币1:", tokenOne);
      console.log("代币2:", tokenTwo);

      const tokenOneToken = new Token(
        ChainId.SEPOLIA,
        tokenOne.address,
        tokenOne.decimals
      );
      const tokenTwoToken = new Token(
        ChainId.SEPOLIA,
        tokenTwo.address,
        tokenTwo.decimals
      );

      console.log("正在创建代币对...");
      const pair = await createPair(tokenOneToken, tokenTwoToken);

      console.log("创建交易路由...");
      const route = new Route([pair], tokenOneToken, tokenTwoToken);

      console.log("计算兑换率...");
      const exchangeRate = route.midPrice.invert().toSignificant(6);

      let correctExchangeRate = exchangeRate;

      if (type === "switch") {
        correctExchangeRate = 1 / exchangeRate;
      }

      setPrices({
        tokenOnePrice: 1,
        tokenTwoPrice: correctExchangeRate,
        ratio: correctExchangeRate,
      });

      console.log("Exchange Rate:", {
        [`1 ${tokenOne.ticker}`]: `${correctExchangeRate} ${tokenTwo.ticker}`,
      });

      messageApi.open({
        type: "success",
        content: "Price updated",
        duration: 1,
      });
    } catch (error) {
      console.error("获取价格失败:", error);
      setPrices(null);
      messageApi.open({
        type: "error",
        content: `获取价格失败: ${error.message}`,
        duration: 3,
      });
    }
  }

  async function approveToken(tokenAddress, amount) {
    console.log("type of amount", typeof amount);
    writeContract({
      address: tokenAddress,
      abi: erc20Abi,
      functionName: "approve",
      args: [UNISWAP_ROUTER_ADDRESS, amount],
    });
  }

  async function fetchDexSwap() {
    try {
      const tokenOneToken = new Token(
        ChainId.SEPOLIA,
        tokenOne.address,
        tokenOne.decimals
      );
      const tokenTwoToken = new Token(
        ChainId.SEPOLIA,
        tokenTwo.address,
        tokenTwo.decimals
      );

      // 这里不需要传入 CurrencyAmount，只需要传入 Token 实例
      const pair = await createPair(tokenOneToken, tokenTwoToken);

      const route = new Route([pair], tokenOneToken, tokenTwoToken);

      const amountIn = formatTokenAmount(tokenOneAmount, tokenOne.decimals);

      const trade = new Trade(
        route,
        CurrencyAmount.fromRawAmount(tokenOneToken, amountIn),
        TradeType.EXACT_INPUT
      );

      const slippageTolerance = new Percent(
        Math.floor(slippage * 100),
        "10000"
      ); // 50 bips, or 0.50%

      // 修改这里：将 amountOutMin 转换为正确的格式
      const minAmount = trade.minimumAmountOut(slippageTolerance);
      const amountOutMin = formatTokenAmount(
        minAmount.toExact(),
        tokenTwo.decimals
      );

      const path = [tokenOneToken.address, tokenTwoToken.address];
      const to = address; // should be a checksummed recipient address
      const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from the current Unix time

      await approveToken(tokenOneToken.address, amountIn);

      console.log("交易参数:", {
        amountIn,
        amountOutMin,
        path,
        to,
        deadline,
      });

      writeContract(
        {
          address: UNISWAP_ROUTER_ADDRESS,
          abi: route02_ABI,
          functionName: "swapExactTokensForTokens",
          args: [amountIn, amountOutMin, path, to, deadline],
        },
        {
          onSuccess: async (hash) => {
            messageApi.destroy();
            messageApi.info("Transaction sent" + hash);

            console.log("hash", hash);

            // setHash(hash); // 设置交易哈希
            // console.log(receipt, isError);
            const receipt = await waitForTransactionReceipt(config, { hash });
            console.log("Transaction receipt:", receipt);
            setTxDetails({
              to: receipt.to,
              data: receipt.data,
              value: receipt.value,
            });
          },
          onError: (error) => {
            console.log("Error:", error);
            messageApi.destroy();
            messageApi.error("Transaction sent" + error.shortMessage);
          },
        }
      );
    } catch (error) {
      console.error("交易失败:", error);
      messageApi.error("交易失败: " + error.message);
    }
  }

  const formatTokenAmount = (amount, decimals) => {
    const [integerPart, decimalPart = ""] = amount.split(".");

    let combined = integerPart + decimalPart;

    const paddingLength = decimals - decimalPart.length;

    if (paddingLength > 0) {
      combined = combined.padEnd(combined.length + paddingLength, "0");
    } else if (paddingLength < 0) {
      combined = combined.slice(0, combined.length + paddingLength);
    }

    combined = combined.replace(/^0+/, "");

    console.log("amount:" + amount + ", result:" + combined);

    return combined;
  };

  // 生命周期效果
  useEffect(() => {
    // 组件加载时获取初始代币价格
    console.log("tokenList", tokenList[0], tokenList[1]);
    fetchPrices(tokenList[0], tokenList[1]);
  }, []);

  // 处理交易状态的消息提示
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

  // useEffect(() => {
  //   if (isError) {
  //     messageApi.open({
  //       type: "error",
  //       content: "Transaction Failed",
  //       duration: 1.5,
  //     });
  //   }

  //   if (receipt) {
  //     console.log("Transaction receipt:", receipt);
  //     setTxDetails({
  //       to: receipt.to,
  //       data: receipt.data,
  //       value: receipt.value,
  //     });
  //   }

  //   messageApi.destroy();
  //   if (!isError && txDetails.to) {
  //     messageApi.open({
  //       type: "success",
  //       content: "Transaction Successful",
  //       duration: 1.5,
  //     });
  //   } else if (txDetails.to) {
  //     messageApi.open({
  //       type: "error",
  //       content: "Transaction Failed",
  //       duration: 1.5,
  //     });
  //   }
  // }, [receipt, isError]);

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
