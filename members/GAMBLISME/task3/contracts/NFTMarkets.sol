// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract NFTMarkets is ReentrancyGuard {

    /**
    * @dev 事件：当NFT被列出出售时触发
    */
    event NftListed(
        address indexed seller,
        address indexed nftContract,
        uint256 indexed tokenId,
        uint256 price
    );

    /**
    * @dev 事件：当NFT被购买时触发
    */
    event NftPurchased(
        address indexed buyer,
        address indexed nftContract,
        uint256 indexed tokenId,
        uint256 price
    );

    /**
    * @dev 结构体：在售NFT结构体
    */
    struct NFTListing {
        address seller;
        address nftContract;
        uint256 tokenId;
        uint256 price;
        bool isActive;
    }

    //状态变量
    IERC20 public paymentToken;
    //mapping 默认情况下会为每个可能的键返回其默认值。即使在 mapping 中没有显式存储的键，访问该键时，Solidity 会返回该键的默认值。
    mapping(address => mapping(uint256 => NFTListing)) public listings;


    constructor(address _paymentToken) {
        paymentToken = IERC20(_paymentToken);
    }

    function listNFT(address _nftContract, uint256 _tokenId, uint256 _price) external {
        IERC721 nft = IERC721(_nftContract);
        require(nft.ownerOf(_tokenId) == msg.sender, "You are not the owner of this NFT");
        require(nft.getApproved(_tokenId) == address(this), " NFT is not approved for Market contract");

        listings[_nftContract][_tokenId] = NFTListing({
            seller: msg.sender,
            nftContract: _nftContract,
            tokenId: _tokenId,
            price: _price,
            isActive: true
        });

        emit NftListed(msg.sender, _nftContract, _tokenId, _price);
    }

    function purchaseNFT(address _nftContract, uint256 _tokenId) external nonReentrant {
        NFTListing memory listing = listings[_nftContract][_tokenId];
        require(listing.isActive, "NFT is not active for sale");
        require(msg.sender != listing.seller, "Seller cannot purchase own NFT");

        //支付erc20给卖者
        paymentToken.transferFrom(msg.sender, listing.seller, listing.price);

        IERC721 nft = IERC721(listing.nftContract);

        //将nft转给买家
        nft.safeTransferFrom(listing.seller, msg.sender, listing.tokenId);

        listing.isActive = false;

        emit NftPurchased(msg.sender, _nftContract, _tokenId, listing.price);
    }

}
