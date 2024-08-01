// SPDX-License-Identifier: MIT
pragma solidity >=0.6.12 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BirdToken is ERC20 {
    uint256 public currentTokenId;

    constructor(uint256 initialSupply) ERC20("Bird", "BIRD") {
        _mint(msg.sender, initialSupply);
    }
}
