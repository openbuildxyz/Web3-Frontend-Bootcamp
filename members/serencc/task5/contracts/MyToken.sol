// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor(uint256 initialValue) ERC20("MyToken", "MYT") {
        _mint(msg.sender, initialValue * 10 ** 3);
    }

    function decimals() public view  virtual override  returns (uint8) {
        return 3;
    }
}
