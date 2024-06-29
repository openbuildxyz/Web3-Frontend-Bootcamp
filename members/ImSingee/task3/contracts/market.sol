// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

struct Listing {
     address seller;
     address buyer;
     address nftContract;
     uint tokenId;
     uint pricing;
}

event NFTListed (
     address indexed seller,
     address indexed nftContract,
     uint indexed tokenId,
     uint pricing
);

event NFTSold (
     address indexed seller,
     address indexed buyer,
     address indexed nftContract,
     uint tokenId,
     uint pricing
);

contract BryanMarket {
     IERC20 public immutable currency;
     mapping(address => mapping(uint => Listing)) listings;

     constructor(address _currency) {
        currency = IERC20(_currency);
     }

     function listingNFT(address _nft, uint tokenId, uint pricing) external {
          IERC721 nft = IERC721(_nft);

          require(nft.ownerOf(tokenId) == msg.sender, "require owner");
          require(nft.isApprovedForAll(msg.sender, address(this)) || nft.getApproved(tokenId) == address(this), "not approved");
          
          listings[_nft][tokenId] = Listing(
               msg.sender,
               address(0),
               _nft,
               tokenId,
               pricing
          );

          emit NFTListed(msg.sender, _nft, tokenId, pricing);
     }

     function buyNFT(address _nft, uint tokenId) external {
          Listing storage item = listings[_nft][tokenId];
          require(item.seller != address(0), "required nft does not exist");
          require(item.buyer == address(0), "nft sold out");

          require(currency.transferFrom(msg.sender, item.seller, item.pricing), "failed to pay");

          IERC721 nft = IERC721(item.nftContract);
          nft.safeTransferFrom(item.seller , msg.sender, tokenId);
          item.buyer = msg.sender;

          emit NFTSold (
               item.seller,
               msg.sender,
               _nft,
               tokenId,
               item.pricing
          );
     }
}