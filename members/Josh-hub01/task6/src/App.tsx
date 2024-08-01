import React, { useEffect, useState } from "react";
import { ethers, parseUnits } from "ethers";
import { Config, getClient, watchContractEvent, writeContract } from "@wagmi/core";
import { type BaseError, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { JsonRpcProvider } from "ethers";

import { ConnectButton } from "@rainbow-me/rainbowkit";

import { ChainId, Token, WETH9, CurrencyAmount, TradeType, Percent } from "@uniswap/sdk-core";
import { Pair, Route, Trade } from "@uniswap/v2-sdk";

import "./App.css";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import uniswapV2poolABI from "../src/abi/uniswapV2poolABI";
import UniswapV2RouterABI from "../src/abi/UniswapV2Router02";
import tokenApproveABI from "../src/abi/tokenApproveABI";

import { config } from "../src/wagmi";

function clientToProvider(client: Client<Transport, Chain>) {
  const { chain, transport } = client;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  if (transport.type === "fallback") {
    const providers = (transport.transports as ReturnType<Transport>[]).map(({ value }) => new JsonRpcProvider(value?.url, network));
    if (providers.length === 1) return providers[0];
    return new FallbackProvider(providers);
  }
  return new JsonRpcProvider(transport.url, network);
}

function getEthersProvider(config: Config, { chainId }: { chainId?: number } = {}) {
  const client = getClient(config, { chainId });
  if (!client) return;
  return clientToProvider(client);
}

const chainId = ChainId.MAINNET;
const tokenAAddress = import.meta.env.VITE_DODO_ADDRESS;
const decimals = 18;

const tokenA = new Token(chainId, tokenAAddress, decimals);
const tokenB = WETH9[tokenA.chainId];

function App() {
  const [ratio, setRatio] = useState<number>(0);
  const [amountB, setAmountB] = useState<string>("0");
  const [amountA, setAmountA] = useState<string>("0");

  const generateRoute = async () => {
    async function createPair(tokenA: string, tokenB: string): Promise<Pair> {
      const pairAddress = Pair.getAddress(tokenA, tokenB);

      // Setup provider, import necessary ABI ...
      const provider = getEthersProvider(config, { chainId });
      const pairContract = new ethers.Contract(pairAddress, uniswapV2poolABI, provider);

      const reserves = await pairContract["getReserves"]();

      const [reserve0, reserve1] = reserves;

      const tokens = [tokenA, tokenB];
      const [token0, token1] = tokens[0].sortsBefore(tokens[1]) ? tokens : [tokens[1], tokens[0]];

      const pair = new Pair(CurrencyAmount.fromRawAmount(token0, Number(reserve0)), CurrencyAmount.fromRawAmount(token1, Number(reserve1)));
      return pair;
    }

    const pair = await createPair(tokenA, tokenB);

    const route = new Route([pair], tokenA, tokenB);

    return route;
  };

  const approveToken = async (tokenAddress: string, amountIn: number): string => {
    const hash = await writeContract(config, {
      abi: tokenApproveABI,
      address: tokenAddress,
      functionName: "approve",
      args: [import.meta.env.VITE_SENDER, parseUnits(amountIn, decimals)],
    });

    return hash;
  };

  const onSuccess = async (amountIn: string) => {
    const route = await generateRoute();

    const trade = new Trade(route, CurrencyAmount.fromRawAmount(tokenA, parseUnits(amountIn, decimals).toString()), TradeType.EXACT_INPUT);

    const slippageTolerance = new Percent("50", "10000"); // 50 bips, or 0.50%

    const amountOutMin = trade.minimumAmountOut(slippageTolerance).toExact(); // needs to be converted to e.g. decimal string
    const path = [tokenA.address, tokenB.address];
    const to = import.meta.env.VITE_RECEIVER; // should be a checksummed recipient address
    const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from the current Unix time
    const value = trade.inputAmount.toExact(); // // needs to be converted to e.

    console.log(value, amountIn, ethers.parseUnits(amountIn, decimals), ethers.parseUnits(amountOutMin), path, to, deadline);

    const result = await writeContract(config, {
      abi: UniswapV2RouterABI,
      address: import.meta.env.VITE_ROUTER_ADDRESS,
      functionName: "swapExactTokensForTokens",
      args: [ethers.parseUnits(amountIn, decimals), ethers.parseUnits(amountOutMin, decimals), path, to, deadline],
    });
    console.log(result);
  };

  const handleSwap = async () => {
    const amountIn = amountA;

    try {
      const hash = await approveToken(tokenA.address, amountIn);
      if (hash) {
        onSuccess(amountIn);
      }
    } catch (error) {
      console.log(error);
    } finally {
      onSuccess(amountIn);
    }
  };

  useEffect(() => {
    const init = async () => {
      const route = await generateRoute();
      setRatio(route.midPrice.toSignificant(6));
    };

    init();
  }, []);

  return (
    <>
      <Box component="section" pb={12}>
        <ConnectButton />
      </Box>
      <Stack
        component="form"
        sx={{
          width: "25ch",
        }}
        spacing={2}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-controlled"
          label="DODO"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const val = event.target.value.trim();
            if (val === "" || val === undefined) return;
            console.log(val, val * ratio);
            setAmountB(val * ratio)?.toFixed(6);
            setAmountA(val);
          }}
        />
        <TextField id="outlined-uncontrolled" label="ETH" value={amountB} />
        <div> DODO / ETH: {ratio}</div>
        <Button variant="contained" onClick={handleSwap}>
          Swap
        </Button>
      </Stack>
    </>
  );
}

export default App;
