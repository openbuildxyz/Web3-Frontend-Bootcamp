import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

function Header() {

  return (
    <header className="header-cls">
      <div className="leftH">
      </div>
      <div className="rightH">
        <div className="headerItem">
          {/* <img src={Base} alt="base" className="eth" /> */}
          Base Chain 展示 Demo
        </div>
        <ConnectButton />
      </div>
    </header>
  );
}

export default Header;
