// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;


import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FT is ERC20 {
    event LogNewAlert(string description, address indexed _from, uint256 _n);
    constructor(uint256 initialSupply) ERC20("FT", "USDx") {
        _mint(msg.sender, initialSupply * 10 ** decimals());
    }
}