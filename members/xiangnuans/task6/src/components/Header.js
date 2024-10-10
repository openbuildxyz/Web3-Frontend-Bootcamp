import { ConnectButton } from "@rainbow-me/rainbowkit";
import Eth from "../eth.svg";
import { Link } from "react-router-dom";
import Logo from "../moralis-logo.svg";
import React from "react";

function Header(props) {

  return (
    <header>
      <div className="leftH">
        <img src={Logo} alt="logo" className="logo" />
        <Link to="/" className="link">
          <div className="headerItem">Swap</div>
        </Link>
        <Link to="/tokens" className="link">
          <div className="headerItem">Tokens</div>
        </Link>
      </div>
      <div className="rightH">
        <div className="headerItem">
          <img src={Eth} alt="eth" className="eth" />
          Ethereum
        </div>
        <div className="connectButton">
          <ConnectButton />
        </div>
      </div>
    </header>
  );
}

export default Header;
