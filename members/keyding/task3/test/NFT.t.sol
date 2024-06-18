// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "forge-std/Test.sol";
import "../src/NFT.sol";

contract CavenNFTTest is Test {
    CavenNFT public nft;
    string public tokenURI = "https://caven.dev";

    function setUp() public {
        nft = new CavenNFT();
    }

    function testInitMinting() public {
        uint256 tokenId = nft.mint(address(this), tokenURI);

        // Check if the tokenId is 0
        assertEq(tokenId, 0);
        // Check if the owner is the current contract
        assertEq(nft.ownerOf(tokenId), address(this));
        // Check if the URI is correct
        assertEq(nft.tokenURI(tokenId), tokenURI);
    }

    function testOnlyOwnerCanMint() public {
        // Trying to mint NFT using a non-owner address
        address nonOwner = address(0xBEEF);
        vm.expectRevert("Ownable: caller is not the owner");
        require(address(this) == nonOwner, "Ownable: caller is not the owner");
        nft.mint(nonOwner, tokenURI);

        // Mint NFT using the owner's address
        uint256 tokenId = nft.mint(address(this), tokenURI);
        assertEq(tokenId, 1);
        assertEq(nft.ownerOf(tokenId), address(this));
        assertEq(nft.tokenURI(tokenId), tokenURI);
    }
}
