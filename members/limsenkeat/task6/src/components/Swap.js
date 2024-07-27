import React, { useState, useEffect } from "react";
import { Input, Popover, Radio, Modal, message } from "antd";
import { ArrowDownOutlined, DownOutlined, SettingOutlined } from "@ant-design/icons";
import tokenList from "../tokenList.json";
import { Route, Pair, Trade } from "@uniswap/v2-sdk";
import { ChainId, Token, CurrencyAmount, TradeType } from "@uniswap/sdk-core";
import { ethers } from "ethers";
import { baseRPC, pairABI, routerABI, tokenABI } from "../resource";
import { useAccount, useWriteContract } from "wagmi";


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
		to:null,
		data: null,
		value: null,
	}); 

	const { writeContract } = useWriteContract();
	const account = useAccount();
	const { data, sendTransaction } = {};
	const { isLoading, isSuccess } = ({
		hash: data?.hash,
	})

	function handleSlippageChange(e) {
		setSlippage(e.target.value);
	}

	function changeAmount(e) {
		setTokenOneAmount(e.target.value);
		if(e.target.value && prices){
			setTokenTwoAmount((e.target.value * prices.ratio).toFixed(6))
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

	const formatTokenAmount = (amount, decimals) => {
		const [integerPart, decimalPart = ""] = amount.split(".");
		let combined = integerPart + decimalPart;
		const paddingLength = decimals - decimalPart.length;
	
		if (paddingLength > 0) {
		combined = combined.padEnd(combined.length + paddingLength, "0");
		} else if (paddingLength < 0) {
		combined = combined.slice(0, paddingLength);
		}
	
		combined = combined.replace(/^0+/, "");
		// console.log("amount: " + amount + ", result: " + combined);
	
		return combined;
	};

	async function createPair(tokenOne, tokenTwo) {
		
		const tokenOneToken = new Token(tokenOne.chainId, tokenOne.address, tokenOne.decimals);
		const tokenTwoToken = new Token(tokenTwo.chainId, tokenTwo.address, tokenTwo.decimals);
		
		const provider = new ethers.providers.JsonRpcProvider(baseRPC);
		const pairAddress = Pair.getAddress(tokenOneToken, tokenTwoToken);
		const pairContract = new ethers.Contract(pairAddress, pairABI, provider);
		
		const reserves = await pairContract["getReserves"]();
		const [reserve0, reserve1] = reserves;

		const tokens = [tokenOneToken, tokenTwoToken]
		const [token0, token1] = tokens[0].sortsBefore(tokens[1]) ? tokens : [tokens[1], tokens[0]]

		const pair = new Pair(CurrencyAmount.fromRawAmount(token0, reserve0), CurrencyAmount.fromRawAmount(token1, reserve1))
		return pair
	}

	async function fetchPrices(tokenOne, tokenTwo){

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

		setPrices({
			tokenOne: tokenOnePrice,
			tokenTwo: tokenTwoPrice,
			ratio: ratio,
		});
	}

	async function approveToken(tokenAddress, amount) {

		const provider = new ethers.providers.JsonRpcProvider(baseRPC);
		const tokenContract = new ethers.Contract(tokenAddress, tokenABI, provider);
    	const currentAllowance = await tokenContract.allowance(account.address, "0x4752ba5dbc23f44d87826276bf6fd6b1c372ad24");
		const amountBN = ethers.BigNumber.from(amount);
		console.log(currentAllowance, amountBN, currentAllowance.lt(amountBN))
		if (currentAllowance.lt(amountBN)) {
			writeContract(
				{
					address: tokenAddress,
					abi: tokenABI,
					functionName: "approve",
					args: ["0x4752ba5dbc23f44d87826276bf6fd6b1c372ad24", amount],
				},
				{
					onSuccess: (tx) => {
						messageApi.info("Transaction is successful!" + tx.hash);
						setTxDetails({
							to: tx.to,
							data: tx.data,
							value: tx.value,
						});
					},
					onError: (error) => {
						console.log("Swap ERROR:", error.message);
						// messageApi.error(error.shortMessage);
					},
				}
			);
		}
	}

	async function fetchSwap(){

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
		const to = account.address; 
		const deadline = Math.floor(Date.now() / 1000) + 60 * 20; 
	
		// console.log(amountIn, amountOutMin, path, to, deadline);
		await approveToken(tokenOne.address, amountIn);
		writeContract(
			{
				address: "0x4752ba5dbc23f44d87826276bf6fd6b1c372ad24",
				abi: routerABI,
				functionName: "swapExactTokensForTokens",
				args: [amountIn, amountOutMin, path, to, deadline],
			},
			{
				onSuccess: (tx) => {
					messageApi.info("Transaction is successful!" + tx.hash);
					setTxDetails({
						to: tx.to,
						data: tx.data,
						value: tx.value,
					});
				},
				onError: (error) => {
					console.log("Swap Error:", error.message);
					// messageApi.error(error.shortMessage);
				},
			}
		);
	}

	useEffect(()=>{
		fetchPrices(tokenList[0], tokenList[1])
	}, [])

	useEffect(()=>{
		if(txDetails.to && account.isConnected){
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
	console.log(tokenOneAmount, tokenTwoAmount, account.isConnected)
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
			<div className="swapButton" disabled={!tokenOneAmount || !account.isConnected} onClick={fetchSwap}>Swap</div>
		</div>
		</>
	);
}

export default Swap;
