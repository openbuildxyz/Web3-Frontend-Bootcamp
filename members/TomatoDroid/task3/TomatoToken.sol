// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// Author: @TomatoDroid
contract TomatoToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("TomatoToken", "TAT") {
        _mint(msg.sender, initialSupply);
    }

    function decimals() public pure override returns (uint8) {
        return 9;
    }
}