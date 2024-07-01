//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FederCoin is ERC20 {
    constructor() ERC20("FederCoin","FDC") {
        _mint(msg.sender,100_000_000 * 10 ** 18);
    }
}