// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol"; //访问控制
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";


contract NFTMarket is Ownable {
    struct Listing {
        uint256 tokenId;
        address seller; //seller的地址
        uint256 price; // 出手的价格
        string tokenURI;
    }

    // 添加事件
    event NFTListed(
        uint256 indexed tokenId,
        address indexed seller,
        uint256 price
    );
    event NFTBought(
        uint256 indexed tokenId,
        address indexed buyer,
        uint256 price
    );

    IERC20 public paymentToken;
    IERC721 public nft721Token;

    constructor(address _paymentToken, address _nft721Contract) Ownable(msg.sender) {
        paymentToken = IERC20(_paymentToken);
        nft721Token = IERC721(_nft721Contract);
    }

    // 对 listing进行赋值 ,但是不支持遍历 address 是用户的地址
    mapping(uint256 => Listing) public listings;

    uint256[] public listedTokenIds;

    // 上架NFT
    function listNFT(
        uint256 tokenId,
        uint256 price
    ) external {
        //检验price是否大于0
        require(price > 0, "price must gt than zero");
        // 访问控制
        require(
            msg.sender == nft721Token.ownerOf(tokenId),
            "You must own the NFT"
        );
         // 授权
        require(nft721Token.getApproved(tokenId) == address(this) || nft721Token.isApprovedForAll(msg.sender, address(this)), "Contract not approved");



        // 上架NFT，从用户转到合约
        nft721Token.transferFrom(msg.sender, address(this), tokenId);
        
        // 存一个全部的数据
        listings[tokenId] = Listing({
            tokenId: tokenId,
            seller: msg.sender,
            price: price,
            tokenURI: ERC721URIStorage(address(nft721Token)).tokenURI(tokenId) // 获取tokenURI view方法不消耗gas
        });

        // 存储上架的id
        listedTokenIds.push(tokenId);
        emit NFTListed(tokenId, msg.sender, price); // 触发上架事件
    }

    // 购买NFT
    function buyNFT(
        uint256 tokenId
    ) external payable {
       Listing memory listing = listings[tokenId];
        require(listing.price > 0, "NFT is not listed");

        uint256 price = listing.price;
        address seller = listing.seller;

        // Ensure the listing is valid before removing it
        require(price > 0, "Invalid listing price");
        require(seller != address(0), "Invalid seller address");

        // Perform the payment transfer before removing the listing
        require(paymentToken.transferFrom(msg.sender, seller, price), "Payment failed");

        // Remove listing after successful payment
        _removeListing(tokenId);

        // Transfer NFT to buyer
        nft721Token.transferFrom(address(this), msg.sender, tokenId);

        emit NFTBought(tokenId, msg.sender, price);
    }

    // 取消上架
    function cancelListing(uint256 tokenId) external {
        Listing memory listing = listings[tokenId];
        // 只有卖家可以取消
        require(listing.seller == msg.sender, "You are not the seller");

        _removeListing(tokenId);
        // 将 NFT 返还给卖家
        nft721Token.transferFrom(address(this), listing.seller, tokenId);
    }

    // 获取所有上架的 NFT
    function getAllListings() external view returns (Listing[] memory) {
        Listing[] memory allListings = new Listing[](listedTokenIds.length);

        for (uint256 i = 0; i < listedTokenIds.length; i++) {
            uint256 tokenId = listedTokenIds[i];
            allListings[i] = listings[tokenId];
        }
        return allListings;
    } 

    function _removeListing(uint256 tokenId) internal {
        delete listings[tokenId];

        // 移除已售出的 NFT的 tokenId
        for (uint256 i = 0; i < listedTokenIds.length; i++) {
            if (listedTokenIds[i] == tokenId) {
                listedTokenIds[i] = listedTokenIds[listedTokenIds.length - 1];
                listedTokenIds.pop();
                break;
            }
        }
    }
}
