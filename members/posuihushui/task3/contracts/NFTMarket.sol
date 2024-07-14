// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract NFTMarket {
    struct Listing {
        address seller;
        address nftContract;
        uint256 tokenId;
        uint256 price;
    }

    IERC20 public paymentToken;
    mapping(uint256 => Listing) public listings;
    uint256 public listingCounter;

    event NFTListed(
        uint256 indexed listingId,
        address indexed seller,
        address nftContract,
        uint256 tokenId,
        uint256 price
    );

    event NFTPurchased(
        uint256 indexed listingId,
        address indexed buyer,
        address indexed seller,
        address nftContract,
        uint256 tokenId,
        uint256 price
    );

    constructor(address _paymentToken) {
        paymentToken = IERC20(_paymentToken);
    }

    function listNFT(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) public {
        require(price > 0, "Price must be greater than zero");
        IERC721 nft = IERC721(nftContract);
        require(nft.ownerOf(tokenId) == msg.sender, "You do not own this NFT");
        require(
            nft.isApprovedForAll(msg.sender, address(this)),
            "Contract is not approved"
        );
        nft.transferFrom(msg.sender, address(this), tokenId);
        listings[listingCounter] = Listing(msg.sender, nftContract, tokenId, price);
        emit NFTListed(listingCounter, msg.sender, nftContract, tokenId, price);
        listingCounter++;
    }

    function purchaseNFT(uint256 listingId) public {
        Listing memory listing = listings[listingId];
        require(listing.price > 0, "Listing does not exist");
        require(
            paymentToken.transferFrom(
                msg.sender,
                listing.seller,
                listing.price
            ),
            "Payment failed"
        );
        IERC721(listing.nftContract).safeTransferFrom(
            address(this),
            msg.sender,
            listing.tokenId
        );
        delete listings[listingId];
        emit NFTPurchased(
            listingId,
            msg.sender,
            listing.seller,
            listing.nftContract,
            listing.tokenId,
            listing.price
        );
    }
}
