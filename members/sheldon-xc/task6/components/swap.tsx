"use client";
import { Snippet } from "@nextui-org/snippet";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/modal";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { Listbox, ListboxItem } from "@nextui-org/listbox";
import { User } from "@nextui-org/user";
import { useState, useEffect } from "react";
import { Route, Pair, Trade } from "@uniswap/v2-sdk";
import {
  ChainId,
  Token,
  CurrencyAmount,
  TradeType,
  Percent,
} from "@uniswap/sdk-core";
import { ethers } from "ethers";
import { useAccount, useWriteContract } from "wagmi";

import { tokens } from "@/config/token-list";
import { formatTokenAmount } from "@/utils/formate";
import { router_abi, pair_abi } from "@/config/abi";
import { infura_api } from "@/config/infura_api";

export default function Swap() {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [openType, setOpenType] = useState<string>("");
  const [slippage, setSlippage] = useState(2.5);
  const [tokenOneAmount, setTokenOneAmount] = useState(null);
  const [tokenTwoAmount, setTokenTwoAmount] = useState(null);
  const [tokenOne, setTokenOne] = useState(tokens[0]);
  const [tokenTwo, setTokenTwo] = useState(tokens[1]);
  const [changeToken, setChangeToken] = useState(1);
  const [prices, setPrices] = useState(null);
  const [txDetails, setTxDetails] = useState({
    to: null,
    data: null,
    value: null,
  });

  const { writeContract } = useWriteContract();
  const account = useAccount();

  function handleSlippageChange(e: any) {
    setSlippage(e.target.value);
  }

  function changeAmount(e) {
    setTokenOneAmount(e.target.value);
    console.log(prices);
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

  function modifyToken(i) {
    setPrices(null);
    setTokenOneAmount(null);
    setTokenTwoAmount(null);
    if (changeToken === 1) {
      setTokenOne(tokens[i]);
      fetchPrices(tokens[i], tokenTwo);
    } else {
      setTokenTwo(tokens[i]);
      fetchPrices(tokenOne, tokens[i]);
    }
  }

  async function createPair(one, two) {
    const tokenOneToken = new Token(ChainId.BASE, one.address, one.decimals);
    const tokenTwoToken = new Token(ChainId.BASE, two.address, two.decimals);
    const pairAddress = Pair.getAddress(tokenOneToken, tokenTwoToken);

    // router v2 02:  0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D
    // router v2 02 base:  0x4752ba5dbc23f44d87826276bf6fd6b1c372ad24
    // Setup provider, import necessary ABI ...
    const provider = new ethers.JsonRpcProvider(infura_api);

    const pairContract = new ethers.Contract(pairAddress, pair_abi, provider);

    const reserves = await pairContract["getReserves"]();
    const [reserve0, reserve1] = reserves;

    const tokens = [tokenOneToken, tokenTwoToken];
    const [token0, token1] = tokens[0].sortsBefore(tokens[1])
      ? tokens
      : [tokens[1], tokens[0]];
    const pair = new Pair(
      CurrencyAmount.fromRawAmount(token0, Number(reserve0)),
      CurrencyAmount.fromRawAmount(token1, Number(reserve1))
    );

    return pair;
  }

  async function fetchPrices(tokenOne, tokenTwo) {
    const tokenOneToken = new Token(
      ChainId.BASE,
      tokenOne.address,
      tokenOne.decimals
    );
    const tokenTwoToken = new Token(
      ChainId.BASE,
      tokenTwo.address,
      tokenTwo.decimals
    );
    const pair = await createPair(tokenOneToken, tokenTwoToken);
    const route = new Route([pair], tokenOneToken, tokenTwoToken);
    const tokenOnePrice = route.midPrice.toSignificant(6);
    const tokenTwoPrice = route.midPrice.invert().toSignificant(6);

    const ratio = tokenOnePrice;
    console.log(tokenOnePrice, tokenTwoPrice, ratio);
    setPrices({
      tokenOne: tokenOnePrice,
      tokenTwo: tokenTwoPrice,
      ratio: ratio,
    });
  }

  const confirmCoin = (coin: any) => {
    const chooseToken = tokens.filter((token) => token.address === coin);

    console.log(coin, chooseToken);
    if (openType === "one") {
      setTokenOne(chooseToken[0]);
    } else if (openType === "two") {
      setTokenTwo(chooseToken[0]);
    }
    onClose();
  };

  async function approveToken(tokenAddress, amount) {
    console.log(
      "approve token called, token: " + tokenAddress + " with amount: " + amount
    );
    const tokenABI = [
      {
        inputs: [
          { internalType: "address", name: "spender", type: "address" },
          { internalType: "uint256", name: "value", type: "uint256" },
        ],
        name: "approve",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
      },
    ];

    writeContract(
      {
        address: tokenAddress,
        abi: tokenABI,
        functionName: "approve",
        args: ["0x4752ba5dbc23f44d87826276bf6fd6b1c372ad24", amount],
      },
      {
        onSuccess: (tx) => {
          // messageApi.info("Transaction is successful!" + tx.hash);
          setTxDetails({
            to: tx.to,
            data: tx.data,
            value: tx.value,
          });
        },
        onError: (error) => {
          console.log("🚀 ~ fetchDexSwap ~ error:", error.message);
          // messageApi.error(error.shortMessage);
        },
      }
    );
  }

  async function fetchDexSwap() {
    const tokenOneToken = new Token(
      ChainId.BASE,
      tokenOne.address,
      tokenOne.decimals
    );
    const tokenTwoToken = new Token(
      ChainId.BASE,
      tokenTwo.address,
      tokenTwo.decimals
    );
    // See the Fetching Data guide to learn how to get Pair data
    // const pair = await createPair(tokenOneToken, tokenTwoToken);

    const pair = new Pair(
      CurrencyAmount.fromRawAmount(
        tokenOneToken,
        formatTokenAmount(tokenOneAmount, tokenOne.decimals)
      ),
      CurrencyAmount.fromRawAmount(
        tokenTwoToken,
        formatTokenAmount(tokenTwoAmount, tokenTwo.decimals)
      )
    );
    const route = new Route([pair], tokenOneToken, tokenTwoToken);

    const amountIn = formatTokenAmount(tokenOneAmount, tokenOne.decimals);

    const trade = new Trade(
      route,
      CurrencyAmount.fromRawAmount(tokenOneToken, amountIn),
      TradeType.EXACT_INPUT
    );

    // const slippageTolerance = new Percent(slippage * 100, "10000"); // 1, 2.5, 5

    // const amountOutMin = trade.minimumAmountOut(slippageTolerance).toExact(); // needs to be converted to e.g. decimal string

    const tokenTwoOut = (
      (Number(tokenTwoAmount) * (100 - slippage)) /
      100
    ).toString();

    const amountOutMin = formatTokenAmount(tokenTwoOut, tokenTwo.decimals);

    const path = [tokenOneToken.address, tokenTwoToken.address];
    const to = account.address; // should be a checksummed recipient address
    const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from the current Unix time

    console.log(amountIn, amountOutMin, path, to, deadline);
    await approveToken(tokenOne.address, amountIn);
    writeContract(
      {
        address: "0x4752ba5dbc23f44d87826276bf6fd6b1c372ad24",
        abi: router_abi,
        functionName: "swapExactTokensForTokens",
        args: [amountIn, amountOutMin, path, to, deadline],
      },
      {
        onSuccess: (tx) => {
          // messageApi.info("Transaction is successful!" + tx.hash);
          setTxDetails({
            to: tx.to,
            data: tx.data,
            value: tx.value,
          });
        },
        onError: (error) => {
          console.log("🚀 ~ fetchDexSwap ~ error:", error.message);
          // messageApi.error(error.shortMessage);
        },
      }
    );
  }

  useEffect(() => {
    fetchPrices(tokens[0], tokens[1]);
  }, []);

  const openHandle = (type: string) => {
    setOpenType(type);
    onOpen();
  };

  const Coins = ({ type, token }: any) => (
    <div className="flex items-center">
      <Button color="primary" size="sm" onPress={() => openHandle(type)}>
        {token ? token.ticker : "Select Token"}
      </Button>
    </div>
  );

  return (
    <>
      <div className="flex gap-8 mt-8">
        <Snippet hideCopyButton hideSymbol className="py-4" variant="bordered">
          <div className="mb-4 w-100">
            <Input
              className="h-16"
              endContent={<Coins token={tokenOne} type="one" />}
              labelPlacement="outside"
              placeholder="0.00"
              size="lg"
              type="number"
              value={tokenOneAmount || ""}
              onChange={changeAmount}
            />
          </div>
          <div className="w-100">
            <Input
              endContent={<Coins token={tokenTwo} type="two" />}
              labelPlacement="outside"
              placeholder="0.00"
              size="lg"
              type="number"
              value={tokenTwoAmount || ""}
            />
          </div>

          <div className="w-100 flex items-center justify-center mt-4">
            <Button color="danger" onPress={fetchDexSwap}>
              SWAP
            </Button>
          </div>
        </Snippet>
      </div>

      <Modal
        isOpen={isOpen}
        size="sm"
        onClose={onClose}
        onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Select A Token
              </ModalHeader>
              <ModalBody className="pb-6">
                <ScrollShadow hideScrollBar className="w-[100%] h-[400px]">
                  <Listbox aria-label="Actions" onAction={confirmCoin}>
                    {tokens.map((token) => (
                      <ListboxItem
                        key={token.address}
                        className="px-0"
                        textValue={token.name}>
                        <User
                          avatarProps={{
                            isBordered: true,
                            radius: "lg",
                            src: token.img,
                          }}
                          className="p-2"
                          description={token.name}
                          name={token.ticker}
                        />
                      </ListboxItem>
                    ))}
                  </Listbox>
                </ScrollShadow>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
