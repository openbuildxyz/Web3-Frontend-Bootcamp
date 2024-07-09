//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    address private immutable _creator;


    function decimals() public pure override returns (uint8) {
        return 6;
    }

    constructor() ERC20('Kyleten Token', 'TEN') {
        _creator = msg.sender;
        _mint(msg.sender, 1000 * 10 ** decimals());
    }

	/**
	 * @param market NFT市场合约地址
	 * @param price NFT上架价格
	 */
    function approveForMarket(address market, uint256 price) external {
        
        approve(market, price);
    }
}