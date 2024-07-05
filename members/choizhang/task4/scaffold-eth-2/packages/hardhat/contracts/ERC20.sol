// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ChoiToken is ERC20, Ownable {
    uint256 private constant DECIMALS_AMOUNT = 10 ** 18; // 水龙头每次分发的代币数量
    uint256 private constant FAUCET_AMOUNT = 10 * DECIMALS_AMOUNT; // 水龙头每次分发的代币数量

    constructor(uint256 initialSupply) ERC20("ChoiToken", "COT") Ownable() {
        _mint(msg.sender, initialSupply * DECIMALS_AMOUNT);
    }

    // 领取水龙头
    function faucet() external {
        require(balanceOf(owner()) >= FAUCET_AMOUNT, "Insufficient balance in faucet");
        _transfer(owner(), msg.sender, FAUCET_AMOUNT);
    }

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    // 销毁代币的函数
    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }

    // 允许所有者销毁任何地址的代币的函数
    function burnFrom(address account, uint256 amount) external onlyOwner {
        amount = amount;
        uint256 currentAllowance = allowance(account, msg.sender);
        require(currentAllowance >= amount, "burn amount exceeds allowance");

        transferFrom(account, msg.sender, amount);
        _burn(msg.sender, amount);
    }
}