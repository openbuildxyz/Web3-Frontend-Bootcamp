// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "forge-std/Test.sol";
import "forge-std/console.sol";
import "../src/NFT.sol";

contract SnowNFTTest is Test {
    SnowNFT public nft;

    address public lily = address(0x123);
    address public finn = address(0x456);

    function setUp() public {
        nft = new SnowNFT();
    }

    function testMinting() public {
        vm.prank(lily);
        uint256 lilyTokenId = nft.mint();
        // Check if the lilyTokenId is 0
        assertEq(lilyTokenId, 0);
        // Check if the lilyTokenId owner is lily
        assertEq(nft.ownerOf(lilyTokenId), lily);

        vm.prank(finn);
        uint256 finnTokenId = nft.mint();
        // Check if the finnTokenId is 1
        assertEq(finnTokenId, 1);
        // Check if the finnTokenId owner is finn
        assertEq(nft.ownerOf(finnTokenId), finn);
    }
}
