//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/** 
 * @title TEN Colllection
 * @notice NFT的基本实现
 */

contract NFT is ERC721 {
    /// 定义下一个铸造的token ID
    uint256 private _nextTokenId = 1;
    /// 定义ERC20作为支付方式
    address private _payment;
    IERC20 private _token;

    constructor(address token) ERC721("Kyleten Collection", "TEC") {
        _payment = token;
        _token = IERC20(token);
    }


    /// @return 返回用户的 ERC20 代币数量
    function tokenBalances(address owner) public view returns (uint256) {
        return _token.balanceOf(owner);
    }

    function mint(address to) external {
        require(tokenBalances(to) >= 200 * 10 ** 6, "Insufficient balances");
        _mint(to, _nextTokenId++);
    }

   /**
    * @param market market contract address
    * @param tokenId TEC unique ID
    */
    function approvePrice(address market, uint256 tokenId) external {
        require(tokenId < _nextTokenId);
        require(ownerOf(tokenId) == msg.sender);
        approve(market, tokenId);
    }
}