// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract NFTMarket is ReentrancyGuard {
    //0x83Ac5678414dB95910e41B8ae1D281D25EE5b22a 部署后合约地址

    IERC20 public paymentToken;

    constructor(address _address) {
        paymentToken = IERC20(_address);
    }

    struct Listing {
        address seller;
        address nftContract;
        uint256 tokenId;
        uint256 price;
        bool active;
    }

    mapping(address => mapping(uint256 => Listing)) public listings;

    event NFTListed(
        address indexed nftContract,
        uint256 indexed tokenId,
        address indexed seller,
        uint256 price
    );

    event NFTPurchase(
        address indexed buyer,
        address indexed nftContract,
        uint256 indexed tokenId,
        uint256 price
    );

    function listNFT(
        address _nftContract,
        uint256 _tokenId,
        uint256 _price //2000000000
    ) external {
        IERC721 nft = IERC721(_nftContract);
        require(
            nft.ownerOf(_tokenId) == msg.sender,
            "Not the owner of this NFT"
        );
        require(
            nft.isApprovedForAll(msg.sender, address(this)),
            "Contract is not approved"
        );

        listings[_nftContract][_tokenId] = Listing(
            msg.sender,
            _nftContract,
            _tokenId,
            _price,
            true
        );
        emit NFTListed(_nftContract, _tokenId, msg.sender, _price);
    }

    function buyNFT(
        address _nftContract,
        uint256 _tokenId
    ) external nonReentrant {
        Listing storage listing = listings[_nftContract][_tokenId];
        require(listing.active, "NFT on listed for sale");
        IERC721 nft = IERC721(_nftContract);
        require(
            paymentToken.transferFrom(
                msg.sender,
                listing.seller,
                listing.price
            ),
            "payment failed"
        );
        nft.safeTransferFrom(listing.seller, msg.sender, _tokenId);
        // set listing active false
        listing.active = false;
        // watch sender listen
        emit NFTPurchase(msg.sender, _nftContract, _tokenId, listing.price);
    }
}
