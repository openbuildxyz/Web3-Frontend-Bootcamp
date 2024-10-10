//SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

// Author: @TomatoDroid
// update
contract TomatoToken is ERC20 {
    constructor() ERC20("TomatoToken", "TAT") {
        _mint(msg.sender, 100 * 10 ** decimals());
        console.log("msg.sender %s balance %s", msg.sender, balanceOf(msg.sender));
    }

    function decimals() public pure override returns (uint8) {
        return 9;
    }
}