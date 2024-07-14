'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit'

import BalanceToken from './components/BalanceToken';
import NFTOrderList from './components/NFTOrderList';  // 确保路径正确
import AccountNFTs from './components/AccountNFTs';
function App() {
  const { address, isConnected, status } = useAccount();
  const { connectors, connect, error } = useConnect()
  const { disconnect } = useDisconnect()


  return (
    <>
      <div>
        <h1>NFT Market</h1>
        <ConnectButton />
        <h2>Account Details</h2>
        <div>
          status: {status}
          <br />
          addresses: {JSON.stringify(address)}
          <br />
          {isConnected && <BalanceToken address={address} />}
        </div>
        {isConnected && (
          <div>
            <h2>My NFTs</h2>
            <AccountNFTs />
          </div>
        )}
        <NFTOrderList address={address} />
        </div>
    </>
  );
}


export default App
