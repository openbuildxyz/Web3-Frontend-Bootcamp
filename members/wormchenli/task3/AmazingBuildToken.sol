// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract AmazingBuildToken is ERC20 {
    constructor() ERC20("AmazingBuildToken", "ABTK") {
        _mint(msg.sender, 1000000 * 10 ** 8);
    }
    function decimals() public pure override returns (uint8) {
        return 8;
    }
}