// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

pragma solidity ^0.8.24;

contract OBToken is ERC20,ERC20Permit {
    constructor() ERC20("Open Build Token","OBT") ERC20Permit("Open Build Token"){

    }

    mapping (address => uint256) lastReceiveTime;
    uint256 faucetAmount = 0.1 * 10 ** 18;
    function faucet() public {
        require((block.timestamp - lastReceiveTime[msg.sender]) >= 1 days,"claimed");
        lastReceiveTime[msg.sender] = block.timestamp;
        _update(address(0), msg.sender, faucetAmount);
    }
}