// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20, Ownable {
    constructor() ERC20("SecretToken", "ST") Ownable(msg.sender) {}

    // 只有合约所有者可以调用此函数
    function mintTo(address account, uint256 amount) external onlyOwner {
        _mint(account, amount);
    }

    // 任何人都可以调用此函数，但需要发送ETH
    function mint() external payable {
        require(msg.value > 0, "Must send ETH to mint tokens");
        // 假设 1 ETH = 10 ST
        _mint(msg.sender, msg.value * 10);
    }
}
