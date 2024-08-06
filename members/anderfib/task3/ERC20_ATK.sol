// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
contract ATK is ERC20 {
    using SafeMath for uint256;

    mapping(address => uint256) public lastFeaturedTime;


    constructor() ERC20("AnderToken", "ATK") {
        //totalSupply = 21,000,000 ATK
        _mint(address(this), 21000000 * 10 ** 18);
    }

    function feature() public {
        require(
            lastFeaturedTime[msg.sender].add(5 minutes) <= block.timestamp,
            "You can only claim tokens once every 5 minutes"
        );
        lastFeaturedTime[msg.sender] = block.timestamp;
        _mint(msg.sender, 100 * 10 ** 18);
    }
}
