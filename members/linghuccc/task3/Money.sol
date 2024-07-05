// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract Money is ERC20, Ownable {
    event TokenMinted(address indexed recipient, uint256 amount);

    constructor() ERC20("Money Token", "MONEY") Ownable(_msgSender()) {}

    function mint(address recipient, uint256 amount) external onlyOwner {
        _mint(recipient, amount);

        emit TokenMinted(recipient, amount);
    }
}
