// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract NFTMarket {
    struct Listing {
        address seller;
        uint256 price;
        address erc20Token;
    }

    // 映射：NFT合约地址 => TokenID => 上架信息
    mapping(address => mapping(uint256 => Listing)) public listings;

    // 事件声明
    event ItemListed(
        address indexed seller,
        address indexed nftContract,
        uint256 indexed tokenId,
        uint256 price,
        address erc20Token
    );

    event ItemPurchased(
        address indexed buyer,
        address indexed nftContract,
        uint256 indexed tokenId,
        uint256 price,
        address erc20Token
    );

    // 上架NFT
    function listNFT(
        address nftContract,
        uint256 tokenId,
        uint256 price,
        address erc20Token
    ) external {
        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);
        listings[nftContract][tokenId] = Listing({
            seller: msg.sender,
            price: price,
            erc20Token: erc20Token
        });
        emit ItemListed(msg.sender, nftContract, tokenId, price, erc20Token);
    }

    // 购买NFT
    function buyNFT(address nftContract, uint256 tokenId) external {
        Listing memory listing = listings[nftContract][tokenId];
        require(listing.price > 0, "Item not listed");

        // 转移ERC20代币
        IERC20(listing.erc20Token).transferFrom(
            msg.sender,
            listing.seller,
            listing.price
        );

        // 转移NFT
        IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);

        // 清除上架信息
        delete listings[nftContract][tokenId];

        emit ItemPurchased(
            msg.sender,
            nftContract,
            tokenId,
            listing.price,
            listing.erc20Token
        );
    }
}