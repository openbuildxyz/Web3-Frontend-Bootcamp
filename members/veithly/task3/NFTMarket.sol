// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTMarket is Ownable {
    struct Listing {
        address seller;
        address nftContract;
        uint256 tokenId;
        uint256 price;
    }

    IERC20 public currencyToken;
    uint256 public listingCount;
    mapping(uint256 => Listing) public listings;

    event NFTListed(uint256 listingId, address seller, address nftContract, uint256 tokenId, uint256 price);
    event NFTBought(uint256 listingId, address buyer);

    constructor(address _currencyToken) Ownable(msg.sender) {
        currencyToken = IERC20(_currencyToken);
    }

    function listNFT(address _nftContract, uint256 _tokenId, uint256 _price) external {
        IERC721 nftContract = IERC721(_nftContract);
        require(nftContract.ownerOf(_tokenId) == msg.sender, "You do not own this NFT");
        require(nftContract.isApprovedForAll(msg.sender, address(this)), "Market contract is not approved");

        listingCount++;
        listings[listingCount] = Listing(msg.sender, _nftContract, _tokenId, _price);

        emit NFTListed(listingCount, msg.sender, _nftContract, _tokenId, _price);
    }

    function buyNFT(uint256 _listingId) external {
        Listing memory listing = listings[_listingId];
        require(listing.price > 0, "NFT is not listed");

        currencyToken.transferFrom(msg.sender, listing.seller, listing.price);
        IERC721(listing.nftContract).transferFrom(listing.seller, msg.sender, listing.tokenId);

        delete listings[_listingId];

        emit NFTBought(_listingId, msg.sender);
    }


    function getAllListings() external view returns (Listing[] memory) {
        Listing[] memory allListings = new Listing[](listingCount);
        for (uint256 i = 1; i <= listingCount; i++) {
            allListings[i-1] = listings[i];
        }
        return allListings;
    }
}
