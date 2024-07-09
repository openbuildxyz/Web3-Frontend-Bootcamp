// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract NFTMarket is ReentrancyGuard {
    event NftListed(
        address indexed seller,
        address indexed nftContract,
        uint256 indexed tokenId,
        uint256 price
    );

    event NftUnlisted(
        address indexed seller,
        address indexed nftContract,
        uint256 indexed tokenId,
        uint256 unlistedAt
    );

    event NftSold(
        address indexed buyer,
        address indexed nftContract,
        uint256 indexed tokenId,
        uint256 price
    );

    struct NftItem {
        address seller;
        address nftContract;
        uint tokenId;
        string tokenUrl;
        uint256 price;
        uint256 listedAt;
        bool listing;
    }

    struct NftIndex {
        address nftContract;
        uint tokenId;
    }

    NftIndex[] private _allNfts;
    IERC20 private _payment;

    mapping(address => mapping(uint256 => NftItem)) private _listedNfts;
    mapping(address => mapping(uint256 => bool)) private _listedFlags;

    constructor(address coinAddr_) {
        _payment = IERC20(coinAddr_);
    }

    function isListing(
        address nftContract,
        uint256 tokenId
    ) external view returns (bool) {
        return _listedNfts[nftContract][tokenId].listing;
    }

    function getAll() external view returns (NftItem[] memory) {
        NftItem[] memory allItem = new NftItem[](_allNfts.length);
        NftIndex memory nftIdx;

        for (uint256 i = 0; i < _allNfts.length; i++) {
            nftIdx = _allNfts[i];
            allItem[i] = _listedNfts[nftIdx.nftContract][nftIdx.tokenId];
        }

        return allItem;
    }

    function sell(
        address nftContract,
        uint256 tokenId,
        uint256 price,
        string memory tokenUrl
    ) external {
        IERC721 nft = IERC721(nftContract);
        address seller = msg.sender;

        require(
            nft.ownerOf(tokenId) == seller,
            "You're not the owner of the NFT."
        );
        require(price > 0, "Price must be greater thant 0.");
        require(
            nft.isApprovedForAll(seller, address(this)),
            "Contract isn't approved."
        );

        bool nftListed = _listedFlags[nftContract][tokenId];

        if (nftListed) {
            _listedNfts[nftContract][tokenId].seller = seller;
            _listedNfts[nftContract][tokenId].price = price;
            _listedNfts[nftContract][tokenId].listedAt = block.timestamp;
            _listedNfts[nftContract][tokenId].listing = true;
        } else {
            _listedNfts[nftContract][tokenId] = NftItem(
                seller,
                nftContract,
                tokenId,
                tokenUrl,
                price,
                block.timestamp,
                true
            );
            _listedFlags[nftContract][tokenId] = true;

            _allNfts.push(NftIndex(nftContract, tokenId));
        }

        emit NftListed(seller, nftContract, tokenId, price);
    }

    function unlist(address nftContract, uint256 tokenId) external {
        IERC721 nft = IERC721(nftContract);
        address seller = msg.sender;

        require(
            nft.ownerOf(tokenId) == seller,
            "You're not the owner of the NFT."
        );
        require(
            nft.isApprovedForAll(seller, address(this)),
            "Contract isn't approved."
        );
        require(
            _listedNfts[nftContract][tokenId].listing,
            "NFT isn't listed for sale."
        );

        _listedNfts[nftContract][tokenId].listing = false;

        emit NftUnlisted(seller, nftContract, tokenId, block.timestamp);
    }

    function buy(address nftContract, uint256 tokenId) external nonReentrant {
        NftItem memory targetNft = _listedNfts[nftContract][tokenId];

        require(targetNft.listing, "NFT isn't listed for sale.");

        address buyer = msg.sender;

        require(
            _payment.transferFrom(buyer, targetNft.seller, targetNft.price),
            "Payment for NFT failed."
        );

        IERC721 nft = IERC721(nftContract);

        nft.safeTransferFrom(targetNft.seller, buyer, tokenId);

        _listedNfts[nftContract][tokenId].seller = buyer;
        _listedNfts[nftContract][tokenId].listing = false;

        emit NftSold(buyer, nftContract, tokenId, targetNft.price);
    }
}
