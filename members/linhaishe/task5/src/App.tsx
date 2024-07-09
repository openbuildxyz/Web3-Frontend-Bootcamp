import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { BigNumber, ethers } from 'ethers';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MarketAbi from './backend/contractsData/Market.json';
import MarketAddress from './backend/contractsData/Market-address.json';
import NFTMAbi from './backend/contractsData/NFTM.json';
import NFTMAddress from './backend/contractsData/NFTM-address.json';
import SadMonkeyAbi from './backend/contractsData/SadMonkey.json';
import SadMonkeyAddress from './backend/contractsData/SadMonkey-address.json';
import { getNfts } from './utils';
import Nav from './components/Nav';
import Home from './components/Home';
import Create from './components/Create';
import OwnedPage from './components/OwnedPage';
import Loading from './components/Loading';

import './App.css';

function App() {
  const { address } = useAccount();
  const [nft, setNFT] = useState({});
  const [marketplace, setMarketplace] = useState<any>({});
  const [erc20Contract, setErc20Contract] = useState({});
  const [marketNftLists, setMarketNftLists] = useState([]);
  const [userNftLists, setUserNftLists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function transformData(dataFromAlchemy, dataFromContract) {
    // 使用 map 方法遍历原始数组，并返回新的对象数组
    const transformedArray = dataFromAlchemy.map((item) => {
      return {
        itemId: item.itemId,
        tokenId: item.tokenId,
        seller: item.seller,
        owner: item.owner,
        price: item.price,
        isSold: item.isSold,
        isUpForSale: item.isUpForSale,
        exists: item.exists,
        listingTimestamp: item.listingTimestamp,
        createdTimestamp: item.createdTimestamp,
      };
    });

    // 使用 map 方法遍历 transformedArray，并将匹配的 oriData2 数据合并
    const finalData = transformedArray.map((item1) => {
      const matchedItem = dataFromContract.find((item2) => {
        return BigNumber.from(item1.tokenId._hex.toString()).eq(
          item2?.id?.tokenId
        );
      });

      if (matchedItem) {
        return {
          ...item1,
          ...matchedItem,
        };
      } else {
        return item1;
      }
    });
    return finalData;
  }

  const getNftLists = async (marketAddress, walletAddress) => {
    if (!marketAddress || !walletAddress) {
      return;
    }

    if (marketAddress) {
      const res: any = await getNfts(marketAddress);
      const originalRes = await marketplace?.getAllMarketItems();
      const results = transformData(originalRes, res?.ownedNfts);
      setMarketNftLists(results);
    }

    if (walletAddress) {
      const res: any = await getNfts(walletAddress);
      setUserNftLists(res?.ownedNfts);
    }
  };

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // Set signer
    const signer = provider.getSigner();
    const marketplace = new ethers.Contract(
      MarketAddress.address,
      MarketAbi.abi,
      signer
    );
    const nft = new ethers.Contract(NFTMAddress.address, NFTMAbi.abi, signer);
    const erc20 = new ethers.Contract(
      SadMonkeyAddress.address,
      SadMonkeyAbi.abi,
      signer
    );
    setMarketplace(marketplace);
    setNFT(nft);
    setErc20Contract(erc20);
  }, []);

  useEffect(() => {
    getNftLists(marketplace.address, address);
  }, [marketplace, address]);

  return (
    <BrowserRouter>
      <div className='App'>
        <>
          <Nav />
        </>
        <div>
          <Routes>
            <Route
              path='/'
              element={
                <Home
                  marketplace={marketplace}
                  nft={nft}
                  erc20Contract={erc20Contract}
                  marketNftLists={marketNftLists}
                  userNftLists={userNftLists}
                  address={address}
                />
              }
            />
            <Route
              path='/create'
              element={
                <Create
                  marketplace={marketplace}
                  nft={nft}
                  erc20Contract={erc20Contract}
                  setIsLoading={setIsLoading}
                />
              }
            />
            <Route
              path='/owned'
              element={
                <OwnedPage
                  marketplace={marketplace}
                  erc20Contract={erc20Contract}
                  nft={nft}
                  userNftLists={userNftLists}
                  marketNftLists={marketNftLists}
                  address={address}
                  setIsLoading={setIsLoading}
                />
              }
            />
          </Routes>
        </div>
        <Loading isLoading={isLoading} />
      </div>
    </BrowserRouter>
  );
}

export default App;
