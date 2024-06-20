// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// Author: @flytam https://github.com/flytam
contract ByteDanceToken is ERC20 {
     uint256 public constant MINT_LIMIT = 1000 * 10**18;
    mapping(address => bool) private _hasMinted;

    constructor() ERC20("ByteDanceToken", "BD") {}

       function mint() public {
        require(!_hasMinted[msg.sender], "Address has already minted.");
        _hasMinted[msg.sender] = true;
        _mint(msg.sender, MINT_LIMIT);
    }
}