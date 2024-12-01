import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MarketAbi from './backend/contractsData/Market.json';
import MarketAddress from './backend/contractsData/Market-address.json';
import NFTMAbi from './backend/contractsData/NFTM.json';
import NFTMAddress from './backend/contractsData/NFTM-address.json';
import ZeroEggAbi from './backend/contractsData/ZeroEgg.json';
import ZeroEggAddress from './backend/contractsData/ZeroEgg-address.json';
import {
  getAllNFTMetadata,
  getNftandTokenIdPair,
  getNfts,
  transformData,
  mergeArraysByNFT,
} from './utils';
import Nav from './components/Nav';
import Home from './components/Home';
import Create from './components/Create';
import OwnedPage from './components/OwnedPage';
import Loading from './components/Loading';
import ListingPage from './components/ListingPage';

import './App.css';

function App() {
  const { address } = useAccount();
  const [nft, setNFT] = useState({});
  const [marketplace, setMarketplace] = useState<any>({});
  const [erc20Contract, setErc20Contract] = useState({});
  const [marketNftLists, setMarketNftLists] = useState<any>([]);
  const [userNftLists, setUserNftLists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getNftLists = async (marketAddress, walletAddress) => {
    if (!marketAddress || !walletAddress) {
      return;
    }
    if (marketAddress) {
      const originalRes = await marketplace?.getAllMarketItems();
      const _originalRes = transformData(originalRes);
      const idPair = getNftandTokenIdPair(originalRes);
      const metadataList = await getAllNFTMetadata(idPair);
      const mergeList = mergeArraysByNFT(metadataList, _originalRes);
      setMarketNftLists(mergeList);
    }

    if (walletAddress) {
      const res: any = await getNfts(walletAddress);
      setUserNftLists(res?.ownedNfts);
    }
  };

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const marketplace = new ethers.Contract(
      MarketAddress.address,
      MarketAbi.abi,
      signer
    );
    const nft = new ethers.Contract(NFTMAddress.address, NFTMAbi.abi, signer);
    const erc20 = new ethers.Contract(
      ZeroEggAddress.address,
      ZeroEggAbi.abi,
      signer
    );

    setMarketplace(marketplace);
    setNFT(nft); // set nft address only for create NFT
    setErc20Contract(erc20);
  }, []);

  useEffect(() => {
    getNftLists(marketplace.address, address);
  }, [marketplace, address]);

  return (
    <BrowserRouter>
      <div className='App'>
        <>
          <Nav address={address} />
        </>
        <div>
          <Routes>
            <Route
              path='/'
              element={
                <Home
                  marketplace={marketplace}
                  erc20Contract={erc20Contract}
                  marketNftLists={marketNftLists}
                  address={address}
                />
              }
            />
            <Route
              path='/owned'
              element={
                <OwnedPage
                  userNftLists={userNftLists}
                  marketplace={marketplace}
                  setIsLoading={setIsLoading}
                  marketNftLists={marketNftLists}
                  address={address}
                  erc20Contract={erc20Contract}
                />
              }
            />
            <Route
              path='/listing'
              element={
                <ListingPage
                  marketplace={marketplace}
                  erc20Contract={erc20Contract}
                  setIsLoading={setIsLoading}
                  address={address}
                />
              }
            />
            <Route
              path='/create'
              element={<Create nft={nft} setIsLoading={setIsLoading} />}
            />
          </Routes>
        </div>
        <Loading isLoading={isLoading} />
      </div>
    </BrowserRouter>
  );
}

export default App;
