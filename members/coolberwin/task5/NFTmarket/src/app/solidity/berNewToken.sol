// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BerNewToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("BerNewToken", "BNTK") {
        _mint(msg.sender, initialSupply);
    }
}
