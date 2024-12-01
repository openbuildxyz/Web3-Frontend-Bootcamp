// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract YMT is ERC20, ERC20Burnable {
    constructor(address initialOwner)
        ERC20("Yiming Token", "YMT")
    {}

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}
