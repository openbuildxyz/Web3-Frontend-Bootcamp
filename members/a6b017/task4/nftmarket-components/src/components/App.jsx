import { useState, useEffect } from "react";
import Header from "./Header";
import MetaMask from "./Metamask";
import MyToken from "./MyToken";
import { TabList, Tab, Widget } from "@web3uikit/core";
import { useAccount } from "wagmi";
import NFTMarket from "./NftMarket";
import { NftListing } from "./NftListing";
import { NftBuy } from "./NftBuy";


export default function App() {

  const { address } = useAccount()

  const [metamaskAccount, setMetamaskAccount] = useState({})

  useEffect(() => {
    let account = {
      tokenTyper: 'ETH',
      tokenAddress: address,
    }
    setMetamaskAccount(account)
    console.log('App-useEffect-metamaskAccount', Date(), account)
  }, [address])


  return (
    <div className="container">
      <Header />

      <TabList
        defaultActiveKey={1}
        isWidthAuto
        onChange={function noRefCheck() { }}
        tabStyle="bar"
      >
        <Tab
          lineHeight={30}
          tabKey={1}
          tabName="My Token"
        >
          <div style={{ display: 'grid', gap: '20px', padding: '40px 20px' }}>
            <section style={{ display: 'flex', gap: '20px' }}>
              <Widget title="Metamask">
                <MetaMask />
              </Widget>
            </section>

            <MyToken getMetamaskAccount={metamaskAccount} />

          </div>

        </Tab>
        <Tab
          lineHeight={30}
          tabKey={2}
          tabName="NFT Listing"
        >
          <div>
            <NftListing/>
          </div>
        </Tab>

        <Tab
          lineHeight={30}
          tabKey={3}
          tabName="NFT Market"
        >
          <div>
            <NFTMarket />
          </div>
        </Tab>


        <Tab
          lineHeight={30}
          tabKey={4}
          tabName="NFT Buy"
        >
          <div>
            <NftBuy/>
          </div>
        </Tab>
      </TabList>

    </div>
  );
}