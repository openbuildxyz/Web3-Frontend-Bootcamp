// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SnowToken is ERC20 {
    constructor() ERC20("SnowToken", "SNOW") {
        // Initial supply set to 1,000,000 tokens.
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    // Allow only the owner to mint new tokens
    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}
