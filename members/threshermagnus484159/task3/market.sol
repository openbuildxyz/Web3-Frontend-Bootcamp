// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./IERC20.sol";
import "./IERC721.sol";

contract NFTMarket {

    IERC721 public nftContract;
    IERC20 public erc20Contract;

    address public owner;
    uint256 public listingcount = 1;

    struct Listing {
        
        address nftAddress;
        uint256 tokenId;
        address seller;
        uint256 price;
        bool isForSale;
        uint256 time;
        string tokenURL;
    }

    mapping(uint256 => Listing) public listings;

    uint256[] public listedTokenIds; 

    event NFTListed(uint256 tokenId, address seller, uint256 price);
    event NFTPurchased(uint256 tokenId, address buyer, uint256 price);
    event NFTUnlisted(uint256 tokenId, address seller);

    constructor(address _erc20Address) {
        owner = msg.sender;
        erc20Contract = IERC20(_erc20Address);
    }

    function listNFT(address _nftAddress, uint256 tokenId, uint256 price,uint256 time,string calldata _tokenURL) public {
        require(_nftAddress != address(0), "Invalid NFT address");
        require(price > 0, "Price must be greater than zero");

        nftContract = IERC721(_nftAddress);

        require(nftContract.getApproved(tokenId) == address(this), "Please first approve the NFT to the market contract address");
        require(nftContract.ownerOf(tokenId) == msg.sender, "Caller is not the owner of the token");
        require(!listings[tokenId].isForSale, "NFT is already listed");

        listings[listingcount] = Listing(_nftAddress, tokenId, msg.sender, price, true,time, _tokenURL);
        listedTokenIds.push(listingcount);
        listingcount++;

        emit NFTListed(tokenId, msg.sender, price);
    }

    function buyNFT(uint256 listingID) public {
        Listing storage listing = listings[listingID];

        require(listing.isForSale, "NFT is not for sale");
        require(erc20Contract.allowance(msg.sender, address(this)) >= listing.price, "Please first approve ERC20 to the market contract address");

        bool erc20TransferSuccess = erc20Contract.transferFrom(msg.sender, listing.seller, listing.price);
        require(erc20TransferSuccess, "ERC20 transfer failed");

        nftContract.transferFrom(listing.seller, msg.sender, listing.tokenId);

        listing.isForSale = false;

        emit NFTPurchased(listing.tokenId, msg.sender, listing.price);
    }

    function unlistNFT(uint256 listingID) public {
        Listing storage listing = listings[listingID];

        require(listing.isForSale, "NFT is not listed for sale");
        require(nftContract.ownerOf(listing.tokenId) == msg.sender, "Only the owner can unlist the NFT");


        uint256 length = listedTokenIds.length;
        for (uint256 i = 0; i < length; i++) {
            if (listedTokenIds[i] == listing.tokenId) {
                listedTokenIds[i] = listedTokenIds[length - 1];
                listedTokenIds.pop();
                break;
            }
        }

        listing.isForSale = false;

        emit NFTUnlisted(listing.tokenId, msg.sender);
    }

    function getAllListedTokenIds() public view returns (uint256[] memory) {
        return listedTokenIds;
    }
}