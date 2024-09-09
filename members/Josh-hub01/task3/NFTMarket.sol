// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MarketPlace is ReentrancyGuard {
    IERC20 public token;

    struct NFT {
        address nftContract;
        uint256 price;
        address payable seller;
        uint256 tokenId;
    }
    
    event NFTListed(
        address nftContract,
        uint256 tokenId,
        address seller,
        uint256 price
    );
    
    event NFTSold(
        address nftContract,
        uint256 tokenId,
        address owner,
        uint256 price
    );

    mapping(uint256 => NFT) private listings;

    constructor(IERC20 _token) {
        token = _token;
    }

    function listItem(address nftContract, uint256 tokenId, uint256 price) public {
        IERC721 nft = IERC721(nftContract);
        require(nft.ownerOf(tokenId) == msg.sender, "Only the owner can list this NFT");
        require(nft.isApprovedForAll(msg.sender, msg.sender), "Marketplace not approved");

        listings[tokenId] = NFT(nftContract, price, payable(msg.sender), tokenId);
        emit NFTListed(nftContract, tokenId, msg.sender, price);
    }

    function buyItem(address nftContract, uint256 tokenId) public payable nonReentrant {
        NFT storage nft = listings[tokenId];
        IERC721 nftContractInstance = IERC721(nft.nftContract);
        
        require(nft.price > 0, "Item not listed for sale");
        require(nftContractInstance.ownerOf(tokenId) == nft.seller, "ERC721IncorrectOwner: Seller is not the owner");
        require(token.transferFrom(msg.sender, nft.seller, nft.price), "Payment failed");

        address payable buyer = payable(msg.sender);

        delete listings[tokenId];
        IERC721(nftContract).transferFrom(nft.seller, buyer, tokenId);

        emit NFTSold(nftContract, tokenId, msg.sender, nft.price);
    }
}
