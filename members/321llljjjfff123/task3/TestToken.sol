// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TestToken is ERC20 {
    constructor() ERC20("TestToken", "MTK") {
        _mint(msg.sender, 10000000000 * 10 * 6);
    }

    function decimals() public view virtual override returns(uint8){
        return 6;
    }
}