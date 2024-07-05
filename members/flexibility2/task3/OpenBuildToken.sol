// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract OpenBuildToken is ERC20 {
    constructor() ERC20("OpenBuildToken", "OBT") {
        _mint(msg.sender, 1000000000 * 10**6);
    }

    function decimals() public view virtual override returns (uint8) {
        return 6;
    }
}
