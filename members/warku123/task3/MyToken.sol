// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor() ERC20("PiGToken", "PGK")
    {
        _mint(msg.sender, 10000000000*10**6);
    }

    function decimals() public view virtual override returns (uint8) {
        return 6;
    }
}
