// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LUCKYCAT is ERC20 {
    constructor() ERC20("LUCKYCAT", "LUCKYCAT") {
        _mint(msg.sender, 1000000 * (10 ** uint256(decimals())));
    }

    function mint(address account) public {
        _mint(account, 100 * (10 ** uint256(decimals())));
    }
}
