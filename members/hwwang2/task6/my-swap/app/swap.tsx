import React, { useState, useEffect } from "react";
import { Input, Popover, Radio, Modal, message,Button } from "antd";
import {
  ArrowDownOutlined,
  DownOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import tokenList from "../tokenList.json";


import { useAccount, useWriteContract, useBalance } from "wagmi";

import useSwap from "@/components/useSwap";

interface AToken{
    ticker:string,
    img: string,
    name: string,
    address: string,
    decimals:number,
}

function Swap() {
  const [messageApi, contextHolder] = message.useMessage();
  const [slippage, setSlippage] = useState(2.5);
  // const [tokenOneAmount, setTokenOneAmount] = useState(null);
  // const [tokenTwoAmount, setTokenTwoAmount] = useState<string|null>(null);
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

  
  const [amount, setAmount] = React.useState(0);
  const [quote, setQuote] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isExceedBalance, setIsExceedBalance] = React.useState(false);
  const [isInvalidFromToken, setIsInvalidFromToken] = React.useState(false);
  const [isInvalidToToken, setIsInvalidToToken] = React.useState(false);
  const [fromTokenAmount, setFromTokenAmount] = React.useState('');
  const [isOpenSuccess, setIsOpenSuccess] = React.useState(false);
  const [isOpenError, setIsOpenError] = React.useState(false);

  const { swap, getQuote } = useSwap(tokenOne.address, tokenTwo.address, tokenOne.decimals, tokenTwo.decimals);
  const { address } = useAccount();
  const { data: FromTokenBalance } = useBalance({
    address: address,
    token: tokenOne.address as `0x${string}`,
  });
  const { data: ToTokenBalance } = useBalance({
    address: address,
    token: tokenTwo.address as `0x${string}`,
  });

  const account = useAccount();
  // const { data, sendTransaction } = {};

  // const { isLoading, isSuccess } = {};

  function handleSlippageChange(e: any) {
    setSlippage(e.target.value);
  }

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
  //   messageApi.destroy();
  //   if (isSuccess) {
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
  // }, [isSuccess]);
  function openModal(asset:number) {
    setChangeToken(asset);
    setIsOpen(true);
  }
  function modifyToken(i:number) {
    if (changeToken === 1) {
      setTokenOne(tokenList[i]);
    } else {
      setTokenTwo(tokenList[i]);
    }
    setFromTokenAmount("");
    setQuote(0);
    setIsOpen(false);
  }

  const onChangeAmountInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const amountIn = parseFloat(event.target.value || '0');
    setFromTokenAmount(event.target.value || '');
    if (amountIn > parseFloat(FromTokenBalance?.formatted || '0')) {
      setIsExceedBalance(true);
    } else {
      setIsExceedBalance(false);
    }
    const quote = await getQuote(amountIn);
    setQuote(Number(quote));
  };

  const onClickSwapButton = async () => {
    try {
      setIsLoading(true);
      const txn = await swap(fromTokenAmount, slippage);
      // await txn.wait();
      setIsLoading(false);
      message.error("Swap failed...");
    } catch (e) {
      console.error(e);
      setIsLoading(false);
      message.error("Swap failed...");
    }
  };

  // const onChangeFromToken = (value: any) => {
  //   if (ethers.isAddress(value)) {
  //     setIsInvalidFromToken(false);
  //     setFromToken(value);
  //   } else {
  //     setIsInvalidFromToken(true);
  //   }

  //   setFromTokenAmount('');
  //   setIsExceedBalance(false);
  // };

  // const onChangeToToken = (value: any) => {
  //   if (ethers.isAddress(value)) {
  //     setIsInvalidToToken(false);
  //     setToToken(value);
  //   } else {
  //     setIsInvalidToToken(true);
  //   }
  // };

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
            value={fromTokenAmount}
            onChange={onChangeAmountInput}
            // disabled={!prices}
          />
          <Input placeholder="0" value={quote} disabled={true} />
          {/* <div className="switchButton" onClick={switchTokens}>
            <ArrowDownOutlined className="switchArrow" />
          </div> */}
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
        <Button
          className="swapButton"
          disabled={!quote || !account.isConnected}
          onClick={onClickSwapButton}
        >
          Swap
        </Button>
      </div>
    </>
  );
}

export default Swap;

const formatTokenAmount = (amount:string, decimals:number) => {
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
