// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

contract BerNFTMarket is IERC721Receiver{
    IERC20 public bertoken;
    IERC721 public bernft;

    struct Listing {
        address seller;
        uint256 price;
    }
    mapping(uint256=>Listing) public listings;

    constructor(address _nft, address _token){
        bernft = IERC721(_nft);
        bertoken = IERC20(_token);
    }

    function listNFT(uint256 tokenId, uint256 price) public{
        require(bernft.ownerOf(tokenId)==address(msg.sender),"Not the owner");
        bernft.transferFrom(msg.sender,address(this),tokenId);
        listings[tokenId] = Listing(msg.sender, price);
    }
    function buyNFT(uint256 tokenId) public{
        Listing memory listing = listings[tokenId];
        require(listing.seller != address(0),"Not listed");
        require(bertoken.transferFrom(msg.sender, listing.seller, listing.price),"Payment failed");
        bernft.transferFrom(address(this), msg.sender,tokenId);
        delete listings[tokenId];

    }
        // Implementing the IERC721Receiver interface
    function onERC721Received(address, address, uint256, bytes memory) public virtual override returns (bytes4) {
        return this.onERC721Received.selector;
    }
}
