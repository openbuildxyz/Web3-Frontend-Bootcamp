// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20("YZQCoin", "YZQ") {
    mapping(address => bool) claimMsg;
    address immutable owner;
    constructor() {
        _mint(msg.sender, 1000 * 10 ** 18); // 给自己发1000测试
        owner = msg.sender;
    }

    function claimToken() public {
        require(
            !claimMsg[msg.sender],
            "Each person can only receive 20 YZQ once"
        );
        _mint(msg.sender, 20 * 10 ** 18); // 每个人都可以领取20个代币 只能领取一次
        claimMsg[msg.sender] = true;
    }

    // 测试用的
    function cancelClaimToken() public {
        require(msg.sender == owner, "Only test by Owner");
        claimMsg[msg.sender] = false;
    }
}
