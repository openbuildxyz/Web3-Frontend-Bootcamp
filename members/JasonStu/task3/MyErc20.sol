// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyErc20JasonToken is ERC20 {
    //0xE71D7849431Dd15FD73996DEDdBF52fC0a76556C 创建的ERC20 代币
    constructor() ERC20("JasonToken", "JST") {
        _mint(msg.sender, 10000000000 * 10 ** 8);
    }

    function decimals() public view virtual override returns (uint8) {
        return 8;
    }
}
