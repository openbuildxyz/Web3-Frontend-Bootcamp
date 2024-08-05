import "./App.css";

import { ConnectButton } from "@rainbow-me/rainbowkit";

import ListNFT from "./ListNFT";
import BuyNFT from "./BuyNFT";
import Mint from "./Mint";

function App() {
  return (
    <>
      <ConnectButton />
      <Mint></Mint>
      <ListNFT></ListNFT>
      <BuyNFT></BuyNFT>
    </>
  );
}

export default App;
