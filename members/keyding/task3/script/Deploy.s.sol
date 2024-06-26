//  SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "forge-std/Script.sol";
import "../src/Token.sol";
import "../src/NFT.sol";
import "../src/Marketplace.sol";

// Deploy CavenToken contract
contract DeployToken is Script {
    function setUp() public {}

    function run() public {
        vm.startBroadcast();
        new CavenToken();
        vm.stopBroadcast();
    }
}

// Deploy CavenNFT contract
contract DeployNFT is Script {
    function setUp() public {}

    function run() public {
        vm.startBroadcast();
        new CavenNFT();
        vm.stopBroadcast();
    }
}

// Deploy CavenNFTMarketplace contract
contract DeployNFTMarketplace is Script {
    address tokenContract = vm.envAddress("TOKEN_CONTRACT_ADDRESS");

    function setUp() public {}

    function run() public {
        vm.startBroadcast();
        // !!! CavenToken Contract Address
        new CavenNFTMarketplace(IERC20(tokenContract));
        vm.stopBroadcast();
    }
}
