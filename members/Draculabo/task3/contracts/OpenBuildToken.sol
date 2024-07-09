// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract OpenBuildToken is ERC20 {
    constructor() ERC20("OpenBuildToken", "OBT") {}

    /// 发送代币到 msg.sender
    function _mint(uint amount) external {
        _mint(msg.sender, amount);
    }

    /// 销毁msg.sender 中 amount 数量的代币
    function _burn(uint amount) external {
        _burn(msg.sender, amount);
    }

    /// 重写了ERC20的小数点位数 为 6位
    function decimals() public view virtual override returns (uint8) {
        return 6;
    }
}
