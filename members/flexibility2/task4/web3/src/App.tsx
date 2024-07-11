import "./App.css";

import { ConnectButton } from "@rainbow-me/rainbowkit";

import { Profile } from "./profile";

function App() {
  return (
    <>
      <ConnectButton />
      <Profile></Profile>
    </>
  );
}

export default App;
