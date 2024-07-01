// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";

import {MyNFTMarket} from "../src/MyNFTMarket.sol";
import {MyERC20} from "../src/MyERC20.sol";
import {MyERC721} from "../src/MyERC721.sol";

contract MyNFTMarketScript is Script {
    function setUp() public {}

    function run() public {
        vm.broadcast();

        MyNFTMarket market = new MyNFTMarket(
            0xd2A47929bF04DDc586ec3C2DDa7d56EbF3D2d225,
            0x8463fe9F3d76c5CD2B15069ADb4796BDe44aC266
        );
        // 0x9c9648b2341831C6b5F8736d8d280D37aD3b1222
    }
}

/*
forge script script/MyNFTMarket.s.sol:MyNFTMarketScript  --private-key 0x...e709 --etherscan-api-key ...E5R5 --broadcast --rpc-url https://eth-sepolia.g.alchemy.com/v2/...dfqW --slow --via-ir --legacy --verify

*/
