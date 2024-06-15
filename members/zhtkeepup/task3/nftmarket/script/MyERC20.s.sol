// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";

import {MyNFTMarket} from "../src/MyNFTMarket.sol";
import {MyERC20} from "../src/MyERC20.sol";
import {MyERC721} from "../src/MyERC721.sol";

contract MyERC20Script is Script {
    function setUp() public {}

    function run() public {
        vm.broadcast();

        MyERC20 token = new MyERC20(); // 0xd2A47929bF04DDc586ec3C2DDa7d56EbF3D2d225
    }
}

/*
forge script script/MyERC20.s.sol:MyERC20Script  --private-key 0x...e709 --etherscan-api-key ...E5R5 --broadcast --rpc-url https://eth-sepolia.g.alchemy.com/v2/...dfqW --slow --via-ir --legacy --verify

*/
