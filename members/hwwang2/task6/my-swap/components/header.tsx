import React from "react";
import Logo from "../eth.svg";
import Link from 'next/link';
import Image from "next/image";
// import Base from "../base-logo.svg";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useConnect } from "wagmi";

function Header() {
    // useConnect()\\\
  return (
    <header>
      <div className="leftH">
        <Image src={Logo} alt="logo" className="logo" />
        {/* <img src={Logo} alt="logo" className="logo" /> */}
        <Link href="/" className="link">
          <div className="headerItem">Swap</div>
        </Link>
        <Link href="/lp" className="link">
          <div className="headerItem">My LP</div>
        </Link>
      </div>
      <div className="rightH">
        {/* <div className="headerItem">
          Base Chain
        </div> */}
        <ConnectButton />
      </div>
    </header>
  );
}

export default Header;
