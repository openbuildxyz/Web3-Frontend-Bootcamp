// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract NFTMarket is ReentrancyGuard {
    struct Listing {
        address nftAddress;
        uint256 tokenId;
        address seller;
        uint256 price;
    }

    Listing[] public allListings;
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

    function getAllListings() external view returns (Listing[] memory) {
        return allListings;
    }

    function listItem(
        address _nftAddress,
        uint256 _tokenId,
        uint256 _price
    ) external {
        IERC721 nft = IERC721(_nftAddress);
        require(nft.ownerOf(_tokenId) == msg.sender, "Not the owner");
        require(nft.isApprovedForAll(msg.sender, address(this)), "No approval");

        Listing memory listing = Listing({
            nftAddress: _nftAddress,
            tokenId: _tokenId,
            seller: msg.sender,
            price: _price
        });
        allListings.push(listing);

        emit NFTListed(_nftAddress, _tokenId, msg.sender, _price);
    }

    function buyItem(uint256 _index) external nonReentrant {
        Listing memory item = allListings[_index];
        require(item.seller != address(0), "Not listed");

        paymentToken.transferFrom(msg.sender, item.seller, item.price);
        IERC721(item.nftAddress).safeTransferFrom(
            item.seller,
            msg.sender,
            item.tokenId
        );

        allListings[_index] = allListings[allListings.length - 1];
        allListings.pop();

        emit NFTBought(item.nftAddress, item.tokenId, msg.sender, item.price);
    }
}
