// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {MyNFTMarket} from "../src/MyNFTMarket.sol";
import {MyERC20} from "../src/MyERC20.sol";
import {MyERC721} from "../src/MyERC721.sol";

contract MyNFTMarketTest is Test {
    MyNFTMarket public market;
    MyERC20 public token;
    MyERC721 public nft;

    address admin = address(0x1000);
    address user1 = address(0x1001);
    address user2 = address(0x1002);
    function setUp() public {
        deal(admin, 1e18);
        deal(user1, 1e18);
        deal(user2, 1e18);

        vm.startPrank(admin);

        token = new MyERC20();
        nft = new MyERC721();
        market = new MyNFTMarket(address(token), address(nft));

        token.mint(user1, 100 * 1e18);
        token.mint(user2, 200 * 1e18);

        nft.mint(user1, 1);

        console.log("market admin:", market.admin());
        vm.stopPrank();
    }

    function test_ListAndBuy() public {
        assertEq(nft.ownerOf(1), user1);

        vm.startPrank(user1);
        nft.approve(address(market), 1);
        market.list(1, 10 * 1e18);

        vm.startPrank(user2);
        token.approve(address(market), 10 * 1e18);
        market.buy(1, 10 * 1e18);

        console.log("nftId 1 's owner:", nft.ownerOf(1));
        console.log("user1's balance:", user1.balance);
        assertEq(nft.ownerOf(1), user2);
    }
}
