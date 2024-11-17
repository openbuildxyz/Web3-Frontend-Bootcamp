// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol"; // 防止双花攻击
import "hardhat/console.sol";

error NftMarket__NotOwnerOf(string message);
error NftMarket__NotApproved(string message);
error NftMarket__NotActive(string message);
error NftMarket__PaymentFailed(string message);
error NftMarket__NotExist(string message);
error NftMarket__IsListed(string message);

contract NftMarket is ReentrancyGuard {
    struct Listing {
        address seller;
        address nftContract;
        uint256 tokenId;
        uint256 price;
        uint256 listTime;
        string cid;
        bool isActive;
    }

    mapping(address => mapping(uint256 => Listing)) public s_listings;
    uint256[] private s_tokenIds;
    // Listing[] private s_listArr;
    IERC20 public immutable i_paymentToken;

    // 上架 nft 事件
    event NftListed(
        address indexed seller,
        uint256 indexed tokenId,
        address indexed nftContract,
        uint256 price
    );

    // nft购买事件
    event NftPurchased(
        address indexed buyer,
        uint256 indexed tokenId,
        address indexed nftContract,
        uint256 price
    );

    event NftUnlisted(
        address indexed seller,
        uint256 indexed tokenId,
        address indexed nftContract
    );

    constructor(address _paymentToken) {
        i_paymentToken = IERC20(_paymentToken);
    }

    function listNft(
        address _nftContract,
        uint256 tokenId,
        uint256 price,
        string memory cid
    ) external {
        IERC721 nft = IERC721(_nftContract);
        if (nft.ownerOf(tokenId) != msg.sender) {
            revert NftMarket__NotOwnerOf("not the owner of the NFT");
        }
        if (!nft.isApprovedForAll(msg.sender, address(this))) {
            revert NftMarket__NotApproved("not approved");
        }
        if (s_listings[_nftContract][tokenId].isActive) {
            revert NftMarket__IsListed("NFT already listed");
        }
        uint256 listTime = block.timestamp;
        Listing memory item = Listing(
            msg.sender,
            _nftContract,
            tokenId,
            price,
            listTime,
            cid,
            true
        );
        s_listings[_nftContract][tokenId] = item;
        s_tokenIds.push(tokenId);
        // s_listArr.push(item);

        emit NftListed(msg.sender, tokenId, _nftContract, price);
    }

    function unlistNft(address _nftContract, uint256 _tokenId) external {
        Listing memory item = s_listings[_nftContract][_tokenId];
        if (!item.isActive) {
            revert NftMarket__NotActive("not active");
        }
        IERC721 nft = IERC721(_nftContract);
        if (nft.ownerOf(_tokenId) != msg.sender) {
            revert NftMarket__NotOwnerOf("not the owner of the NFT");
        }
        if (!nft.isApprovedForAll(msg.sender, address(this))) {
            revert NftMarket__NotApproved("not approved");
        }
        s_listings[_nftContract][_tokenId].isActive = false;
        emit NftUnlisted(msg.sender, _tokenId, _nftContract);
    }

    function buyNft(
        address _nftContract,
        uint256 _tokenId
    ) external nonReentrant {
        Listing memory listing = s_listings[_nftContract][_tokenId];
        if (!listing.isActive) {
            revert NftMarket__NotActive("NFT not active");
        }
        IERC721 nft = IERC721(_nftContract);
        // 将购买人身上的钱转给售卖人
        if (
            !i_paymentToken.transferFrom(
                msg.sender,
                listing.seller,
                listing.price
            )
        ) {
            revert NftMarket__PaymentFailed("payment failed");
        }
        nft.safeTransferFrom(listing.seller, msg.sender, _tokenId);
        listing.isActive = false;
        emit NftPurchased(msg.sender, _tokenId, _nftContract, listing.price);
    }

    /**
     *
     * @dev 从 s_listings 中获取上架的 NFT
     */
    function getListsArray(
        address _nftContract
    ) public view returns (Listing[] memory) {
        Listing[] memory listings = new Listing[](s_tokenIds.length);
        for (uint256 i = 0; i < s_tokenIds.length; i++) {
            Listing memory item = s_listings[_nftContract][s_tokenIds[i]];
            listings[i] = item;
        }
        return listings;
    }
}
