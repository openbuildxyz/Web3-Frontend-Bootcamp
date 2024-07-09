// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTMarket is Ownable {
    struct Listing {
        uint256 id;
        address seller;
        address nftContract;
        uint256 tokenId;
        uint256 price;
        string url;
    }

    IERC20 public currencyToken;
    uint256 public listingCount;
    mapping(uint256 => Listing) public listings;

    event NFTListed(uint256 listingId, address seller, address nftContract, uint256 tokenId, uint256 price, string url);
    event NFTBought(uint256 listingId, address buyer);
    event NFTDelisted(uint256 listingId);

    constructor(address _currencyToken) Ownable(msg.sender) {
        currencyToken = IERC20(_currencyToken);
    }

    function listNFT(address _nftContract, uint256 _tokenId, uint256 _price) external {
        require(_price > 0, "Price must be greater than zero");
        IERC721 nftContract = IERC721(_nftContract);
        require(nftContract.ownerOf(_tokenId) == msg.sender, "You do not own this NFT");
        require(nftContract.isApprovedForAll(msg.sender, address(this)), "Market contract is not approved");

        // Get the token URI from the NFT contract
        string memory tokenURI = IERC721Metadata(_nftContract).tokenURI(_tokenId);

        listingCount++;
        uint256 newListingId = listingCount;
        listings[newListingId] = Listing(newListingId, msg.sender, _nftContract, _tokenId, _price, tokenURI);

        emit NFTListed(newListingId, msg.sender, _nftContract, _tokenId, _price, tokenURI);
    }

    function buyNFT(uint256 _listingId) external {
        Listing memory listing = listings[_listingId];
        require(listing.price > 0, "NFT is not listed");

        currencyToken.transferFrom(msg.sender, listing.seller, listing.price);
        IERC721(listing.nftContract).transferFrom(listing.seller, msg.sender, listing.tokenId);

        delete listings[_listingId];

        emit NFTBought(_listingId, msg.sender);
    }

    function delistNFT(uint256 _listingId) external {
        Listing memory listing = listings[_listingId];
        require(listing.seller == msg.sender, "You are not the seller of this NFT");
        require(listing.price > 0, "NFT is not listed");

        delete listings[_listingId];

        emit NFTDelisted(_listingId);
    }

    function getAllListings() external view returns (Listing[] memory) {
        uint256 activeListingCount = 0;
        for (uint256 i = 1; i <= listingCount; i++) {
            if (listings[i].price > 0) {
                activeListingCount++;
            }
        }

        Listing[] memory activeListings = new Listing[](activeListingCount);
        uint256 index = 0;
        for (uint256 i = 1; i <= listingCount; i++) {
            if (listings[i].price > 0) {
                activeListings[index] = listings[i];
                index++;
            }
        }
        return activeListings;
    }
}
