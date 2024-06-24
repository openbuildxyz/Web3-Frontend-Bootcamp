// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract OpenBuildToken is ERC20, Ownable {
    constructor(address initialOwner) ERC20("OpenBuildToken", "0BT") Ownable(initialOwner) {
        _mint(msg.sender, 10000000000 * 10 * 6);
    }

    function mint(address account, uint256 amount) public onlyOwner {
        _mint(account, amount);
    }
}