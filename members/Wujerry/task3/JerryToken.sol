// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title Simple Token
 * @author Breakthrough Labs Inc.
 * @notice Token, ERC20, Fixed Supply
 * @custom:version 1.0.7
 * @custom:address 4
 * @custom:default-precision 18
 * @custom:simple-description Simple Token. A fixed supply is minted on deployment, and
 * new tokens can never be created.
 * @dev ERC20 token with the following features:
 *
 *  - Premint your total supply.
 *  - No minting function. This allows users to comfortably know the future supply of the token.
 *
 */

contract JerryToken is ERC20 {
    constructor() payable ERC20("JerryToken", "JERT") {
        _mint(msg.sender, 10000000000000000);
    }
}
