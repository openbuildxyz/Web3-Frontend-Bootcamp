// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract ERC20Token is ERC20 {
    constructor(uint256 initSupply) ERC20('LemCoin', 'LEM') {
        require(initSupply > 9999, "Initial supply must be greater than 9999.");
        _mint(msg.sender, initSupply * 10 ** 2);
    }

    function  decimals() public view virtual override  returns (uint8) {
        return 2;
    }
}