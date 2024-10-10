// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ERC20Token is ERC20, Ownable {
    uint256 private constant FAUCET_AMOUNT = 1000 * (10 ** 18); // 水龙头每次分发的代币数量

    constructor(uint256 initialSupply, address initialOwner) ERC20("Olive", "Olive") Ownable(initialOwner) {
        _mint(initialOwner, initialSupply * (10 ** decimals()));
    }
    
    function faucet() external {
        require(balanceOf(owner()) >= FAUCET_AMOUNT, "Faucet: Insufficient balance in faucet");
        _transfer(owner(), msg.sender, FAUCET_AMOUNT);
    }

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}

