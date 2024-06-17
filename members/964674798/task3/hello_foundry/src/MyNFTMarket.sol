// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTMarket is Ownable, IERC721Receiver {
    struct Listing {
        address seller;
        address nftContract;
        uint256 tokenId;
        uint256 price;
    }

    IERC20 public paymentToken;
    uint256 public listingFee;
    uint256 public totalListings;

    mapping(uint256 => Listing) public listings;

    event NFTListed(uint256 listingId, address indexed seller, address indexed nftContract, uint256 indexed tokenId, uint256 price);
    event NFTPurchased(uint256 listingId, address indexed buyer);

    constructor(IERC20 _paymentToken, uint256 _listingFee) {
        paymentToken = _paymentToken;
        listingFee = _listingFee;
    }

    function listNFT(address nftContract, uint256 tokenId, uint256 price) external {
        require(price > 0, "Price must be greater than zero");

        totalListings++;
        listings[totalListings] = Listing(msg.sender, nftContract, tokenId, price);

        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

        emit NFTListed(totalListings, msg.sender, nftContract, tokenId, price);
    }

    function buyNFT(uint256 listingId) external {
        Listing memory listing = listings[listingId];
        require(listing.price > 0, "Listing does not exist");

        require(paymentToken.transferFrom(msg.sender, listing.seller, listing.price), "Payment failed");

        IERC721(listing.nftContract).safeTransferFrom(address(this), msg.sender, listing.tokenId);

        delete listings[listingId];

        emit NFTPurchased(listingId, msg.sender);
    }

    function onERC721Received(address, address, uint256, bytes calldata) external pure override returns (bytes4) {
        return this.onERC721Received.selector;
    }
}
