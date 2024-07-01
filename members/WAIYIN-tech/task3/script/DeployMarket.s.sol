// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script, console} from "forge-std/Script.sol";
import {Market} from "../src/Market.sol";
import {DeployNftExchangeToken} from "./DeployNftExchangeToken.s.sol";
import {NftExchangeToken} from "../src/NftExchangeToken.sol";

contract DeployMarket is Script {
    function run() public returns (Market, NftExchangeToken) {
        DeployNftExchangeToken deployToken = new DeployNftExchangeToken();
        NftExchangeToken token = deployToken.run();

        vm.startBroadcast();
        Market market = new Market(address(token));
        vm.stopBroadcast();

        return (market, token);
    }
}
