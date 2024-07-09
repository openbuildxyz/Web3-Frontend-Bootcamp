'use client'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import Header from './components/ui/Header'
import NFTForm from './components/ui/NFTForm'

export default function Home() {
  const { address } = useAccount()

  //上架NFT
  return (
    <div className="flex flex-col justify-center items-center ">
      <div>
        <ConnectButton />
      </div>
      <div className="container mx-auto">
        <Header address={address}></Header>
      </div>
      <br />
      <div className="container mx-auto">
        <NFTForm address={address}></NFTForm>
      </div>
    </div>
  )
}
