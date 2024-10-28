import React from "react";
import Logo from "../moralis-logo.svg";
import Eth from "../eth.svg";
import { useAccount } from 'wagmi';
import { Connect } from "./Connect";
import { Account } from "./Account";

function Header() {
  const { isConnected } = useAccount();
  return (
    <header>
      <div className="leftH">
        <img src={Logo} alt="logo" className="logo" />
          <div className="headerItem">Swap</div>
      </div>
      <div className="rightH">
        <div className="headerItem">
          <img src={Eth} alt="eth" className="eth" />
          Ethereum
        </div>
        <div className="container">{isConnected ? <Account /> : <Connect />}</div>
      </div>
    </header>
  );
}

export default Header;
