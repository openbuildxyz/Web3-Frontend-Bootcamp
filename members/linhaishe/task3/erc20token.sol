// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract cUSDT is ERC20 {
  constructor() ERC20("ihan's erc20", "cUSDT") {
    _mint(msg.sender, 1 * 10**8 * 10**18); //1*10**8代表1亿，10**18精度是18
  }
}
