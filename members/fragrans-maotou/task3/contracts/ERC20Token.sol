// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20Token is ERC20 {
    constructor(uint256 initialSupply) ERC20("MaoTouERC20NFT", "MT20NFT") {
        _mint(msg.sender, initialSupply);
    }
}
