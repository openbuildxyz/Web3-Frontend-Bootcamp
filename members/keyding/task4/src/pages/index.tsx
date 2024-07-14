"use client"

import { TabSwitch as Tabs } from "@/components/Tabs"
import { CopyRight } from "@/components/copyright"
import { Header } from "@/components/header"
import { ListNFT } from "@/components/list-nft/index"
import { MintNFT } from "@/components/mint-nft/index"
import { Empty } from "@/components/nft-list/empty"
import { type NFT, NFTList } from "@/components/nft-list/index"
import { Toaster } from "@/components/ui/sonner"
import { NFTMarketPlaceABI } from "@/lib/abi"
import { COLOR_TO_CLASS_MAP } from "@/lib/constants"
import Head from "next/head"
import { useEffect, useState } from "react"
import { useAccount, useReadContract } from "wagmi"

type ColorKeys = keyof typeof COLOR_TO_CLASS_MAP

const Colors = Object.keys(COLOR_TO_CLASS_MAP)

export default function Home() {
  const [nftList, setNFTList] = useState<NFT[]>([])
  const [tab, setTab] = useState(1)
  const { address } = useAccount()

  const {
    isLoading,
    data: allNtfs,
    refetch,
  } = useReadContract({
    abi: NFTMarketPlaceABI,
    address: process.env
      .NEXT_PUBLIC_NFT_MARKETPLACE_CONTRACT_ADDRESS as `0x${string}`,
    functionName: "getAllNfts",
  })

  useEffect(() => {
    if (!isLoading && allNtfs) {
      const _nftList = allNtfs
        .filter((item) => (tab === 1 ? item.isListed : item.owner === address))
        .map((item, index) => {
          return { ...item, color: Colors[index % Colors.length] as ColorKeys }
        })
      setNFTList(_nftList)
    }
  }, [isLoading, allNtfs, tab, address])

  const handleTabChange = (value: number) => {
    setTab(value)
    refetch()
  }

  return (
    <>
      <Head>
        <title>NFT MaaaaaRKET</title>
        <meta content="NFT Marketplace" name="description" />
        <link href="/favicon.svg" rel="icon" />
      </Head>
      <main className="w-full min-h-screen flex flex-col items-center relative">
        <Header />
        <div className="w-full max-w-screen-lg flex-1 pt-6">
          <div className="flex items-center justify-between">
            <Tabs value={tab} onChange={handleTabChange} />
            {!!address && !!nftList.length && (
              <div className="flex items-center justify-end gap-2">
                <MintNFT />
                <ListNFT onListed={() => refetch()} />
              </div>
            )}
          </div>
          {!isLoading && !nftList.length ? (
            <Empty onListed={refetch} />
          ) : (
            <NFTList
              loading={isLoading}
              data={nftList}
              onDelist={() => refetch()}
              onBuy={() => refetch()}
              onListed={() => refetch()}
            />
          )}
        </div>
        <CopyRight />
      </main>
      <Toaster position="top-center" richColors />
    </>
  )
}
