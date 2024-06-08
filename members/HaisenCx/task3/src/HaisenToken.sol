// SPDX-License-Identifier: MIT
// Layout of Contract:
// version
// imports
// interfaces, libraries, contracts
// errors
// Type declarations
// State variables
// Events
// Modifiers
// Functions

// Layout of Functions:
// constructor
// receive function (if exists)
// fallback function (if exists)
// external
// public
// internal
// private
// view & pure functions
pragma solidity ^0.8.20;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract HaisenToken is ERC20, Ownable(msg.sender) {
    /////////////////////////
    ///     Errors        ///
    /////////////////////////
    error HaisenToken__InvalidMintAmount();
    /////////////////////////
    ///     Event         ///
    /////////////////////////

    event HaisenToken_Minted(address indexed player);
    event HaisenToken_Burned(address indexed player);

    constructor(uint256 initialSupply) ERC20("HaisenToken", "HST") {
        mint(msg.sender, initialSupply);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        if (amount == 0) {
            revert HaisenToken__InvalidMintAmount();
        }
        _mint(to, amount);
        emit HaisenToken_Minted(msg.sender);
    }
}
