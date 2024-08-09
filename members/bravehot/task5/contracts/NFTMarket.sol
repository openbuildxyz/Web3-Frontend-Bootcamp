// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {ERC721Holder} from "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "hardhat/console.sol";

contract NFTMarket is ERC721Holder, ReentrancyGuard {
    uint256 private _listingIdCounter;

    struct Listing {
        address seller;
        address nftContract;
        uint256 tokenId;
        uint256 price;
        bool isActive;
        bool isList;
        uint256 listTime;
        uint256 unListTime;
    }

    // 市场合约接受的 的 ERC20 代币
    IERC20 public acceptedToken;
    mapping(uint256 => Listing) public listings;

    // 上架NFT事件
    event NFTListed(
        address seller,
        address nftContract,
        uint256 tokenId,
        uint256 price,
        uint256 listingId,
        uint256 listTime
    );

    // 购买NFT事件
    event NFTPurchased(
        address buyer,
        address nftContract,
        uint256 tokenId,
        uint256 price,
        uint256 listingId,
        uint256 purchaseTime
    );

    // 下架NFT事件
    event NFTUnList(
        address seller,
        address nftContract,
        uint256 tokenId,
        uint256 price,
        uint256 listingId,
        uint256 unListTime
    );

    constructor(address _acceptedToken) {
        acceptedToken = IERC20(_acceptedToken);
    }

    function listNFT(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) public {
        uint256 listingId = _listingIdCounter;
        _listingIdCounter++;

        // 将用户的 tokenId 转移到当前合约
        IERC721(nftContract).transferFrom(msg.sender, address(this), listingId);

        listings[listingId] = Listing({
            seller: msg.sender,
            nftContract: nftContract,
            tokenId: tokenId,
            price: price,
            isActive: true,
            isList: true,
            listTime: block.timestamp,
            unListTime: 0
        });

        emit NFTListed(
            msg.sender,
            nftContract,
            tokenId,
            price,
            listingId,
            block.timestamp
        );
    }

    function unListNFT(uint256 listingId) public {
        Listing storage listing = listings[listingId];
        require(listing.seller == msg.sender, "Not Owner");
        listing.isList = false;
        listing.unListTime = block.timestamp;

        IERC721(listing.nftContract).approve(listing.seller, listing.tokenId);
        emit NFTUnList(
            msg.sender,
            listing.nftContract,
            listing.tokenId,
            listing.price,
            listingId,
            block.timestamp
        );
    }

    function purchaseNFT(uint256 listingId) public nonReentrant {
        Listing storage listing = listings[listingId];
        require(listing.isActive, "item is not listed");
        // ERC20 中只有 transferFrom 没有 safeTransferFrom， safeTransferFrom 是 ERC721 中的
        require(
            acceptedToken.transferFrom(
                msg.sender,
                listing.seller,
                listing.price
            ),
            "Payment failed"
        );

        IERC721(listing.nftContract).safeTransferFrom(
            address(this),
            msg.sender,
            listing.tokenId
        );

        listing.isActive = false;

        emit NFTPurchased(
            msg.sender,
            listing.nftContract,
            listing.tokenId,
            listing.price,
            listingId,
            block.timestamp
        );
    }

    // 查看上架的 NFT 的数量
    function getListedCount() public view returns (uint256) {
        return _listingIdCounter;
    }

    function getListedItem() public view returns (Listing[] memory) {
        require(_listingIdCounter > 0, "No NFT listed");

        Listing[] memory newListing = new Listing[](_listingIdCounter);

        for (uint256 i = 0; i < _listingIdCounter; i++) {
            newListing[i] = listings[i];
        }
        return newListing;
    }

    // 查看我上架的 NFT
    function getMyNFT() public view returns (Listing[] memory) {
        require(msg.sender != address(0), "Zero address");

        uint256 ownerCount = 0;
        for (uint256 i = 0; i < _listingIdCounter; i++) {
            if (listings[i].seller == msg.sender) {
                ownerCount++;
            }
        }

        Listing[] memory myListing = new Listing[](ownerCount);
        uint256 currentIndex = 0;
        for (uint256 i = 0; i < _listingIdCounter; i++) {
            if (listings[i].seller == msg.sender) {
                myListing[currentIndex] = listings[i];
                currentIndex++;
            }
        }

        return myListing;
    }
}
