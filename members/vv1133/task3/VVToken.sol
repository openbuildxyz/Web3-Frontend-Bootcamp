// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract VVToken is ERC20, Ownable {
    uint8 private constant DECIMALS = 6;
    uint256 private constant FAUCET_AMOUNT = 100 * (10 ** DECIMALS);

    constructor(uint256 initialSupply) ERC20("VV Token", "VVT") Ownable(msg.sender) {
        _mint(msg.sender, initialSupply);
    }

    function decimals() public view virtual override returns (uint8) {
        return DECIMALS;
    }

    function faucet() external {
        require(balanceOf(owner()) >= FAUCET_AMOUNT, "Faucet error, insuffecient balance");
        _transfer(owner(), msg.sender, FAUCET_AMOUNT);
    }

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}
