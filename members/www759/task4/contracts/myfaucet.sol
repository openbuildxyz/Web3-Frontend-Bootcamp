// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TFaucet is Ownable {
    IERC20 public token;
    uint256 public amountAllowed = 100 * 10 ** 18;
    uint256 public lockTime = 1 days;

    mapping(address => uint256) public lastQequestd;

    event SendTokens(address indexed receiver, uint256 amount);

    constructor(address _tokenAddress) Ownable(msg.sender) {
        token = IERC20(_tokenAddress);
    }

    function requestTokens(address _requestor) external {
        require(block.timestamp >= lastQequestd[_requestor] + lockTime, "You can only request once every 24 hours");
        require(token.balanceOf(address(this)) >= amountAllowed, "Faucet empty!");

        lastQequestd[msg.sender] = block.timestamp;
        token.transfer(_requestor, amountAllowed);

        emit SendTokens(_requestor, amountAllowed);
    }

    function setAmountAllowed(uint256 _newAmount) external onlyOwner {
        amountAllowed = _newAmount;
    }

    function setLockTime(uint256 _newLockTime) external onlyOwner {
        lockTime = _newLockTime;
    }

    function withdrawTokens(uint256 _amount) external onlyOwner {
        require(_amount >= token.balanceOf(address(this)), "Faucet balance is less than request amount");
        token.transfer(owner(), _amount);
    }
}