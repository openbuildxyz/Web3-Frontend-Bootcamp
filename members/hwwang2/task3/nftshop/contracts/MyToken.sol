// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20, Ownable {
    constructor()
        ERC20("HWCoin", "hw")
        Ownable(msg.sender)
    {}

    function mint() public payable {
        _mint(msg.sender, msg.value*10);
    }

    function mintTo(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function decimals() public override view returns (uint8) {
        return 6;
    }
}