// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4 <0.9.0;

import "./ERC20.sol";

contract Token is ERC20{
    constructor(string memory name, string memory symbol, uint8 decimals) ERC20(name, symbol, decimals)  {
        _mint(msg.sender, 100 * 10 ** uint256(decimals));
    }

    
}