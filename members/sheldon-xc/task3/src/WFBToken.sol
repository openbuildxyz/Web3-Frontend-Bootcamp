// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract WFBToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("WFBToken", "WFBT") {
        _mint(msg.sender, initialSupply * (10 ** decimals()));
    }

    function decimals() public view virtual override returns (uint8) {
        return 2;
    }
}
