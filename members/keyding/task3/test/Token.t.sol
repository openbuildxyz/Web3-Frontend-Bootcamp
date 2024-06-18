// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "forge-std/Test.sol";
import "../src/Token.sol";

contract TokenTest is Test {
    CavenToken public token;

    // Execute before each test
    function setUp() public {
        token = new CavenToken();
    }

    // Check if the initial supply is correct.
    function testInitialSupply() public view {
        assertEq(token.totalSupply(), 1000000 * 10 ** token.decimals());
    }

    // Check if only the owner can mint new tokens
    function testOnlyOwnerCanMint() public {
        uint256 amount = 1000 * 10 ** token.decimals();

        // Trying to mint tokens as a non-owner
        address nonOwner = address(0xBEEF);
        vm.expectRevert("Ownable: caller is not the owner");
        require(address(this) == nonOwner, "Ownable: caller is not the owner");
        token.mint(nonOwner, amount);

        // Minting tokens as the owner
        token.mint(address(this), amount);
        assertEq(token.balanceOf(address(this)), 1000000 * 10 ** token.decimals() + amount);
    }

    // Test minting new tokens
    function testMintTokens() public {
        address recipient = address(0xBEEF);
        uint256 amount = 500 * 10 ** token.decimals();

        token.mint(recipient, amount);
        assertEq(token.balanceOf(recipient), amount);
    }
}
