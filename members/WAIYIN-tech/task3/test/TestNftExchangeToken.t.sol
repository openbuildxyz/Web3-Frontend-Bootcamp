// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test, console} from "forge-std/Test.sol";
import {NftExchangeToken} from "../src/NftExchangeToken.sol";

contract TokenTest is Test {
    NftExchangeToken public token;

    address public owner = makeAddr("OWNER");

    function setUp() public {
        token = new NftExchangeToken(owner);
    }

    function test_Mint() public {
        address user = makeAddr("USER_1");
        uint256 mintAmount = 10;

        vm.startPrank(owner);
        token.mint(user, mintAmount);
        vm.stopPrank();

        assertEq(token.balanceOf(user), mintAmount);
    }
}
