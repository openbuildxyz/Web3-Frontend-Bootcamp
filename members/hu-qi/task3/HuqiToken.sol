// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract HuqiCoin is ERC20("HuqiCoin", "HUQIC") {
  constructor(uint256 initialValue) {
    require(initialValue > 999, "Initial supply must be greater than 999.");
    _mint(msg.sender, initialValue * 10 ** 2);
  }

  function decimals() public view virtual override returns (uint8) {
    return 2;
  }
}