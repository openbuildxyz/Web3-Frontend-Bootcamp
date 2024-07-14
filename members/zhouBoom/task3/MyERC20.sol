// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// 定义 MyERC20 合约，继承 ERC20 标准
contract MyERC20 is ERC20 {
    // 构造函数，设置代币名称、符号和初始供应量
    constructor(uint256 initialSupply) ERC20("MyERC20", "MY20") {
        // 铸造初始供应量的代币给部署合约的地址
        _mint(msg.sender, initialSupply);
    }
}
