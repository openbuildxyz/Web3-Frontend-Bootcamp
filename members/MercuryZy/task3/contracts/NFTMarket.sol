// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTMarket is ERC721Holder, Ownable {
    struct Listing {
        address seller;
        address nftContract;
        uint256 tokenId;
        uint256 price;
        bool active;
    }

    mapping(uint256 => Listing) public listings;
    uint256 public listingIndex;
    address public tokenAddress;

    event NFTListed(uint256 indexed index, address indexed seller, address indexed nftContract, uint256 tokenId, uint256 price);
    event NFTSold(uint256 indexed index, address indexed seller, address indexed buyer, address nftContract, uint256 tokenId, uint256 price);

    constructor(address _tokenAddress) Ownable(msg.sender) {
        tokenAddress = _tokenAddress;
    }

    function listNFT(address nftContract, uint256 tokenId, uint256 price) external {
        require(IERC721(nftContract).ownerOf(tokenId) == msg.sender, "Not the owner of this NFT");
        IERC721(nftContract).safeTransferFrom(msg.sender, address(this), tokenId);
        listings[listingIndex] = Listing({
            seller: msg.sender,
            nftContract: nftContract,
            tokenId: tokenId,
            price: price,
            active: true
        });
        emit NFTListed(listingIndex, msg.sender, nftContract, tokenId, price);
        listingIndex++;
    }

    function buyNFT(uint256 index) external {
        require(listings[index].active, "Listing not active");
        uint256 price = listings[index].price;
        address nftContract = listings[index].nftContract;
        uint256 tokenId = listings[index].tokenId;
        address seller = listings[index].seller;
        require(IERC20(tokenAddress).transferFrom(msg.sender, seller, price), "Transfer of ERC20 failed");
        IERC721(nftContract).safeTransferFrom(address(this), msg.sender, tokenId);
        listings[index].active = false;
        emit NFTSold(index, seller, msg.sender, nftContract, tokenId, price);
    }

    function cancelListing(uint256 index) external {
        require(listings[index].active, "Listing not active");
        require(listings[index].seller == msg.sender, "Not the seller of this listing");
        address nftContract = listings[index].nftContract;
        uint256 tokenId = listings[index].tokenId;
        IERC721(nftContract).safeTransferFrom(address(this), msg.sender, tokenId);
        listings[index].active = false;
        emit NFTListed(index, msg.sender, nftContract, tokenId, 0);
    }

    function getListing(uint256 index) external view returns (Listing memory) {
        return listings[index];
    }
}