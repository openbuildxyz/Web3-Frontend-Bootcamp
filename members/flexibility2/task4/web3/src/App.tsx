import "./App.css";

import { ConnectButton } from "@rainbow-me/rainbowkit";

import { Profile } from "./profile";
import ListNFT from "./ListNFT";

function App() {
  return (
    <>
      <ConnectButton />
      <Profile></Profile>
      <ListNFT></ListNFT>
    </>
  );
}

export default App;
