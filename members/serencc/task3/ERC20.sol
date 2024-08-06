// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SRToken is ERC20 {
    constructor(uint256 initialValue) ERC20("SRToken", "SRT") {
        _mint(msg.sender, initialValue * 10 ** 6);
    }

    function decimals() public view  virtual override  returns (uint8) {
        return 6;
    }
}
