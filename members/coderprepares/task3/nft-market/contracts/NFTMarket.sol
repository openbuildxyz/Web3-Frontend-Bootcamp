// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract NFTMarket {
    struct Listing {
        address seller;
        uint256 tokenId;
        uint256 price;
    }

    IERC20 public paymentToken;
    IERC721 public nftContract;
    mapping(uint256 => Listing) public listings;
    uint256[] public listedTokenIds;
    mapping(address => uint256[]) public sellerTokenIds;

    event NFTListed(address indexed seller, uint256 indexed tokenId, uint256 price);
    event NFTPurchased(address indexed buyer, uint256 indexed tokenId, uint256 price);

    constructor(IERC20 _paymentToken, IERC721 _nftContract) {
        paymentToken = _paymentToken;
        nftContract = _nftContract;
    }

    function listNFT(uint256 tokenId, uint256 price) external {
        nftContract.transferFrom(msg.sender, address(this), tokenId);
        listings[tokenId] = Listing(msg.sender, tokenId, price);
        listedTokenIds.push(tokenId);
        sellerTokenIds[msg.sender].push(tokenId);

        emit NFTListed(msg.sender, tokenId, price);
    }

    function buyNFT(uint256 tokenId) external {
        Listing memory listing = listings[tokenId];
        require(listing.price > 0, "NFT not listed");

        paymentToken.transferFrom(msg.sender, listing.seller, listing.price);
        nftContract.transferFrom(address(this), msg.sender, tokenId);

        delete listings[tokenId];
        _removeTokenId(tokenId);
        _removeSellerTokenId(listing.seller, tokenId);

        emit NFTPurchased(msg.sender, tokenId, listing.price);
    }

    function getListedNFTs() external view returns (Listing[] memory) {
        Listing[] memory allListings = new Listing[](listedTokenIds.length);
        for (uint256 i = 0; i < listedTokenIds.length; i++) {
            allListings[i] = listings[listedTokenIds[i]];
        }
        return allListings;
    }

    function getSellerTokenIds(address seller) external view returns (uint256[] memory) {
        return sellerTokenIds[seller];
    }

    function _removeTokenId(uint256 tokenId) internal {
        uint256 length = listedTokenIds.length;
        for (uint256 i = 0; i < length; i++) {
            if (listedTokenIds[i] == tokenId) {
                listedTokenIds[i] = listedTokenIds[length - 1];
                listedTokenIds.pop();
                break;
            }
        }
    }

    function _removeSellerTokenId(address seller, uint256 tokenId) internal {
        uint256[] storage tokenIds = sellerTokenIds[seller];
        uint256 length = tokenIds.length;
        for (uint256 i = 0; i < length; i++) {
            if (tokenIds[i] == tokenId) {
                tokenIds[i] = tokenIds[length - 1];
                tokenIds.pop();
                break;
            }
        }
    }
}
