// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// contract hash 0xeF4D1c6935D25d5b320E910B7f90178801e5f4D2

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// 显示上架的NFT：显示所有上架的NFT，包括NFT的合约地址、Token ID、价格和卖家地址。
// 合约增加一个下架NFT的功能，用户可以在上架NFT后、被别人购买前下架NFT

contract NFTMarket is Ownable {
    struct Listing {
        address seller;
        address nftContract;
        uint256 tokenId;
        uint256 price;
    }

    // paymentToken 是一个 IERC20 类型的变量，用于表示在 NFT 市场中使用的 ERC20 代币。这个代币将用于支付购买 NFT 的费用。它的主要作用是确保买家在购买 NFT 时使用特定的 ERC20 代币进行支付，而不是使用其他代币或原生加密货币
    IERC20 public paymentToken;
    uint256 public listingCounter;
    mapping(uint256 => Listing) public listings;

    event NFTListed(uint256 indexed listingId, address indexed seller, address indexed nftContract, uint256 tokenId, uint256 price);
    event NFTPurchased(uint256 indexed listingId, address indexed buyer, address indexed nftContract, uint256 tokenId, uint256 price);
    event NFTDelisted(uint256 indexed listingId, address indexed seller);

    constructor(IERC20 _paymentToken) Ownable(msg.sender) {
        paymentToken = _paymentToken;
    }

    function listNFT(address nftContract, uint256 tokenId, uint256 price) public {
        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

        listings[listingCounter] = Listing({
            seller: msg.sender,
            nftContract: nftContract,
            tokenId: tokenId,
            price: price
        });

        emit NFTListed(listingCounter, msg.sender, nftContract, tokenId, price);
        listingCounter++;
    }

    function purchaseNFT(uint256 listingId) public {
        Listing memory listing = listings[listingId];
        require(listing.price > 0, "NFT not listed for sale");

        paymentToken.transferFrom(msg.sender, listing.seller, listing.price);
        IERC721(listing.nftContract).transferFrom(address(this), msg.sender, listing.tokenId);

        emit NFTPurchased(listingId, msg.sender, listing.nftContract, listing.tokenId, listing.price);

        delete listings[listingId];
    }

    function delistNFT(uint256 listingId) public {
        Listing memory listing = listings[listingId];
        require(listing.seller == msg.sender, "Only the seller can delist the NFT");

        IERC721(listing.nftContract).transferFrom(address(this), msg.sender, listing.tokenId);

        emit NFTDelisted(listingId, msg.sender);

        delete listings[listingId];
    }

    // 获取所有nft
    function getAllListings() public view returns (Listing[] memory) {
        Listing[] memory allListings = new Listing[](listingCounter);
        uint256 counter = 0;
        for (uint256 i = 0; i < listingCounter; i++) {
            if (listings[i].price > 0) {
                allListings[counter] = listings[i];
                counter++;
            }
        }
        return allListings;
    }

    // 获取正在售卖的nft
    function getAllSellingListings() public view returns (Listing[] memory) {
        // 计算有效的列表数量
        uint256 validCount = 0;
        for (uint256 i = 0; i < listingCounter; i++) {
            if (listings[i].price > 0) {
                validCount++;
            }
        }

        // 创建一个精确大小的数组来存储有效的列表
        Listing[] memory allListings = new Listing[](validCount);
        uint256 counter = 0;
        for (uint256 i = 0; i < listingCounter; i++) {
            if (listings[i].price > 0) {
                allListings[counter] = listings[i];
                counter++;
            }
        }
        return allListings;
    }

    // 获取下架的nft
    function getAllRemovedListings() public view returns (Listing[] memory) {
        // 计算有效的列表数量
        uint256 validCount = 0;
        for (uint256 i = 0; i < listingCounter; i++) {
            if (listings[i].price == 0) {
                validCount++;
            }
        }

        // 创建一个精确大小的数组来存储有效的列表
        Listing[] memory allListings = new Listing[](validCount);
        uint256 counter = 0;
        for (uint256 i = 0; i < listingCounter; i++) {
            if (listings[i].price == 0) {
                allListings[counter] = listings[i];
                counter++;
            }
        }
        return allListings;
    }

}

// listNFT 交易哈希: 0xbb5118e2174dbb02740a5cb00ee68eea28c3828e5cdabe9e39c2793b49b0429d
// purchaseNFT 交易哈希: 0x9b2ff9fcb6c503f1fe3889638083246dcca25af329efd367a2748e6d18940b3e