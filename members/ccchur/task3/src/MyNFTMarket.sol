// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract NFTMarket is ReentrancyGuard {
    struct Listing {
        address seller;
        address nftContract;
        uint256 tokenId;
        uint256 price;
    }

    mapping(address => mapping(uint256 => Listing)) public listings;
    IERC20 public erc20Token;

    event NFTListed(address indexed seller, address indexed nftContract, uint256 indexed tokenId, uint256 price);
    event NFTPurchased(address indexed buyer, address indexed seller, address indexed nftContract, uint256 tokenId, uint256 price);

    constructor(address _erc20Token) {
        erc20Token = IERC20(_erc20Token);
    }

    function listNFT(address _nftContract, uint256 _tokenId, uint256 _price) external {
        IERC721 nft = IERC721(_nftContract);
        require(nft.ownerOf(_tokenId) == msg.sender, "Not the owner");
        require(nft.getApproved(_tokenId) == address(this), "NFT not approved");

        listings[_nftContract][_tokenId] = Listing(msg.sender, _nftContract, _tokenId, _price);
        
        emit NFTListed(msg.sender, _nftContract, _tokenId, _price);
    }

   function buyNFT(address _nftContract, uint256 _tokenId) external nonReentrant {
    Listing memory listing = listings[_nftContract][_tokenId];
    require(listing.seller != address(0), "NFT not listed");

    // 检查买家余额
    require(erc20Token.balanceOf(msg.sender) >= listing.price, "Insufficient balance");

    // 检查授权额度
    require(erc20Token.allowance(msg.sender, address(this)) >= listing.price, "Insufficient allowance");

    // 检查 NFT 所有权
    require(IERC721(_nftContract).ownerOf(_tokenId) == listing.seller, "Seller no longer owns NFT");

    // 检查 NFT 批准状态
    require(IERC721(_nftContract).getApproved(_tokenId) == address(this), "NFT not approved for marketplace");

    // 尝试转移 ERC20 代币
    bool transferSuccess = erc20Token.transferFrom(msg.sender, listing.seller, listing.price);
    require(transferSuccess, "ERC20 transfer failed");

    // 尝试转移 NFT
    try IERC721(_nftContract).safeTransferFrom(listing.seller, msg.sender, _tokenId) {
        // NFT 转移成功
    } catch {
        revert("NFT transfer failed");
    }

    emit NFTPurchased(msg.sender, listing.seller, _nftContract, _tokenId, listing.price);

    delete listings[_nftContract][_tokenId];
}
}