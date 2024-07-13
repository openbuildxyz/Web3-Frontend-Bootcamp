// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// Author: @flytam https://github.com/flytam
contract ByteDanceToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("ByteDanceToken", "BD") {
        _mint(msg.sender, initialSupply);
    }
}