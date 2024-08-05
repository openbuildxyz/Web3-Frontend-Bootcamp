// SPDX-License-Identifier: MIT

pragma solidity 0.8.26;

contract Counter {
    uint256 public count;
    address private _deploy;

    constructor() {
        _deploy = msg.sender;
        count = 0;
    }

    function isOwner(address user_adress) public view returns (bool) {
        return user_adress == _deploy;
    }

    function increment() public {
        count += 1;
    }
    function decrement() public {
        count -= 1;
    }

    function getCount() external view returns (uint256) {
        return count;
    }
}
