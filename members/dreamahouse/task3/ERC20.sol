// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract HRToken is ERC20, Ownable {
    constructor(address initialOwner)
        ERC20("HRToken", "HRK")
        Ownable(initialOwner)
    {}

    function mint(address to) public onlyOwner {
        _mint(to, 1 * 10 ** 8 * 10 ** 18);
    }
}