// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// contract hash 0x82cfE8B3752FD23441174424dB8E24356E30B50E

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract ERC20Token is ERC20 {
    constructor(uint256 initSupply) ERC20('LemToken', 'LEM') {
        _mint(msg.sender, initSupply);
    }
}