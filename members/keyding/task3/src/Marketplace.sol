// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CavenNFTMarketplace is IERC721Receiver, Ownable {
    // NFT listing info
    struct Listing {
        address seller;
        address nftContract;
        uint256 tokenId;
        uint256 price;
        // Whether it has been sold
        bool isSold;
    }

    mapping(uint256 => Listing) public listings;
    uint256 public nextListingId;
    // ERC20 Token Contract Address
    IERC20 public paymentToken;

    // NFT listing event
    event NFTListed(
        address indexed seller, address indexed nftContract, uint256 indexed tokenId, uint256 price, uint256 listingId
    );
    // Bought NFT event
    event NFTBought(
        address indexed buyer, address indexed nftContract, uint256 indexed tokenId, uint256 price, uint256 listingId
    );

    constructor(IERC20 _paymentToken) Ownable(msg.sender) {
        paymentToken = _paymentToken;
    }

    function listNFT(address nftContract, uint256 tokenId, uint256 price) public returns (uint256) {
        IERC721 nft = IERC721(nftContract);
        require(price > 0, "Price must be greater than 0");
        require(nft.ownerOf(tokenId) == msg.sender, "You are not the owner of this NFT");
        require(
            nft.getApproved(tokenId) == address(this) || nft.isApprovedForAll(msg.sender, address(this)),
            "Marketplace is not approved to transfer this NFT"
        );

        // Transfer the NFT from the caller to the marketplace contract
        nft.safeTransferFrom(msg.sender, address(this), tokenId);

        // Save NFT listing information
        uint256 listingId = nextListingId++;
        listings[listingId] =
            Listing({seller: msg.sender, nftContract: nftContract, tokenId: tokenId, price: price, isSold: false});

        // Trigger NFTListed event
        emit NFTListed(msg.sender, nftContract, tokenId, price, listingId);

        return listingId;
    }

    function buyNFT(uint256 listingId) public {
        Listing storage listing = listings[listingId];
        require(!listing.isSold, "NFT is already sold");
        require(paymentToken.balanceOf(msg.sender) >= listing.price, "Insufficient balance");
        // The buyer transfers payment to the seller and confirms whether it was successful.
        require(paymentToken.transferFrom(msg.sender, listing.seller, listing.price), "Transfer failed");

        // Transfer NFT from marketplace to buyer
        IERC721(listing.nftContract).transferFrom(address(this), msg.sender, listing.tokenId);

        // Update listing sold status
        listing.isSold = true;

        // Trigger NFTBought event
        emit NFTBought(msg.sender, listing.nftContract, listing.tokenId, listing.price, listingId);
    }

    // Implement the onERC721Received function to allow the contract to receive ERC721 tokens
    function onERC721Received(address, /*operator*/ address, /*from*/ uint256, /*tokenId*/ bytes calldata /*data*/ )
        external
        pure
        override
        returns (bytes4)
    {
        return this.onERC721Received.selector;
    }
}
