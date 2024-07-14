import "./App.css";

import { ConnectButton } from "@rainbow-me/rainbowkit";

import { Profile } from "./profile";
import ListNFT from "./ListNFT";
import BuyList from "./BuyList";

function App() {
  return (
    <>
      <ConnectButton />
      <Profile></Profile>
      <ListNFT></ListNFT>
      <BuyList></BuyList>
    </>
  );
}

export default App;
