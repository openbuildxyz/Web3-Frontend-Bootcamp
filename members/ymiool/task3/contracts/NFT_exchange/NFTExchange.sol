// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract NFTExchange is ReentrancyGuard {
    struct NFTItem {
        address nftContract;
        uint256 tokenId;
        address seller;
        uint256 price;
        uint256 addTime;
        bool isActive;
    }

    mapping(address => mapping(uint256 => NFTItem)) public nftItems;

    event NFTItemAdded(
        address indexed nftContract,
        uint256 indexed tokenId,
        address indexed seller,
        uint256 price,
        uint256 addTime
    );

    event NFTExchanged(
        address indexed nftContract,
        uint256 indexed tokenId,
        address indexed buyer,
        uint256 price
    );

    event NFTInactivated(
        address indexed nftContract,
        uint256 indexed tokenId,
        address indexed seller
    );

    IERC20 public paymentToken;
    
    constructor(address _paymentToken) {
        paymentToken = IERC20(_paymentToken);
    }

    function addNFT(address _nftContract, uint256 _tokenId, uint256 _price) external {
        IERC721 nft = IERC721(_nftContract);
        require(nft.ownerOf(_tokenId) == msg.sender, "You do not own the NFT");
        require(nft.isApprovedForAll(msg.sender, address(this)), "Contract not approved");
       
        uint256 addTime = block.timestamp;
        nftItems[_nftContract][_tokenId] = NFTItem(
            _nftContract, _tokenId, msg.sender, _price, addTime, true);

        emit NFTItemAdded(_nftContract, _tokenId, msg.sender, _price, addTime);
    }

    function exchangeNFT(address _nftContract, uint256 _tokenId) external {
        NFTItem storage nftItem = nftItems[_nftContract][_tokenId];
        require(nftItem.isActive, "This NFT can not be sold");

        IERC721 nft = IERC721(_nftContract);
        require(paymentToken.transferFrom(msg.sender, nftItem.seller, nftItem.price), "Payment failed");
        require(nft.isApprovedForAll(msg.sender, address(this)));

        nft.safeTransferFrom(nftItem.seller, msg.sender, _tokenId);
        nftItem.isActive = false;
    
        emit NFTExchanged(_nftContract, _tokenId, msg.sender, nftItem.price);
    }

    function inactivateNFT(address _nftContract, uint256 _tokenId) external {
        NFTItem storage nftItem = nftItems[_nftContract][_tokenId];
        require(nftItem.isActive, "This NFT is already inactivated");
        require(nftItem.seller == msg.sender, "Only seller can inactivate");

        nftItem.isActive = false;

        emit NFTInactivated(_nftContract, _tokenId, msg.sender);
    }
}