// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FeatherToken is ERC20, Ownable {

    uint256 private constant DECIMALS = 10 ** 18;
    uint256 public constant TOTAL_SUPPLY = 1000000 * DECIMALS; // total supply 1,000,000 token
    uint256 public constant FAUCET_AMOUNT = 1000 * DECIMALS; // faucet 100 token every time
    uint256 public constant FAUCET_COOLDOWN = 6 hours; // faucet cooldown

    mapping(address => uint256) private lastFaucetTimestamp;

    constructor() ERC20("Feather", "FEA") Ownable(msg.sender) {
        _mint(address(this), TOTAL_SUPPLY);
    }

    function faucet() external {
        require(block.timestamp >= lastFaucetTimestamp[msg.sender] + FAUCET_COOLDOWN, "Please wait for 6 hours");
        require(balanceOf(address(this)) >= FAUCET_AMOUNT, "Insufficient balance of faucet");

        lastFaucetTimestamp[msg.sender] = block.timestamp;
        _transfer(address(this), msg.sender, FAUCET_AMOUNT);
    }

    function withdrawTokens(uint256 amount) external onlyOwner {
        require(balanceOf(address(this)) >= amount, "Insufficient balance");
        _transfer(address(this), owner(), amount);
    }
}