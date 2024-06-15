// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

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
    Listing[] public listings;

    event NFTListed(
        address seller,
        address nftContract,
        uint256 tokenId,
        uint256 price
    );
    event NFTBought(
        address buyer,
        address nftContract,
        uint256 tokenId,
        uint256 price
    );

    constructor(address _paymentToken) {
        paymentToken = IERC20(_paymentToken);
    }

    function listNFT(
        address _nftContract,
        uint256 _tokenId,
        uint256 _price
    ) public {
        IERC721 nft = IERC721(_nftContract);
        require(nft.ownerOf(_tokenId) == msg.sender, "You do not own this NFT");
        require(
            nft.getApproved(_tokenId) == address(this),
            "Market is not approved"
        );

        listings.push(Listing(msg.sender, _nftContract, _tokenId, _price));

        emit NFTListed(msg.sender, _nftContract, _tokenId, _price);
    }

    function buyNFT(uint256 _listingId) public {
        Listing memory listing = listings[_listingId];
        require(
            paymentToken.transferFrom(
                msg.sender,
                listing.seller,
                listing.price
            ),
            "Payment failed"
        );

        IERC721 nft = IERC721(listing.nftContract);
        nft.safeTransferFrom(listing.seller, msg.sender, listing.tokenId);

        emit NFTBought(
            msg.sender,
            listing.nftContract,
            listing.tokenId,
            listing.price
        );

        // Remove listing
        listings[_listingId] = listings[listings.length - 1];
        listings.pop();
    }

    function getListings() public view returns (Listing[] memory) {
        return listings;
    }
}
