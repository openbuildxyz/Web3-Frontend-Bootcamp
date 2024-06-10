// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "src/contract/ERC20.sol";
import "src/contract/NFTDemo.sol";
import "src/contract/Market.sol";

contract NFTDeploy is Script{

    function run() external {

        vm.startBroadcast();

        ERC20 erc20 = new ERC20("UJS","UJS");
        NFTDemo nftDemo = new NFTDemo("UJS","UJS");
        Market market = new Market(address(erc20));

        console.log("ERC20 deploy at ",address(erc20));
        console.log("NFTDemo deploy at ",address(nftDemo));
        console.log("market deploy at ",address(market));


        vm.stopBroadcast();
    }
}