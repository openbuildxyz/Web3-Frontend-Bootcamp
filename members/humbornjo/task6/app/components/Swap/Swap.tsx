import { useWriteContract } from "wagmi";
import { Input } from "@nextui-org/react";
import { useState, useEffect } from "react";

import swap from "/swap.svg"
import money from "/money.svg"
import fresh from "/refresh.svg"
import tokenlist from "./token_list.json"
import { contract2Token, fetchErate, uniswapTrade } from "./uniwrapper";
import TokenSelection from "./TokenSelection";
import { useAccount } from "wagmi";


function Swap() {
  const account = useAccount()
  const [contractFrom, setContractFrom] = useState("")
  const [contractTo, setContractTo] = useState("")
  const [amountFrom, setAmountFrom] = useState("0.00")
  const [amountTo, setAmountTo] = useState("0.00")
  const [refresh, setRefresh] = useState(new Date())
  const { writeContract, isPending } = useWriteContract()

  const handleTokenFrom = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setContractFrom(e.target.value);
  };

  const handleTokenTo = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setContractTo(e.target.value);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      const tokenFrom = contract2Token(contractFrom)
      const tokenTo = contract2Token(contractTo)
      if (tokenFrom === undefined || tokenTo === undefined) {
        console.log("unknown token")
        return
      }
      if (tokenFrom == tokenTo) {
        console.log("same token")
        return
      }
      fetchErate(tokenFrom, tokenTo).then(rate => {
        console.log(rate, Number(amountFrom) * rate)
        setAmountTo(String((Number(amountFrom) * rate).toFixed(6)))
        clearTimeout(handler)
        console.log("finish fetching")
      }).catch(err => {
        clearTimeout(handler)
        console.log(`${err}: get exchange rate failed`)
      })
    }, 300)
    return () => {
      clearTimeout(handler)
    }
  }, [contractFrom, contractTo, amountFrom, refresh])

  const handleAmountFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmountFrom(e.target.value)
  }

  const handleAmountTo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmountTo(e.target.value)
  }

  const handleRefresh = () => {
    setRefresh(new Date())
  }

  const handleSwaping = () => {
    const contract0 = contractFrom
    const contract1 = contractTo

    setContractFrom(contract1)
    setContractTo(contract0)
    setAmountFrom(amountTo)
  }

  const handleTrade = () => {
    const tokenFrom = contract2Token(contractFrom)
    const tokenTo = contract2Token(contractTo)

    if (tokenFrom === undefined || tokenTo === undefined) {
      console.log("unknown token")
      return
    }
    if (tokenFrom == tokenTo) {
      console.log("same token")
      return
    }
    if (!account) {
      console.log("pls login first")
      return
    }
    console.log(tokenFrom.decimals)
    uniswapTrade(tokenFrom, tokenTo, amountFrom, account.address, writeContract).then(
      () => { }
    )
  }

  return (
    <div className="flex flex-col self-center justify-center items-center h-full">
      <div className="flex flex-col justify-around w-96 h-112 border-2 px-8 pt-8 rounded-xl border-zinc-400">
        <TokenSelection
          tokens={tokenlist}
          contract={contractFrom}
          handleChange={handleTokenFrom}
        />
        <Input
          size="lg"
          label=""
          value={amountFrom}
          onChange={handleAmountFrom}
          placeholder="0.00"
          labelPlacement="outside"
          endContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-lg">$</span>
            </div>
          }
        />
        <button
          onClick={handleSwaping}
          className="place-self-center bg-current text-white hover:scale-110 rounded-lg">
          <img src={swap} height={56} width={56} />
        </button>

        <TokenSelection
          tokens={tokenlist}
          contract={contractTo}
          handleChange={handleTokenTo}
        />
        <Input
          isDisabled
          size="lg"
          label=""
          value={amountTo}
          onChange={handleAmountTo}
          placeholder=""
          labelPlacement="outside"
          endContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-lg">$</span>
            </div>
          }
        />
        <div className="flex flex-row justify-between">
          <button
            onClick={handleRefresh}
            className="flex flex-row border-2 w-36 h-12 place-self-center p-4 rounded-xl my-4 bg-white hover:invert">
            <img src={fresh} className="w-8 h-8 self-center" />
            <b className="grow self-center">REFRESH</b>
          </button>
          <button
            disabled={isPending}
            onClick={handleTrade}
            className="flex flex-row border-2 w-36 h-12 place-self-center p-4 rounded-xl my-4 bg-white hover:invert">
            <img src={money} className="w-8 h-8 self-center" />
            <b className="grow self-center"> {isPending ? "Pending" : "SWAP"}</b>
          </button>
        </div>
      </div>
    </div >
  )
}

export default Swap
