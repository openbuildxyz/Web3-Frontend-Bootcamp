// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {ERC721Holder} from "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Counters} from "@openzeppelin/contracts/utils/Counters.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract NFTMarket is ERC721Holder, ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _listingIdCounter;

    struct Listing {
        address seller;
        address nftContract;
        uint256 tokenId;
        uint256 price;
        bool isActive;
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
        uint256 listingId
    );

    // 购买NFT事件
    event NFTPurchased(
        address buyer,
        address nftContract,
        uint256 tokenId,
        uint256 price,
        uint256 listingId
    );

    constructor(address _acceptedToken) {
        acceptedToken = IERC20(_acceptedToken);
    }

    function listNFT(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) public {
        uint256 listingId = _listingIdCounter.current();
        _listingIdCounter.increment();

        // 将用户的 tokenId 转移到当前合约
        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

        listings[listingId] = Listing({
            seller: msg.sender,
            nftContract: nftContract,
            tokenId: tokenId,
            price: price,
            isActive: true
        });

        emit NFTListed(msg.sender, nftContract, tokenId, price, listingId);
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
            listingId
        );
    }

    // 查看上架的 NFT 的数量
    function getListedCount() public view returns (uint256) {
        return _listingIdCounter.current();
    }

    function getListedItem() public view returns (Listing[] memory) {
        uint256 itemCount = _listingIdCounter.current();
        require(itemCount > 0, "No NFT listed");

        Listing[] memory newListing = new Listing[](itemCount);

        for (uint256 i = 0; i < itemCount; i++) {
            newListing[i] = listings[i];
        }
        return newListing;
    }
}
