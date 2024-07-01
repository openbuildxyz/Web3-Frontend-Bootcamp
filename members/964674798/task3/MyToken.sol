// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// 外部导入openzeppelin库中的ERC20代币标准
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// 编写代币  使用关键字 is 继承 ERC20代币标准
contract MyToken is ERC20 {
    // 初始化构造我的代币，并在部署合约时给用户初始代币
    constructor(uint256 initialSupply) ERC20("HfqCoin", "HTC") {
        // msg.sender 是部署合约人的地址
        _mint(msg.sender, initialSupply);
    }
}
