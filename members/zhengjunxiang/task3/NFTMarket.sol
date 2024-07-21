// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// contract hash 0xeF4D1c6935D25d5b320E910B7f90178801e5f4D2

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

// 显示上架的NFT：显示所有上架的NFT，包括NFT的合约地址、Token ID、价格和卖家地址。
// 合约增加一个下架NFT的功能，用户可以在上架NFT后、被别人购买前下架NFT

contract NFTMarket is Ownable, ReentrancyGuard {
    event NftListed(
        address indexed seller,
        address indexed nftContract,
        uint256 indexed tokenId,
        uint256 price
    );

    event NFTPurchased(
        address indexed buyer,
        address indexed nftContract,
        uint256 indexed tokenId,
        uint256 price
    );

    event NFTDelisted(address indexed nftContract, uint256 indexed tokenId, address indexed seller);

    // paymentToken 是一个 IERC20 类型的变量，用于表示在 NFT 市场中使用的 ERC20 代币。这个代币将用于支付购买 NFT 的费用。它的主要作用是确保买家在购买 NFT 时使用特定的 ERC20 代币进行支付，而不是使用其他代币或原生加密货币
    IERC20 public paymentToken;

    constructor(IERC20 _paymentToken) Ownable(msg.sender) {
        paymentToken = _paymentToken;
    }

    struct NFTItem {
        address seller;
        address nftContract;
        uint256 tokenId;
        uint256 price;
        string tokenUrl;
        uint256 listedAt;
        bool isActived;
    }

    mapping(address => mapping(uint => NFTItem)) private _listNFTs;

    function listNFT(
        address nftContract,
        uint256 tokenId,
        uint256 price,
        string memory tokenUrl
    ) public {
        IERC721 nft = IERC721(nftContract);
        address seller = msg.sender;

        require(
            nft.ownerOf(tokenId) == seller,
            "You're not the owner of the NFT."
        );
        require(price > 0, "Price must be greater thant 0.");
        require(
            nft.isApprovedForAll(seller, address(this)),
            "The contract's not to be approved."
        );

        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

        _listNFTs[nftContract][tokenId] = NFTItem(
            seller,
            nftContract,
            tokenId,
            price,
            tokenUrl,
            block.timestamp,
            true
        );

        emit NftListed(seller, nftContract, tokenId, price);
    }

    function purchaseNFT(uint256 nftContract, uint256 tokenId) public {
        NFTItem memory targetNft = _listNFTs[nftContract][tokenId];

        require(targetNft.price > 0, "NFT not listed for sale");

        paymentToken.transferFrom(msg.sender, targetNft.seller, targetNft.price);

        IERC721(targetNft.nftContract).safeTransferFrom(
            targetNft.seller,
            msg.sender,
            tokenId
        );

        emit NFTPurchased(
            msg.sender,
            nftContract,
            tokenId,
            targetNft.price
        );

        delete _listNFTs[nftContract][tokenId];
    }

    function delistNFT(uint256 nftContract, uint256 tokenId) public {
        Listing memory listing = _listNFTs[nftContract][tokenId];
        require(
            listing.seller == msg.sender,
            "Only the seller can delist the NFT"
        );

        IERC721(listing.nftContract).transferFrom(
            address(this),
            msg.sender,
            tokenId
        );

        emit NFTDelisted(listingId, msg.sender);

        delete _listNFTs[nftContract][tokenId];
    }
}

// listNFT 交易哈希: 0xbb5118e2174dbb02740a5cb00ee68eea28c3828e5cdabe9e39c2793b49b0429d
// purchaseNFT 交易哈希: 0x9b2ff9fcb6c503f1fe3889638083246dcca25af329efd367a2748e6d18940b3e
