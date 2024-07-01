// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script, console} from "forge-std/Script.sol";
import {WNft} from "../src/WNft.sol";
import {ConfigHelper} from "./ConfigHelper.s.sol";

contract DeployWNft is Script {
    function run() public returns (WNft) {
        ConfigHelper helper = new ConfigHelper();
        (, address deployer) = helper.activeNetworkConfig();

        vm.startBroadcast();
        WNft nft = new WNft(deployer);
        vm.stopBroadcast();

        return nft;
    }
}
