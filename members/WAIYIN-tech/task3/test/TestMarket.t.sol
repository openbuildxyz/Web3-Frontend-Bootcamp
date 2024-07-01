// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test, console} from "forge-std/Test.sol";
import {DeployMarket} from "../script/DeployMarket.s.sol";
import {DeployWNft} from "../script/DeployWNft.s.sol";
import {Market} from "../src/Market.sol";
import {WNft} from "../src/WNft.sol";
import {NftExchangeToken} from "../src/NftExchangeToken.sol";
import {ConfigHelper} from "../script/ConfigHelper.s.sol";

contract MarketTest is Test {
    DeployMarket public deployer;

    Market public s_market;
    address public s_owner;
    NftExchangeToken public s_token;
    WNft public s_nft;

    string public constant FAKE_NFT_URI = "data:application/json;base64,eyJuYW1lIjogIk1vb2RO";
    address public SELLER = makeAddr("SELLER");
    address public BUYER = makeAddr("BUYER");

    uint256 public constant INITIAL_AMOUNT = 20;
    uint256 public constant PRICE = 8;

    function setUp() public {
        deployer = new DeployMarket();
        ConfigHelper helper = new ConfigHelper();
        (s_market, s_token) = deployer.run();
        (, s_owner) = helper.activeNetworkConfig();

        s_nft = new DeployWNft().run();
    }

    function test_market() public {
        // prepare
        vm.startPrank(s_owner);
        s_token.mint(BUYER, INITIAL_AMOUNT);
        s_nft.register(BUYER);
        s_nft.register(SELLER);
        vm.stopPrank();

        assertEq(s_token.balanceOf(BUYER), INITIAL_AMOUNT);
        assertEq(s_token.balanceOf(SELLER), 0);

        // register nft
        vm.startPrank(SELLER);
        uint256 tokenId = s_nft.safeMint(FAKE_NFT_URI);
        // approve nft to market contract
        s_nft.approve(address(s_market), tokenId);

        assertEq(s_nft.tokenURI(tokenId), FAKE_NFT_URI);
        assertEq(s_nft.ownerOf(tokenId), SELLER);

        // launch nft
        vm.expectEmit(true, true, true, true);
        emit Market.Launch(SELLER, address(s_nft), tokenId, PRICE);
        s_market.launch(address(s_nft), tokenId, PRICE);

        assertEq(s_nft.ownerOf(tokenId), address(s_market));
        (address infoSeller, uint256 infoPrice) = s_market.s_shelve(address(s_nft), tokenId);
        assertEq(infoSeller, SELLER);
        assertEq(infoPrice, PRICE);
        vm.stopPrank();

        vm.startPrank(BUYER);
        // exchange to buy
        s_token.approve(address(s_market), PRICE);

        // buy
        vm.expectEmit(true, true, true, true);
        emit Market.Buy(address(s_nft), tokenId, BUYER, PRICE);
        s_market.buy(address(s_nft), tokenId);

        (infoSeller,) = s_market.s_shelve(address(s_nft), tokenId);
        assertEq(infoSeller, address(0));
        assertEq(s_nft.ownerOf(tokenId), BUYER);
        vm.stopPrank();

        assertEq(s_token.balanceOf(BUYER), INITIAL_AMOUNT - PRICE);
        assertEq(s_token.balanceOf(SELLER), PRICE);
        assertEq(s_token.totalSupply(), INITIAL_AMOUNT);
    }
}
