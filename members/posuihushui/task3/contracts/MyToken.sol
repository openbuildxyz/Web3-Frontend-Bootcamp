// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor(uint256 initialSuplly) ERC20("LakeToken1", "LKT1") {
        _mint(msg.sender, initialSuplly);
    }
}
