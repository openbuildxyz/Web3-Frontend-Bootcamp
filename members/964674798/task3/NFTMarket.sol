// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTMarket is Ownable, IERC721Receiver {
    // listing nft need seller , contract , price ,tokenId
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

    constructor(IERC20 _paymentToken, uint256 _listingFee) Ownable(msg.sender) {
        paymentToken = _paymentToken;
        listingFee = _listingFee;
        _transferOwnership(msg.sender);
    }

    // indexed for quick search log
    event NFTlisted(
        uint256 listingId,
        address indexed seller,
        address indexed nftContract,
        uint256 tokenId,
        uint256 price
    );
    event NFTBuy(uint256 listingId, address seller);

    function ListingNft(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) external {
        // price is not allowed empty
        require(price > 0, "Price must greather than zero");

        totalListings++;
        listings[totalListings] = Listing(
            msg.sender,
            nftContract,
            tokenId,
            price
        );

        // sender to this sol
        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

        emit NFTlisted(totalListings, msg.sender, nftContract, tokenId, price);
    }

    function buyListingNft(uint256 listingId) external {
        Listing memory listing = listings[listingId];
        require(listing.price > 0, "listing is error!");
   
        _safeTransferForm(
            paymentToken,
            msg.sender,
            listing.seller,
            listing.price
        );

        IERC721(listing.nftContract).safeTransferFrom(
            address(this),
            msg.sender,
            listing.tokenId
        );

        delete listings[listingId];

        emit NFTBuy(listingId, msg.sender);
    }

    function _safeTransferForm(
        IERC20 myToken,
        address sender,
        address recipient,
        uint256 price
    ) private {
        bool sent = myToken.transferFrom(sender, recipient, price);
        require(sent, "Buy failed!");
    }

    // ensure receiver can revier ERC721
    function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) external pure override returns (bytes4) {
        return this.onERC721Received.selector;
    }
}
