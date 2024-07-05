// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract NFTMarketplace is ReentrancyGuard {
    // NFT info
    struct NftInfo {
        uint256 listingId;
        // Owner's address
        address owner;
        // NFT contract address
        address nftContract;
        // Token ID
        uint256 tokenId;
        // Token URI
        string uri;
        // Listing price
        uint256 price;
        // Listing timestamp
        uint256 listedAt;
        // Whether it has been listed
        bool isListed;
        // Whether it has been sold
        bool isSold;
    }

    IERC20 private _paymentToken;
    uint256 private _nextListingId;

    // All listed NFT info collection. listingId => NftInfo
    mapping(uint256 => NftInfo) private _listedNfts;

    // NFT listing event
    event NFTListedEvent(
        address indexed owner,
        address indexed nftContract,
        uint256 indexed tokenId,
        string uri,
        uint256 price,
        uint256 listingId,
        uint256 listedAt
    );
    // Bought NFT event
    event NFTBoughtEvent(
        address indexed buyer,
        address indexed nftContract,
        uint256 indexed tokenId,
        string uri,
        uint256 price,
        uint256 listingId
    );
    // Delist NFT event
    event NFTDelistedEvent(
        address indexed owner,
        address indexed nftContract,
        uint256 indexed tokenId,
        uint256 price,
        string uri,
        uint256 listingId,
        // The delisting time of the NFT
        uint256 delistingAt
    );

    constructor(IERC20 _payment) {
        _paymentToken = _payment;
    }

    // List new NFT
    function listNFT(address nftContract, uint256 tokenId, string memory uri, uint256 price)
        external
        returns (uint256)
    {
        IERC721 nft = IERC721(nftContract);
        address owner = msg.sender;

        require(price > 0, "Price must be greater than 0.");
        require(nft.ownerOf(tokenId) == owner, "You are not the owner of this NFT.");
        require(nft.isApprovedForAll(owner, address(this)), "Marketplace is not approved.");

        uint256 newListingId = _nextListingId++;
        // Save NFT information
        _listedNfts[newListingId] =
            NftInfo(newListingId, owner, nftContract, tokenId, uri, price, block.timestamp, true, false);

        // Trigger NFTListedEvent event
        emit NFTListedEvent(owner, nftContract, tokenId, uri, price, newListingId, block.timestamp);

        return newListingId;
    }

    // Relist NFT
    function listNFT(uint256 listingId, uint256 price) external returns (uint256) {
        NftInfo storage listedNft = _listedNfts[listingId];
        IERC721 nft = IERC721(listedNft.nftContract);
        address owner = msg.sender;

        require(nft.ownerOf(listedNft.tokenId) == owner, "You are not the owner of this NFT.");
        require(!listedNft.isListed, "NFT is already listed.");
        require(price > 0, "Price must be greater than 0.");
        require(nft.isApprovedForAll(owner, address(this)), "Marketplace is not approved.");

        listedNft.price = price;
        listedNft.isListed = true;
        listedNft.isSold = false;
        listedNft.listedAt = block.timestamp;

        // Trigger NFTListedEvent event
        emit NFTListedEvent(
            owner, listedNft.nftContract, listedNft.tokenId, listedNft.uri, price, listingId, block.timestamp
        );

        return listingId;
    }

    function delistNFT(uint256 listingId) external {
        NftInfo storage listedNft = _listedNfts[listingId];
        IERC721 nft = IERC721(listedNft.nftContract);
        address owner = msg.sender;

        require(nft.ownerOf(listedNft.tokenId) == owner, "You are not the owner of this NFT.");
        require(listedNft.isListed, "NFT isn't listed.");
        require(nft.isApprovedForAll(owner, address(this)), "Marketplace is not approved.");

        listedNft.isListed = false;

        emit NFTDelistedEvent(
            listedNft.owner,
            listedNft.nftContract,
            listedNft.tokenId,
            listedNft.price,
            listedNft.uri,
            listingId,
            block.timestamp
        );
    }

    function buyNFT(uint256 listingId) external nonReentrant {
        NftInfo storage listedNft = _listedNfts[listingId];
        address buyer = msg.sender;

        require(listedNft.isListed, "NFT isn't listed.");
        require(_paymentToken.balanceOf(buyer) >= listedNft.price, "Insufficient balance.");
        // The buyer transfers payment to the owner and confirms whether it was successful.
        require(_paymentToken.transferFrom(buyer, listedNft.owner, listedNft.price), "Transfer tokens failed.");

        IERC721 nft = IERC721(listedNft.nftContract);
        // Transfer NFT from owner to buyer
        nft.safeTransferFrom(listedNft.owner, buyer, listedNft.tokenId);

        listedNft.owner = buyer;
        listedNft.isListed = false;
        listedNft.isSold = true;

        // Trigger NFTBoughtEvent
        emit NFTBoughtEvent(buyer, listedNft.nftContract, listedNft.tokenId, listedNft.uri, listedNft.price, listingId);
    }

    function getAllNfts() external view returns (NftInfo[] memory) {
        NftInfo[] memory allNfts = new NftInfo[](_nextListingId);
        for (uint256 i = 0; i < _nextListingId; i++) {
            allNfts[i] = _listedNfts[i];
        }
        return allNfts;
    }

    function getListedNft(uint256 listingId) external view returns (NftInfo memory) {
        return _listedNfts[listingId];
    }
}
