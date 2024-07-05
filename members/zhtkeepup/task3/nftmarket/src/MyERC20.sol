// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {ERC20} from "../lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";

contract MyERC20 is ERC20 {
    address owner;

    constructor() ERC20("MyToken", "MTK") {
        owner = msg.sender;
    }

    modifier onlyOner() {
        require(msg.sender == owner, "only owner!");
        _;
    }

    function mint(address to, uint256 amount) external onlyOner {
        _mint(to, amount);
    }
}
