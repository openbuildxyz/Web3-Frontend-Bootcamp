// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract NFTMarketplace is ReentrancyGuard {
    IERC20 public erc20Token;
    address public owner;

    struct Listing {
        address seller;
        address nftContract;
        uint256 tokenId;
        uint256 price;
    }

    mapping(uint256 => Listing) public listings;
    uint256 public listingCount;

    event NFTListed(
        uint256 indexed listingId,
        address indexed seller,
        address indexed nftContract,
        uint256 tokenId,
        uint256 price
    );
    event NFTPurchased(
        uint256 indexed listingId,
        address indexed buyer,
        address indexed nftContract,
        uint256 tokenId,
        uint256 price
    );

    constructor(address _erc20Token) {
        erc20Token = IERC20(_erc20Token);
        owner = msg.sender;
    }

    function listNFT(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) external nonReentrant {
        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

        listings[listingCount] = Listing({
            seller: msg.sender,
            nftContract: nftContract,
            tokenId: tokenId,
            price: price
        });

        emit NFTListed(listingCount, msg.sender, nftContract, tokenId, price);
        listingCount++;
    }

    function buyNFT(uint256 listingId) external nonReentrant {
        Listing memory listing = listings[listingId];

        require(listing.price > 0, "NFT not listed for sale");

        erc20Token.transferFrom(msg.sender, listing.seller, listing.price);
        IERC721(listing.nftContract).transferFrom(
            address(this),
            msg.sender,
            listing.tokenId
        );

        emit NFTPurchased(
            listingId,
            msg.sender,
            listing.nftContract,
            listing.tokenId,
            listing.price
        );

        delete listings[listingId];
    }
}
