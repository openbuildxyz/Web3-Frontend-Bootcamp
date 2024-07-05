// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {IERC20} from "../lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import {IERC721} from "../lib/openzeppelin-contracts/contracts/token/ERC721/IERC721.sol";

contract MyNFTMarket {
    mapping(uint => uint) public tokenIdPrice;
    mapping(uint => address) public tokenSeller;
    address public immutable token;
    address public immutable nftToken;
    address public immutable admin; // 项目方

    error CallFunctionError();

    event ListNFT(address seller, uint256 tokenId, uint256 price);
    event BuyNFT(address buyer, uint256 tokenId, uint256 price);

    constructor(address _token, address _nftToken) {
        token = _token;
        nftToken = _nftToken;
        admin = msg.sender;
    }

    function list(uint256 tokenID, uint price) external {
        // IERC721(nftToken).safeTransferFrom(
        IERC721(nftToken).transferFrom(msg.sender, address(this), tokenID);
        tokenIdPrice[tokenID] = price;
        tokenSeller[tokenID] = msg.sender;
        emit ListNFT(msg.sender, tokenID, price);
    }

    function buy(uint tokenId, uint amount) external {
        require(amount >= tokenIdPrice[tokenId], "low price");

        require(
            IERC721(nftToken).ownerOf(tokenId) == address(this),
            "aleady selled"
        );

        IERC20(token).transferFrom(
            msg.sender,
            tokenSeller[tokenId],
            tokenIdPrice[tokenId]
        );

        IERC721(nftToken).transferFrom(address(this), msg.sender, tokenId);

        emit BuyNFT(msg.sender, tokenId, tokenIdPrice[tokenId]);
    }

    fallback() external {
        revert CallFunctionError();
    }
}
