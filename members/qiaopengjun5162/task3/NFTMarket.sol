// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "@openzeppelin/contracts/interfaces/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Market is ReentrancyGuard {
    struct Listing {
        address seller;
        address nftContract;
        uint256 tokenId;
        uint256 price;
        bool isActive;
    }

    IERC20 public paymentToken;
    mapping(address => mapping(uint256 => Listing)) public listings;

    event NFTListed(
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

    constructor(address _paymentToken) {
        paymentToken = IERC20(_paymentToken);
    }

    function listNFT(
        address _nftContract,
        uint256 _tokenId,
        uint256 _price
    ) external {
        IERC721 nft = IERC721(_nftContract);
        require(nft.ownerOf(_tokenId) == msg.sender, "NFT not owned by you");
        require(
            nft.isApprovedForAll(msg.sender, address(this)),
            "Not approved for this contract"
        );
        listings[_nftContract][_tokenId] = Listing(
            msg.sender,
            _nftContract,
            _tokenId,
            _price,
            true
        );
        emit NFTListed(msg.sender, _nftContract, _tokenId, _price);
    }

    function buyNFT(
        address _nftContract,
        uint256 _tokenId
    ) external nonReentrant {
        Listing storage listing = listings[_nftContract][_tokenId];
        require(listing.price > 0, "NFT not listed for sale");
        require(listing.isActive, "NFT not active");

        IERC721 nft = IERC721(_nftContract);

        require(
            paymentToken.transferFrom(
                msg.sender,
                listing.seller,
                listing.price
            ),
            "payment failed"
        );
        nft.safeTransferFrom(listing.seller, msg.sender, _tokenId);
        listing.isActive = false;

        emit NFTPurchased(msg.sender, _nftContract, _tokenId, listing.price);
    }
}
