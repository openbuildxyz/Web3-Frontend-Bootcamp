// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract NFTMarket is ReentrancyGuard {
    struct NFTItem {
        address seller;
        address nftContract;
        uint256 tokenId;
        uint256 price;
        bool isActive;
    }
    IERC20 public _paymentToken;

    mapping(address => mapping(uint256 => NFTItem)) public nftMap;

    NFTItem[] private lists;

    event NFTListed(
        address indexed seller,
        address indexed nftContract,
        uint256 indexed tokenId,
        uint256 price
    );

    event NFTPurchased(
        address indexed seller,
        address indexed buyer,
        uint256 indexed tokenId,
        uint256 price
    );

    constructor(address paymentToken) {
        _paymentToken = IERC20(paymentToken);
    }

    /// 上架被批准的NFT
    function listGrantedNFT(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) external {
        IERC721 nft = IERC721(nftContract);
        require(
            nft.ownerOf(tokenId) == msg.sender,
            "not the owner of the contract !"
        );
        require(
            nft.isApprovedForAll(msg.sender, address(this)),
            "the contract has not been approved !"
        );

        nftMap[nftContract][tokenId] = NFTItem(
            msg.sender,
            nftContract,
            tokenId,
            price,
            true
        );
        lists.push(NFTItem(msg.sender, nftContract, tokenId, price, true));
        emit NFTListed(msg.sender, nftContract, tokenId, price);
    }

    /// 购买NFT
    function buyNFT(
        address nftContract,
        uint256 tokenId
    ) external nonReentrant {
        NFTItem storage listing = nftMap[nftContract][tokenId];
        require(listing.isActive, "contracts are insecure !");

        IERC721 nft = IERC721(nftContract);
        require(
            _paymentToken.transferFrom(
                msg.sender,
                listing.seller,
                listing.price
            ),
            "pay failed!"
        );

        nft.safeTransferFrom(listing.seller, msg.sender, tokenId);
        listing.isActive = false;

        emit NFTPurchased(listing.seller, msg.sender, tokenId, listing.price);
    }

    /// 获取所有的NFT
    function getNFTItems() external view returns (NFTItem[] memory) {
        NFTItem[] memory items = new NFTItem[](lists.length);
        NFTItem memory idx;
        for (uint256 i = 0; i < lists.length; i++) {
            idx = lists[i];
            items[i] = nftMap[idx.nftContract][idx.tokenId];
        }
        return items;
    }
}
