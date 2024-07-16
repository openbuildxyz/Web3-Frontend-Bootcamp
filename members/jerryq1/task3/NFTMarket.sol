// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTMarket is Ownable {
    IERC20 public erc20Token;

    struct Listing {
        address seller;
        address nftAddress;
        uint256 tokenId;
        uint256 price;
    }

    Listing[] public listings;

    event NFTListed(address seller, address nftAddress, uint256 tokenId, uint256 price);
    event NFTPurchased(address buyer, address nftAddress, uint256 tokenId, uint256 price);

    constructor(address _erc20Token, address initialOwner) Ownable(initialOwner) {
        erc20Token = IERC20(_erc20Token);
    }

    function listNFT(address _nftAddress, uint256 _tokenId, uint256 _price) public {
        IERC721(_nftAddress).transferFrom(msg.sender, address(this), _tokenId);
        listings.push(Listing(msg.sender, _nftAddress, _tokenId, _price));
        emit NFTListed(msg.sender, _nftAddress, _tokenId, _price);
    }

    function purchaseNFT(uint256 _listingId) public {
        require(_listingId < listings.length, "Listing does not exist");
        Listing memory listing = listings[_listingId];
        require(erc20Token.transferFrom(msg.sender, listing.seller, listing.price), "Payment failed");
        IERC721(listing.nftAddress).transferFrom(address(this), msg.sender, listing.tokenId);
        emit NFTPurchased(msg.sender, listing.nftAddress, listing.tokenId, listing.price);
        delete listings[_listingId];
    }
}
