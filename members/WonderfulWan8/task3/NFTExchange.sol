pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract NFTExchange is ReentrancyGuard {
    struct Listing {
        address seller;
        address nftContract;
        uint256 tokenIdl;
        uint256 price;
        bool isActive;
    }
    mapping(address => mapping(uint256 => Listing)) public _Listings;
    IERC20 public _paymentToken;
    event NFTListed(
        address indexed seller,
        address indexed ntfContract,
        uint256 indexed tokenId,
        uint256 price
    );
    event NFTPurchased(
        address indexed seller,
        address indexed buyer,
        uint256 indexed tokenId,
        uint256 price
    );

    constructor(address paymentToken) {
        _paymentToken = IERC20(paymentToken);
    }

    function ListingNFT(
        address ntfContract,
        uint256 tokenId,
        uint256 price
    ) external {
        IERC721 nft = IERC721(ntfContract);
        require(
            nft.ownerOf(tokenId) == msg.sender,
            "you are not the owner of this NFT!"
        );
        require(
            nft.isApprovedForAll(msg.sender, address(this)),
            "contract not approved"
        );
        _Listings[ntfContract][tokenId] = Listing(
            msg.sender,
            ntfContract,
            tokenId,
            price,
            true
        );
        emit NFTListed((msg.sender), ntfContract, tokenId, price);
    }

    function buyNFT(address nftContract, uint256 tokenId)
        external
        nonReentrant
    {
        Listing storage listing = _Listings[nftContract][tokenId];
        require(listing.isActive, "this NFT is not for sale!");
        IERC721 nft = IERC721(nftContract);
        require(
            _paymentToken.transferFrom(
                msg.sender,
                listing.seller,
                listing.price
            ),
            "pay failed!"
        );
        nft.safeTransferFrom(listing.seller, msg.sender, tokenId);
        listing.isActive = false;
        emit NFTPurchased(listing.seller, msg.sender, tokenId, listing.price);
    }
}
