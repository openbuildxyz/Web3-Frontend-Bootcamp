// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import "../src/MyToken.sol";
import "../src/MyNFT.sol";
import "../src/NFTMarket.sol";

contract NFTMarketTest is Test {
    MyToken token;
    MyNFT nft;
    NFTMarket market;
    address owner;
    address addr1;
    address addr2;

    function setUp() public {
        owner = address(this);
        addr1 = vm.addr(1);
        addr2 = vm.addr(2);

        token = new MyToken(1000000);
        nft = new MyNFT();
        market = new NFTMarket(IERC20(address(token)), 10);

        nft.transferOwnership(owner);
    }

    function testMintAndListNFT() public {
        nft.mintNFT(owner);
        nft.setApprovalForAll(address(market), true);

        market.ListingNft(address(nft), 1, 100);

        (address seller, address nftContract, uint256 tokenId, uint256 price) = market.listings(1);

        assertEq(seller, owner);
        assertEq(nftContract, address(nft));
        assertEq(tokenId, 1);
        assertEq(price, 100);
    }

    function testBuyNFT() public {
        nft.mintNFT(owner);
        nft.setApprovalForAll(address(market), true);
        market.ListingNft(address(nft), 1, 100);

        token.transfer(addr1, 100);
        vm.startPrank(addr1);
        token.approve(address(market), 100);
        market.buyListingNft(1);
        vm.stopPrank();

        assertEq(nft.ownerOf(1), addr1);
    }
}
