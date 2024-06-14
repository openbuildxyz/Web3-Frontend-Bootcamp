// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract NFTMarket is ReentrancyGuard, Ownable {
    IERC20 public token; // ERC20 token used for payments
    uint256 public feePercent; // Marketplace fee as a percentage

    struct Listing {
        address seller;
        address nftContract;
        uint256 tokenId;
        uint256 price;
        bool sold;
    }

    Listing[] public listings;
    mapping(address => uint256[]) public sellerListings;
    mapping(address => mapping(address => uint256)) public allowance;


    event ListingIdCreated(uint256 indexed listingId);
    event NFTListed(address indexed seller, address indexed nftContract, uint256 indexed tokenId, uint256 price);
    event NFTPurchased(address indexed buyer, address indexed nftContract, uint256 indexed tokenId, uint256 price);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    constructor(address initialOwner, IERC20 _token, uint256 _feePercent)Ownable(initialOwner) {
        token = _token;
        feePercent = _feePercent;
    }

    function approve(address spender, uint256 amount) public returns (bool) {
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function listNFT(address nftContract, uint256 tokenId, uint256 price) external nonReentrant {
        require(price > 0, "Price must be greater than zero");
        
        require(IERC721(nftContract).getApproved(tokenId) == address(this) || IERC721(nftContract).isApprovedForAll(msg.sender, address(this)), "Market not approved");

        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

        listings.push(Listing({
            seller: msg.sender,
            nftContract: nftContract,
            tokenId: tokenId,
            price: price,
            sold: false
        }));

        uint256 listingId = listings.length - 1;
        emit ListingIdCreated(listingId);
        sellerListings[msg.sender].push(listingId);

        emit NFTListed(msg.sender, nftContract, tokenId, price);
    }

    function purchaseNFT(uint256 listingId) external nonReentrant {
        Listing storage listing = listings[listingId];
        require(listing.price > 0, "NFT not listed");
        require(!listing.sold, "NFT already sold");

        uint256 fee = (listing.price * feePercent) / 100;
        uint256 sellerAmount = listing.price - fee;

        require(token.transferFrom(msg.sender, address(this), fee), "Fee transfer failed");
        require(token.transferFrom(msg.sender, listing.seller, sellerAmount), "Seller payment failed");

        IERC721(listing.nftContract).transferFrom(address(this), msg.sender, listing.tokenId);

        listing.sold = true;

        emit NFTPurchased(msg.sender, listing.nftContract, listing.tokenId, listing.price);
    }

    function withdrawFees() external onlyOwner {
        uint256 balance = token.balanceOf(address(this));
        require(token.transfer(owner(), balance), "Fee withdrawal failed");
    }

    function getListing(uint256 listingId) external view returns (Listing memory) {
        return listings[listingId];
    }

    function getSellerListings(address seller) external view returns (uint256[] memory) {
        return sellerListings[seller];
    }
}
