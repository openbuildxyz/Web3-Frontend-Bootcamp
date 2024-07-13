import React from "react";
import Logo from "../moralis-logo.svg";
// import Base from "../base-logo.svg";
import { Link } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";

function Header() {

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
          {/* <img src={Base} alt="base" className="eth" /> */}
          Base Chain
        </div>
        <ConnectButton />
      </div>
    </header>
  );
}

export default Header;