// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { IERC721 } from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import { IERC721Metadata } from "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";
import { ReentrancyGuard } from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract NFTMarket is ReentrancyGuard {
    struct NFTItem {
        address seller;
        address nftContract;
        uint256 tokenId;
        string nftURI;
        uint256 price;
        bool isListed;
        uint256 listedTime;
        uint256 delistedTime;
    }

    struct NFTTag {
        address nftContract;
        uint256 tokenId;
    }

    mapping(address => mapping(uint256 =>  NFTItem)) public listedNFTs;
    mapping(address => mapping(uint256 => bool)) private _isListedFlags;

    IERC20 public paymentToken;
    NFTTag[] private _nftags;

    event List(
        address indexed seller,
        address indexed nftContract,
        uint256 indexed tokenId,
        uint256 price
    );

    event Buy(
        address indexed buyer,
        address indexed nftContract,
        uint256 indexed tokenId,
        uint256 price
    );

    event Delist(
        address indexed seller,
        address indexed nftContract,
        uint256 indexed tokenId,
        uint256 delistedTime
    );

    constructor(address _paymentToken) {
        paymentToken = IERC20(_paymentToken);
    }

    function listNFT(address _nftContract, uint256 _tokenId, uint256 _price) external  {
        IERC721 nft = IERC721(_nftContract);
        IERC721Metadata nftMetadata = IERC721Metadata(_nftContract);
        address seller = msg.sender;

        require(nft.ownerOf(_tokenId) == seller, "Not the owner of the NFT");
        require(nft.isApprovedForAll(seller, address(this)), "Contract is not approved");

        bool nftListed = _isListedFlags[_nftContract][_tokenId];
        string memory uri = nftMetadata.tokenURI(_tokenId);

        if (nftListed) {
            NFTItem storage nftItem = listedNFTs[_nftContract][_tokenId];
            nftItem.seller = seller;
            nftItem.price = _price;
            nftItem.listedTime = block.timestamp;
            nftItem.isListed = true;
        } else {
            listedNFTs[_nftContract][_tokenId] = NFTItem(
                seller,
                _nftContract,
                _tokenId,
                uri,
                _price,
                true,
                block.timestamp,
                0
            );
            _nftags.push(NFTTag(_nftContract, _tokenId));
            _isListedFlags[_nftContract][_tokenId] = true;
        }

        emit List(seller, _nftContract, _tokenId, _price);
    }

    function delistNFT(address _nftContract, uint256 _tokenId) external {
        IERC721 nft = IERC721(_nftContract);
        NFTItem storage nftItem = listedNFTs[_nftContract][_tokenId];
        address seller = msg.sender;

        require(nft.ownerOf(_tokenId) == seller, "Not the owner of the NFT");
        require(nft.isApprovedForAll(seller, address(this)), "Contract is not approved");
        require(nftItem.isListed, "NFT not listed for sale");

        nftItem.isListed = false;
        nftItem.delistedTime = block.timestamp;

        emit Delist(seller, _nftContract, _tokenId, nftItem.delistedTime);
    }

    function buyNFT(address _nftContract, uint256 _tokenId) external nonReentrant {
        NFTItem storage nftItem = listedNFTs[_nftContract][_tokenId];
        require(nftItem.isListed, "NFT not listed for sale");

        address buyer = msg.sender;
        require(
            paymentToken.transferFrom(buyer, nftItem.seller, nftItem.price),
            "Payment failed"
        );

        IERC721 nft = IERC721(_nftContract);
        nft.safeTransferFrom(nftItem.seller, buyer, _tokenId);

        nftItem.seller = buyer;
        nftItem.isListed = false;
        nftItem.delistedTime = 0;

        emit Buy(buyer, _nftContract, _tokenId, nftItem.price);
    }

    function getAllListedNFTs() external view returns (NFTItem[] memory) {
        NFTItem[] memory nfts = new NFTItem[] (_nftags.length);
        NFTTag memory nftag;
        for (uint256 i = 0; i < _nftags.length; i++) {
            nftag = _nftags[i];
            nfts[i] = listedNFTs[nftag.nftContract][nftag.tokenId];
        }
        return nfts;
    }

    function isListed(address _nftContract, uint256 _tokenId) external view returns (bool) {
        return _isListedFlags[_nftContract][_tokenId];
    }
}