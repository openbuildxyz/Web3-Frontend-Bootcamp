// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor(uint256 initSupply) ERC20("Jay0x", "JAY") {
        _mint(msg.sender, initSupply);
    }
}
