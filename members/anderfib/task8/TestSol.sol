// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract TestSol {
    uint public unlockTime;
    address payable public owner;

    event Withdrawal(uint amount, uint when);

    constructor(uint _unlockTime) payable {
        owner = payable(msg.sender);
    }

    function withdraw() public {
        require(msg.sender == owner, "You aren't the owner");
        emit Withdrawal(address(this).balance, block.timestamp);
        owner.transfer(address(this).balance);
    }
}
