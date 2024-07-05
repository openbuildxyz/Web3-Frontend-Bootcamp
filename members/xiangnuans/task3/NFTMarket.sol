// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract NFTMarket {
    struct Listing {
        address seller;
        address nftContract;
        uint256 tokenId;
        uint256 price;
        bool isActive;
    }

    mapping(address => mapping(uint256 => Listing)) public listings;
    IERC20 public paymentToken;

    event NFTListed(
        address indexed seller,
        address indexed nftContract,
        uint256 indexed tokenId,
        uint256 price
    );
    event NFTBought(
        address indexed buyer,
        address indexed nftContract,
        uint256 indexed tokenId,
        uint256 price
    );

    constructor(IERC20 _paymentToken) {
        paymentToken = IERC20(_paymentToken);
    }

    function listNFT(
        address _nftContract,
        uint256 _tokenId,
        uint256 _price
    ) external {
        IERC721 nft = IERC721(_nftContract);
        require(
            nft.ownerOf(_tokenId) == msg.sender,
            "Not the owner of the NFT"
        );
        // require(
        //     nft.isApprovedForAll(msg.sender, address(this)),
        //     "Contract not approved"
        // );
        require(
            nft.getApproved(_tokenId) == address(this),
            "Contract not approved"
        );

        listings[_nftContract][_tokenId] = Listing(
            msg.sender,
            _nftContract,
            _tokenId,
            _price,
            true
        );
        emit NFTListed(msg.sender, _nftContract, _tokenId, _price);
    }

    function getAllListings() external view returns (Listing[] memory) {
        return listings;
    }

    function buyNFT(uint256 index) external {
        Listing storage listing = listings[index];
        require(listing.price > 0, "NFT not for sale");

        IERC721 nft = IERC721(_nftContract);
        require(
            paymentToken.transferFrom(
                msg.sender,
                listing.seller,
                listing.price
            ),
            "Payment failed"
        );

        nft.safeTransferFrom(listing.seller, msg.sender, _tokenId);
        listing.isActive = false;

        emit NFTBought(msg.sender, _nftContract, _tokenId, listing.price);
    }
}
