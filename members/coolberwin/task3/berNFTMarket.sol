// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
// import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
// import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v4.9/contracts/token/ERC721/IERC721.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v4.9/contracts/token/ERC20/IERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v4.9/contracts/token/ERC721/IERC721Receiver.sol";

contract BerNFTMarket is IERC721Receiver{
    IERC20 public bertoken;
    IERC721 public bernft;

    struct Listing {
        address seller;
        uint256 price;
    }
    mapping(address=>mapping(uint256=>Listing)) public listings;

    constructor(address _token){
        bertoken = IERC20(_token);
    }

    function listNFT(address nftAddr, uint256 tokenId, uint256 price) public{
        IERC721 nft = IERC721(nftAddr);
        require(nft.ownerOf(tokenId)==address(msg.sender),"Not the owner");
        nft.transferFrom(msg.sender,address(this),tokenId);
        listings[nftAddr][tokenId] = Listing(msg.sender, price);
    }
    function buyNFT(address nftAddr, uint256 tokenId) public{
        Listing memory listing = listings[nftAddr][tokenId];
        require(listing.seller != address(0),"Not listed");
        require(bertoken.transferFrom(msg.sender, listing.seller, listing.price),"Payment failed");
        IERC721(nftAddr).transferFrom(address(this), msg.sender,tokenId);
        delete listings[nftAddr][tokenId];

    }
        // Implementing the IERC721Receiver interface
    function onERC721Received(address, address, uint256, bytes memory) public virtual override returns (bytes4) {
        return this.onERC721Received.selector;
    }
}