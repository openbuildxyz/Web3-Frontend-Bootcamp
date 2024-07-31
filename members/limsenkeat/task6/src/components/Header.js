import React from "react";
import Logo from "../logo.png";
import { Link } from "react-router-dom";
import { ConnectButton } from '@rainbow-me/rainbowkit';

function Header() {

	return (
		<header>
			<div className="leftH">
				<img src={Logo} alt="logo" className="logo" />
				<Link to="/" className="link">
				<div className="headerItem">Swap</div>
				</Link>
			</div>
			<div className="rightH">
				<ConnectButton />
			</div>
		</header>
	);
}

export default Header;
