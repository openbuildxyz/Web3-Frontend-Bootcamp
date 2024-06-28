// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Counter {
    uint256 _count;
    address private deployer;

    constructor() {
        deployer = msg.sender;
        _count = 0;
    }

    function isOwner(address user) external view returns (bool result) {
        if (user == deployer) {
            return true;
        } else {
            return false;
        }
    }

    function increment() public {
        _count = _count + 1;
    }

    function count() public view returns (uint256) {
        return _count;
    }
}
