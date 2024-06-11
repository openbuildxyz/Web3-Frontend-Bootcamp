// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract NFTMarket is ReentrancyGuard {
    struct Listing {
        address seller;
        uint256 price;
    }

    mapping(address => mapping(uint256 => Listing)) public listings;
    IERC20 public paymentToken;

    event NFTListed(
        address indexed nftAddress,
        uint256 indexed tokenId,
        address seller,
        uint256 price
    );

    event NFTBought(
        address indexed nftAddress,
        uint256 indexed tokenId,
        address buyer,
        uint256 price
    );

    constructor(address _paymentToken) {
        paymentToken = IERC20(_paymentToken);
    }

    function listItem(
        address _nftAddress,
        uint256 _tokenId,
        uint256 _price
    ) external {
        IERC721 nft = IERC721(_nftAddress);
        require(nft.ownerOf(_tokenId) == msg.sender, "Not the owner");
        require(nft.isApprovedForAll(msg.sender, address(this)), "No approval");

        listings[_nftAddress][_tokenId] = Listing({
            seller: msg.sender,
            price: _price
        });

        emit NFTListed(_nftAddress, _tokenId, msg.sender, _price);
    }

    function buyItem(
        address _nftAddress,
        uint256 _tokenId
    ) external nonReentrant {
        Listing memory item = listings[_nftAddress][_tokenId];
        require(item.seller != address(0), "Not listed");

        paymentToken.transferFrom(msg.sender, item.seller, item.price);
        IERC721(_nftAddress).safeTransferFrom(
            item.seller,
            msg.sender,
            _tokenId
        );

        delete listings[_nftAddress][_tokenId];

        emit NFTBought(_nftAddress, _tokenId, msg.sender, item.price);
    }
}
