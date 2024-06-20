// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// transaction hash: 0xe5213889dfd478330442fdd738646e1a22b8404722842ec494496dece5896c2d
// contract hash 0x8bbce772d4b0Ab871bD3558de1D7A8E8A59A1D31

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract ERC20Token is ERC20 {
    constructor(uint256 initSupply) ERC20('LemToken', 'LEM') {
        _mint(msg.sender, initSupply);
    }
}