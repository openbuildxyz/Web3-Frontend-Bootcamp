// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script, console} from "forge-std/Script.sol";

contract ConfigHelper is Script {
    uint256 public constant ANVIL_PRIVATE_KEY = 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80;
    address public constant ANVIL_DEPLOYER = address(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266);

    struct NetworkConfig {
        uint256 deployerKey;
        address deployer;
    }

    NetworkConfig public activeNetworkConfig;

    constructor() {
        if (block.chainid == 11155111) {
            activeNetworkConfig = getSepoliaEthConfig();
        } else {
            activeNetworkConfig = getLocalEnvConfig();
        }
    }

    function getSepoliaEthConfig() internal view returns (NetworkConfig memory) {
        return NetworkConfig({deployerKey: vm.envUint("PRIVATE_KEY"), deployer: vm.envAddress("DEPLOY_ADDRESS")});
    }

    function getLocalEnvConfig() internal pure returns (NetworkConfig memory) {
        // anvil
        return NetworkConfig({deployerKey: ANVIL_PRIVATE_KEY, deployer: ANVIL_DEPLOYER});
    }
}
