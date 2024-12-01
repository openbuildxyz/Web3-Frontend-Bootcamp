// import { useState } from 'react'
import { Profile } from './components/profile'
import { RainConnectButton } from './components/connect-button';
import { ReadContract } from "./components/read-contract";
import { NFTMarketList } from './components/nftmarket-list';
import { UseNFT } from './components/use-nft';
import './App.css'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <RainConnectButton></RainConnectButton>
      <Profile></Profile>
      <ReadContract></ReadContract>
      <NFTMarketList></NFTMarketList>
      <UseNFT></UseNFT>
    </>
  )
}

export default App
