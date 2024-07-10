// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ZZToken is ERC20("ZZToken", "ZZT") {
    constructor(uint256 initSupply){
        require(initSupply > 10000, "Initial supply must be greater than 10000.");
        _mint(msg.sender, initSupply * 10 ** 2);
    }

    function decimals() public view virtual override returns (uint8) {
        return 2;
    }
}