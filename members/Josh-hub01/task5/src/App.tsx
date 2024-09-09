import React, { useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect, useReadContract } from "wagmi";
import { metaMask } from "wagmi/connectors";

import Divider from "@mui/material/Divider";

import CustomCard from "./components/CustomCard";
import List from "@mui/material/List";
import NFTMarketABI from "./ABI/market";
import NFTList from "./components/NFTList";

import { marketPlaceAddress } from "./utils";

function App() {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();

  const listingResponse = useReadContract({
    abi: NFTMarketABI,
    functionName: "getListedNFTs",
    address: marketPlaceAddress,
  });

  const listingNfts = listingResponse.data || [];

  return (
    <>
      <div>
        <h2>NFT Market</h2>

        {/* <div>
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br /> */}
        {/* chainId: {account.chainId} 
        </div>*/}

        {/* {account.status === "connected" && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )} */}
      </div>

      {/* {account.status === "disconnected" &&
        connectors.slice(-1).map((connector) => (
          <button key={connector.uid} onClick={() => connect({ connector })} type="button">
            {connector.name}
          </button>
        ))} */}
      {/* <div>{status}</div> */}
      {/* <div>{error?.message}</div> */}

      <div className="mb-40">
        <NFTList />
      </div>
      <Divider flexItem />
      <div className="list mt-40">
        {listingNfts.map((nft: any) => (
          <CustomCard info={nft} />
        ))}
      </div>
    </>
  );
}

export default App;
