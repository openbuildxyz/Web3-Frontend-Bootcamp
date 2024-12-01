import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEthers } from './components/EthersContext';

// import './App.css'
import Navigator from './components/Navigator';
import Home from './components/Home';
import Mint from './components/Mint';
import Collection from './components/Collection'
import Mynft from './components/Mynft';
import Faucet from './components/Faucet';
import { tokenAbi } from './abi/tokenAbi';
import { Contract, formatUnits } from 'ethers';

const FCOIN_ADDRESS = import.meta.env.VITE_FCOIN_ADDRESS;

function App() {
  const { provider, signer } = useEthers();  
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (signer) {
      getSignerAddress()
    }
  }, [signer]);

  useEffect(() => {
    if (provider && address) {
      updateBalance()
    }
  }, [provider, address]);

  const getSignerAddress = async () => {
    let _address = await signer.getAddress();
    setAddress(_address)
  }

  const updateBalance = async () => {
    const token =  new Contract(FCOIN_ADDRESS, tokenAbi, provider);
    try {
      const _balance = await token.balanceOf(address);
      const formatBalance = formatUnits(_balance, 18);
      setBalance(formatBalance)
    } catch(error) {
      console.log(`getBalance error: ${error.message}`)
    }
  }

  return (
    <div className='app'>
      
      <Router>
        <Navigator address={address} balance={balance}></Navigator>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/Mint' element={<Mint></Mint>}></Route>
          <Route path='/MyNFT' element={<Mynft address={address}></Mynft>}></Route>
          <Route path='/collection' element={<Collection updateBalance={updateBalance}/>}></Route>
          <Route path='/faucet' element={<Faucet updateBalance={updateBalance}></Faucet>}></Route>
        </Routes>
      </Router>
      
    </div>
  )
}

export default App
