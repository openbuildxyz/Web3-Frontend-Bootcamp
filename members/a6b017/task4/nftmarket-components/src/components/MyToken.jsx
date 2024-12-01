import { useEffect, useMemo, useState } from "react";
import { useBalance, useWaitForTransactionReceipt, useReadContract, useWriteContract, useReadContracts } from 'wagmi'
import ftContractAbi from './contracts/FT.json'
import nftContractAbi from './contracts/NFT.json'
import { Information, Widget, Input, Button } from '@web3uikit/core';
import { formatUnits } from 'viem';
import { ethers } from 'ethers';
import nftContractAbiJson from './contracts/NFT.json'
import ftContractAbiJson from './contracts/NFT.json'




function MyToken({ getMetamaskAccount }) {

  let result = getMetamaskAccount
  let metaMaskAddr = result?.tokenAddress

  const userETHBalance = useBalance({
    address: metaMaskAddr,
  })

  const [myft, setMyft] = useState({
    ftContractAdddr: '0xa442DC529a293Cf72DccbFb46f929096D591E95d',
    ftTyper: 'ERC20',
    ftName: 'USDx',
    ftBalance: '0',
  })
  const [mynft, setMynft] = useState({
    nftContractAdddr: '0x905278fA586a5852612f271C380905fc9e2FD6a8',
    nftTyper: 'ERC721',
    nftName: 'Mountain',
    nftBalance: '0',
  })
  const {
    data: balances,
    error: err,
    isPending: isReading } = useReadContracts({
      contracts: [
        {
          address: myft.ftContractAdddr,
          abi: ftContractAbiJson.abi,
          functionName: 'balanceOf',
          args: [metaMaskAddr],
        },
        {
          address: mynft.nftContractAdddr,
          abi: nftContractAbiJson.abi,
          functionName: 'balanceOf',
          args: [metaMaskAddr],
        },
      ],
    })

  //const [balanceOfft, balanceOfnft] = balances || []

  useEffect(() => {
    //console.log(Date(), balances, isReading, err)
    if (!isReading) {
      let res1 = balances[0].result
      let res2 = balances[1].result
      if (res1 != undefined) {
        setMyft({
          ...myft,
          ftBalance: formatUnits(res1, 18),
        })
        console.log(Date(), balances, isReading, myft)
      }
      if (res2 != undefined) {
        setMynft({
          ...mynft,
          nftBalance: res2.toString(),
        })
        console.log(Date(), balances, isReading, mynft)
      }
    }
  }, [balances, isReading, err])



  const { data: hash, isPending, writeContract } = useWriteContract()

  async function nftMint() {
    writeContract({
      abi: nftContractAbiJson.abi,
      address: mynft.nftContractAdddr,
      functionName: 'mintTo',
      args: [metaMaskAddr],
    })
    console.log(Date(), 'NftMint nftContractAdddr metaMaskAddr', mynft.nftContractAdddr, metaMaskAddr)
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })

  return (
    <>
      <section style={{ display: 'flex', gap: '20px' }}>
        <Widget
          info={userETHBalance.data?.formatted}
          title="BALANCE">
          <div>ETH</div>
        </Widget>
      </section>

      <section style={{ display: 'flex', gap: '20px' }}>
        <Widget style={{
          justifyContent: 'left',
          alignItems: 'left'
        }}>
          <Input
            width='400px'
            hasCopyButton
            label="FT Contract Address"
            placeholder="0x..."
            value={myft.ftContractAdddr}
            onChange={(e) => {
              setMyft(e.target.value)
              console.log(Date(), 'Mytoken input onChange ftContractAdddr', myft.ftContractAdddr)
            }}
          />
        </Widget>
        <Widget
          info={myft.ftBalance}
          title="Balance">
          <div>{myft.ftName}</div>
        </Widget>

      </section>
      <section style={{ display: 'flex', gap: '20px' }}>
        <Widget
          style={{
            justifyContent: 'left',
            alignItems: 'left'
          }}>
          <Input
            width='400px'
            hasCopyButton
            label="NFT Contract Address"
            placeholder="0x..."
            value={mynft.nftContractAdddr}
            onChange={(e) => {
              setMyft(e.target.value)
              console.log(Date(), 'Mytoken input onChange nftContractAdddr', mynft.nftContractAdddr)
            }}
          />
        </Widget>
        <Widget
          info={mynft.nftBalance}
          title="NFT Balance">
          <div>{mynft.nftName}</div>
        </Widget>
        <Widget
          style={{
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Button
            text={isPending ? 'NFT Confirming...' : 'NFT Mint'}
            onClick={() => {
              nftMint()
              console.log(Date(), 'NftMint Button onClick')
            }}
          >
          </Button>
          <div>
            {hash && <div>Transaction Hash: {hash}</div>}
            {isConfirming && <div>Waiting for confirmation...</div>}
            {isConfirmed && <div>Transaction confirmed.</div>}
          </div>
        </Widget>
      </section>

    </>
  );
}
export default MyToken;

/*
  // 定义RPC URL
  let rpcURL = 'https://eth-sepolia.g.alchemy.com/v2/GLrYpfor7iSH-dAwnvTNEDjWaagWnxmm';


  let ftContractAdddr = '0xa442DC529a293Cf72DccbFb46f929096D591E95d'
  let nftContractAdddr = '0x905278fA586a5852612f271C380905fc9e2FD6a8'
  

  let provider = new ethers.JsonRpcProvider(rpcURL)
  let ftContract = new ethers.Contract(ftContractAdddr, ftContractAbi.abi, provider)
  let nftContract = new ethers.Contract(nftContractAdddr, ftContractAbi.abi, provider)

    const getErc20Account = async (userErc20Address) => {
    //erc20TokenHoldings.tokenName = await ftContract.symbol()
    const tokenBalance = await ftContract.balanceOf(userErc20Address)
    const tokenBalanceFormat = formatUnits(tokenBalance, 18)
    //console.log(tokenBalanceFormat)
    return tokenBalanceFormat
  }

  const getRrc721Account = async (userErc721Address) => {
    const tokenBalance = await nftContract.balanceOf(userErc721Address)
    //console.log('getRrc721Account',tokenBalance)
    const tokenBalanceFormat = tokenBalance.toString()
    //console.log(tokenBalance,tokenBalanceFormat)
    //console.log('getRrc721Account', tokenBalance, tokenBalanceFormat)
    return tokenBalanceFormat
  }

    getErc20Account(metaMaskAddr).then(res => {
    setMyft({
      tokenTyper: 'ERC20',
      tokenName: 'USDx',
      tokenBalance: res,
    })
  })

  getRrc721Account(metaMaskAddr).then(res => {
    setMynft({
      tokenTyper: 'ERC721',
      tokenName: 'Mountain',
      tokenBalance: res,
    })
  })



  getAccount(useAddr).then(res => {
    erc20TokenHoldings.tokenBalance = res
    console.log(erc20TokenHoldings)
  })

  const userFTBalance = (address) => {
    const ftBalance = useReadContract({
      abi: ftContractAbi,
      address: ftContractAdddr,
      functionName: 'balanceOf',
      args: [address],
    })
 
    return ftBalance?.data
  }
  const {data: myview} = userFTBalance(useAddr)

  const resultBalanceOf = useReadContract({
    abi: ftContractAbi,
    address: ftContractAdddr,
    functionName: 'balanceOf',
    args: [useAddr],
  })

  const result = useBalance({
    address: useAddr,
  });
  console.log('useBalance', result.data);

  const result2 = useReadContract({
    abi: ftContractAbi.abi,
    address: ftContractAdddr,
    functionName: 'totalSupply',
    query: {
      refetchInterval: 3000,
    },
  })

  console.log('useReadContract totalSupply', result2.data);


  const balance = useReadContract({
    abi: ftContractAbi.abi,
    address: ftContractAdddr,
    functionName: 'balanceOf',
    args: [useAddr],
  })

  console.log('useReadContract balanceOf', balance.data);
*/
