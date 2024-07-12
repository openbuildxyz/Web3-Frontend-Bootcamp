// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract NFTMarket is ReentrancyGuard {
    struct Listing {
        address seller;
        uint256 price;
    }

    mapping(address => mapping(uint256 => Listing)) public listings;
    IERC20 public immutable paymentToken;

    event NFTListed(address indexed seller, address indexed nftContract, uint256 indexed tokenId, uint256 price);
    event NFTPurchased(address indexed buyer, address indexed seller, address indexed nftContract, uint256 tokenId, uint256 price);
    event NFTUnlisted(address indexed seller, address indexed nftContract, uint256 indexed tokenId);

    constructor(address _paymentToken) {
        require(_paymentToken != address(0), "Invalid payment token address");
        paymentToken = IERC20(_paymentToken);
    }

    function listNFT(address _nftContract, uint256 _tokenId, uint256 _price) external {
        require(_price > 0, "Price must be greater than zero");
        IERC721 nftContract = IERC721(_nftContract);
        require(_exists(nftContract, _tokenId), "NFT has not minted");
        require(nftContract.ownerOf(_tokenId) == msg.sender, "Not the owner of this NFT");
        require(nftContract.getApproved(_tokenId) == address(this), "Contract is not approved");

        listings[_nftContract][_tokenId] = Listing(msg.sender, _price);

        emit NFTListed(msg.sender, _nftContract, _tokenId, _price);
    }

    function unlistNFT(address _nftContract, uint256 _tokenId) external {
        Listing memory listing = listings[_nftContract][_tokenId];
        require(listing.seller == msg.sender, "Not the seller of this NFT");

        delete listings[_nftContract][_tokenId];

        emit NFTUnlisted(msg.sender, _nftContract, _tokenId);
    }

    function buyNFT(address _nftContract, uint256 _tokenId) external nonReentrant {
        Listing memory listing = listings[_nftContract][_tokenId];
        require(listing.seller != address(0), "NFT not listed for sale");
        require(listing.seller != msg.sender, "Cannot buy your own NFT");

        require(paymentToken.transferFrom(msg.sender, listing.seller, listing.price), "Payment failed");

        IERC721(_nftContract).safeTransferFrom(listing.seller, msg.sender, _tokenId);

        emit NFTPurchased(msg.sender, listing.seller, _nftContract, _tokenId, listing.price);

        delete listings[_nftContract][_tokenId];
    }

    function isNFTListed(address _nftContract, uint256 _tokenId) external view returns (bool) {
        return listings[_nftContract][_tokenId].seller != address(0);
    }

    function _exists(IERC721 nftContract, uint256 tokenId) internal view returns (bool) {
        try nftContract.ownerOf(tokenId) returns (address owner) {
            return owner != address(0);
        } catch {
            return false;
        }
    }
}