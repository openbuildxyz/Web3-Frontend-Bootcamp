// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "openzeppelin-contracts/token/ERC721/IERC721.sol";
import "openzeppelin-contracts/token/ERC721/utils/ERC721Holder.sol";
import "openzeppelin-contracts/token/ERC20/IERC20.sol";

contract NFTMarketplace is ERC721Holder {
    struct Listing {
        address seller;
        address nftContractAddress;
        uint256 price;
        address paymentTokenAddress;
    }

    mapping(address => mapping(uint256 => Listing)) public listings;

    event Listed(
        address indexed seller,
        address indexed nftContractAddress,
        uint256 indexed tokenId,
        uint256 price,
        address paymentTokenAddress
    );

    event Purchased(
        address indexed buyer,
        address indexed nftContractAddress,
        uint256 indexed tokenId,
        uint256 price,
        address paymentTokenAddress
    );

    function listNFT(address nftContractAddress, uint256 tokenId, uint256 price, address paymentTokenAddress)
        external
    {
        require(price > 0, "Price must be greater than zero");
        IERC721(nftContractAddress).safeTransferFrom(msg.sender, address(this), tokenId);

        listings[nftContractAddress][tokenId] = Listing({
            seller: msg.sender,
            nftContractAddress: nftContractAddress,
            price: price,
            paymentTokenAddress: paymentTokenAddress
        });

        emit Listed(msg.sender, nftContractAddress, tokenId, price, paymentTokenAddress);
    }

    function buyNFT(address nftContractAddress, uint256 tokenId) external {
        Listing memory listing = listings[nftContractAddress][tokenId];
        require(listing.price > 0, "NFT not listed for sale");

        IERC20 paymentToken = IERC20(listing.paymentTokenAddress);
        require(paymentToken.transferFrom(msg.sender, listing.seller, listing.price), "ERC20 transfer failed");

        delete listings[nftContractAddress][tokenId];

        IERC721(listing.nftContractAddress).safeTransferFrom(address(this), msg.sender, tokenId);

        emit Purchased(msg.sender, listing.nftContractAddress, tokenId, listing.price, listing.paymentTokenAddress);
    }

    function removeListing(address nftContractAddress, uint256 tokenId) external {
        Listing memory listing = listings[nftContractAddress][tokenId];
        require(listing.seller == msg.sender, "You are not the seller");

        delete listings[nftContractAddress][tokenId];

        IERC721(listing.nftContractAddress).safeTransferFrom(address(this), msg.sender, tokenId);
    }
}
