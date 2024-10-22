// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MissopToken is ERC20{
    constructor() ERC20("MissopToken","MT") {
        // 初始化给合约 mint 这么多 token
        _mint(msg.sender, 10000000000*10**6);
    }

    function decimals()public  view  virtual  override  returns (uint8) {
        return  6;
    }
}