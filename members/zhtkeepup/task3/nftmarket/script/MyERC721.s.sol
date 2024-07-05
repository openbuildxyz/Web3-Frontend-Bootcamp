// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";

import {MyNFTMarket} from "../src/MyNFTMarket.sol";
import {MyERC20} from "../src/MyERC20.sol";
import {MyERC721} from "../src/MyERC721.sol";

contract MyERC721Script is Script {
    function setUp() public {}

    function run() public {
        vm.broadcast();

        MyERC721 nft = new MyERC721(); // 0x8463fe9F3d76c5CD2B15069ADb4796BDe44aC266
    }
}

/*
forge script script/MyERC721.s.sol:MyERC721Script  --private-key 0x...e709 --etherscan-api-key ...E5R5 --broadcast --rpc-url https://eth-sepolia.g.alchemy.com/v2/...dfqW --slow --via-ir --legacy --verify

*/
