// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "forge-std/Test.sol";
import "../src/Token.sol";

contract TokenTest is Test {
    SnowToken public token;

    // Execute before each test
    function setUp() public {
        token = new SnowToken();
    }

    // Check if the initial supply is correct.
    function testInitialSupply() public view {
        assertEq(token.totalSupply(), 1000000 * 10 ** token.decimals());
    }

    // Test minting new tokens
    function testMintTokens() public {
        address recipient = address(0xBEEF);
        uint256 amount = 500 * 10 ** token.decimals();

        token.mint(recipient, amount);
        assertEq(token.balanceOf(recipient), amount);
    }
}
