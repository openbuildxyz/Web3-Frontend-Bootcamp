// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @custom:security-contact sheldon@nmn.im
contract Marketplace is ERC721Holder, Ownable {
    struct Sale {
        address seller;
        address nftContract;
        uint256 tokenId;
        address paymentToken;
        uint256 price;
        uint256 timestamp;
        bool isSold;
        address buyer;
        uint256 soldTimestamp;
        string tokenURI;
    }

    Sale[] public sales;
    mapping(address => mapping(uint256 => uint256)) public nftToSaleIndex;

    constructor(address initialOwner) Ownable(initialOwner) {}

    event NftListed(address indexed nftContract, uint256 indexed tokenId, uint256 price, address indexed seller, address paymentToken);
    event NftSold(address indexed nftContract, uint256 indexed tokenId, uint256 price, address indexed buyer, address paymentToken);
    event NftRemoved(address indexed nftContract, uint256 indexed tokenId, address indexed seller);

    function listNFT(address nftContract, uint256 tokenId, address paymentToken, uint256 price) external {
        IERC721 nft = IERC721(nftContract);
        require(nft.ownerOf(tokenId) == msg.sender, "Marketplace: Caller is not the owner");
        require(price > 0, "Marketplace: Price must be greater than zero");
        string memory tokenURI = IERC721Metadata(nftContract).tokenURI(tokenId);
        nft.safeTransferFrom(msg.sender, address(this), tokenId);
        sales.push(Sale({
            seller: msg.sender,
            nftContract: nftContract,
            tokenId: tokenId,
            paymentToken: paymentToken,
            price: price,
            timestamp: block.timestamp,
            isSold: false,
            buyer: address(0),
            soldTimestamp: 0,
            tokenURI: tokenURI
        }));
        nftToSaleIndex[nftContract][tokenId] = sales.length - 1;

        emit NftListed(nftContract, tokenId, price, msg.sender, paymentToken);
    }

    function buyNFT(address nftContract, uint256 tokenId) external {
        uint256 saleIndex = nftToSaleIndex[nftContract][tokenId];
        Sale storage sale = sales[saleIndex];
        require(!sale.isSold, "Marketplace: Token already sold");

        IERC20 paymentToken = IERC20(sale.paymentToken);
        require(paymentToken.transferFrom(msg.sender, sale.seller, sale.price), "Marketplace: Payment failed");

        sale.isSold = true;
        sale.buyer = msg.sender;
        sale.soldTimestamp = block.timestamp;

        IERC721(nftContract).safeTransferFrom(address(this), msg.sender, tokenId);

        emit NftSold(nftContract, tokenId, sale.price, msg.sender, sale.paymentToken);
    }

    function getSaleInfo(address nftContract, uint256 tokenId) external view returns (Sale memory) {
        uint256 saleIndex = nftToSaleIndex[nftContract][tokenId];
        return sales[saleIndex];
    }

    function getListedNFTs() external view returns (Sale[] memory) {
        uint256 listedCount = 0;
        for (uint256 i = 0; i < sales.length; i++) {
            if (!sales[i].isSold) {
                listedCount++;
            }
        }

        Sale[] memory listedSales = new Sale[](listedCount);
        uint256 j = 0;
        for (uint256 i = 0; i < sales.length; i++) {
            if (!sales[i].isSold) {
                listedSales[j] = sales[i];
                j++;
            }
        }

        return listedSales;
    }

    function removeFromSale(address nftContract, uint256 tokenId) external {
        uint256 saleIndex = nftToSaleIndex[nftContract][tokenId];
        Sale storage sale = sales[saleIndex];
        require(sale.seller == msg.sender, "Marketplace: Only seller can remove from sale");
        require(!sale.isSold, "Marketplace: Token already sold");

        IERC721(nftContract).safeTransferFrom(address(this), msg.sender, tokenId);
        
        sale.isSold = true;

        emit NftRemoved(nftContract, tokenId, msg.sender);
    }
}


