// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ShouHuToken is ERC20 {
    constructor() ERC20("ShouHuToken", "SH") {
        _mint(msg.sender, 1000 * 10 ** 6);
    }

    function decimals() public view virtual override returns (uint8) {
        return 6;
    }
}
