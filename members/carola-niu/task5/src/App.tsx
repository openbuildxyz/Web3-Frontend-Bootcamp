import React from 'react';
import './App.css';
import BuyNFT from './components/BuyNFT';
import ListNFT from './components/ListNFT';
import MintNFT from './components/MintNFT';
import ConnectWallet from './components/ConnectWallet';

function App() {
  return (
    <div className="App">
        <h1>NFT Market Demo🔮</h1>
        <ConnectWallet />
        <MintNFT />
        <ListNFT />
        <BuyNFT />
    </div>
  );
}

export default App;
