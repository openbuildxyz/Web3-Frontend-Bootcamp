// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// contract hash 0x82cfE8B3752FD23441174424dB8E24356E30B50E

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract ERC20Token is ERC20 {
    address public owner;
    constructor(uint256 initSupply) ERC20('LemToken', 'LEM') {
        owner = address(msg.sender);
        _mint(msg.sender, initSupply);
    }

    // 增发代币
    function increaseSupply(uint256 supplyAmount) public {
        require(msg.sender == owner, "IncreaseSupply should be owner");
        require(supplyAmount > 0, "Amount must be greater than 0");
        _mint(msg.sender, supplyAmount);
    }
}

// 给交易所授权多少个代币
// approve(marketAddress, value)