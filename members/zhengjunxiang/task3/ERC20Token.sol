// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// contract hash 0x818b34faa74944440d5f297c4881182b670855f4

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract ERC20Token is ERC20 {
    constructor(uint256 initSupply) ERC20('LemToken', 'LEM') {
        _mint(msg.sender, initSupply);
    }
}