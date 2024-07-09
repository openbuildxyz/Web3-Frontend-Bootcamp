// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SadMonkey is ERC20, Ownable {
    constructor() ERC20("lin's erc20", "SadMonkey") {}

    function mint() public onlyOwner {
        _mint(msg.sender, 1000 * 10 ** decimals());
    }
}
