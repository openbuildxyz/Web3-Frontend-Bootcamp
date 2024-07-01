// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script, console} from "forge-std/Script.sol";
import {NftExchangeToken} from "../src/NftExchangeToken.sol";
import {ConfigHelper} from "./ConfigHelper.s.sol";

contract DeployNftExchangeToken is Script {
    function run() public returns (NftExchangeToken) {
        ConfigHelper helper = new ConfigHelper();
        (, address deployer) = helper.activeNetworkConfig();

        vm.startBroadcast();
        NftExchangeToken token = new NftExchangeToken(deployer);
        vm.stopBroadcast();

        return token;
    }
}
