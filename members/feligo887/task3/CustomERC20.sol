// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CustomERC20 is ERC20 {
    constructor() ERC20("CustomToken", "CTK") {
        _mint(msg.sender, 1000000 * 10 ** decimals()); // 初始铸造 100 万代币
    }
    // 铸造更多代币（仅供合约所有者使用）
    function mint(address to,uint256 amount) external {
        _mint(to,amount);
    } 

}