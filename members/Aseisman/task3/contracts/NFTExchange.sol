// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract NFTExchange is ReentrancyGuard{

    struct Listing{
        address seller;
        address nftContract;
        uint256 tokenId;
        uint256 price;
        bool isActive;
    }

    //拍卖清单
    mapping (address=>mapping (uint256=>Listing)) public _Listings;
    IERC20 public _paymentToken;
    
    // 所有NFT
    Listing[] private _AllListings;

    event NFTListed(
        address indexed seller,
        address indexed nftContract,
        uint256 indexed tokenId,
        uint256 price
    );

    event NFTPurchased(
        address indexed seller,
        address indexed buyer,
        uint256 indexed tokenId,
        uint256 price
    );

    constructor(address paymentToken){
        _paymentToken=IERC20(paymentToken);
    }

    //上架授予的NFT
    function ListingNFT(address nftContract, uint256 tokenId, uint256 price)external {
        IERC721 nft=IERC721(nftContract);
        require(nft.ownerOf(tokenId)==msg.sender,"ur not the owner of this NFT!");
        require(nft.isApprovedForAll(msg.sender, address(this)),"contract not approved!");

        _Listings[nftContract][tokenId]=Listing(
            msg.sender,
            nftContract,
            tokenId,
            price,
            true
        );
        _AllListings.push(Listing(
            msg.sender,
            nftContract,
            tokenId,
            price,
            true
        ));
        emit NFTListed(msg.sender, nftContract, tokenId, price);
    }

    //出售NFT
    function buyNFT(address nftContract,uint256 tokenId)external nonReentrant{
        Listing storage listing=_Listings[nftContract][tokenId];
        require(listing.isActive,"this NFT is not for sale!");

        IERC721 nft=IERC721(nftContract);
        require(_paymentToken.transferFrom(msg.sender, listing.seller, listing.price),"pay failed!");

        nft.safeTransferFrom(listing.seller, msg.sender, tokenId);
        listing.isActive=false;

        emit NFTPurchased(listing.seller, msg.sender, tokenId, listing.price);
    }

    //获取所有NFT 
    function getAllNFT() external view returns(Listing[] memory) {
        Listing[] memory allItem = new Listing[](_AllListings.length);
        Listing memory nftIdx;
        for (uint256 i = 0; i < _AllListings.length; i++) {
            nftIdx = _AllListings[i];
            allItem[i] = _Listings[nftIdx.nftContract][nftIdx.tokenId];
        }
        return allItem;
    }

}