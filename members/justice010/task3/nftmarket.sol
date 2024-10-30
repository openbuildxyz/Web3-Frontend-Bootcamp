// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTMarket is Ownable {
    uint256 private _listingIdCounter;

    struct NFTListing {
        uint256 id;
        address nftContract;
        uint256 tokenId;
        address seller;
        uint256 price;
        bool sold;
    }

    mapping(uint256 => NFTListing) public nftItems;

    event NFTListed(
        uint256 listingId,
        address indexed nftContract,
        uint256 indexed tokenId,
        address indexed seller,
        uint256 price
    );
    event NFTPurchased(uint256 listingId, address indexed buyer, uint256 price);

    constructor() Ownable(msg.sender) {}

    function listNFT(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) external {
        require(price > 0, "Price must be greater than 0");
        require(IERC721(nftContract).ownerOf(tokenId) == msg.sender, "You do not own this NFT");
        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

        _listingIdCounter++;
        uint256 listingId = _listingIdCounter;

        nftItems[listingId] = NFTListing({
            id: listingId,
            nftContract: nftContract,
            tokenId: tokenId,
            seller: msg.sender,
            price: price,
            sold: false
        });

        emit NFTListed(listingId, nftContract, tokenId, msg.sender, price);
    }

    function buyNFT(uint256 listingId, address erc20Token) external {
        NFTListing storage nftlisting = nftItems[listingId];
        require(nftlisting.sold == false, "NFT already sold");
        require(msg.sender != nftlisting.seller, "Seller cannot buy their own NFT");

        uint256 price = nftlisting.price;
        require(IERC20(erc20Token).balanceOf(msg.sender) >= price, "Insufficient balance");
        require(IERC20(erc20Token).allowance(msg.sender, address(this)) >= price, "Insufficient allowance");

        IERC20(erc20Token).transferFrom(
            msg.sender,
            nftlisting.seller,
            price
        );
        IERC721(nftlisting.nftContract).transferFrom(
            address(this),
            msg.sender,
            nftlisting.tokenId
        );

        nftlisting.sold = true;

        emit NFTPurchased(listingId, msg.sender, nftlisting.price);
    }
}
