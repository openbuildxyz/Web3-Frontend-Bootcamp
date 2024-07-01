// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IERC20} from "@openzeppelin/contracts/interfaces/IERC20.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract Market {
    //////////////////////////////////////////
    // Errors
    //////////////////////////////////////////
    error NotListed(address nftAddress, uint256 tokenId);
    error AlreadyListed(address nftAddress, uint256 tokenId);
    error InsufficientBalance(address account, uint256 balance, uint256 price);
    error NotOwner();
    error NotApprovedForMarket();
    error PriceMustBeAboveZero();

    //////////////////////////////////////////
    // Storage
    //////////////////////////////////////////
    struct Listing {
        uint256 price;
        address seller;
    }

    IERC20 private _paymentToken;
    // _listings[nftContractAddress][tokenId]
    mapping(address => mapping(uint256 => Listing)) private _listings;

    //////////////////////////////////////////
    // Events
    //////////////////////////////////////////
    event ItemListed(
        address indexed seller,
        address indexed nftAddress,
        uint256 indexed tokenId,
        uint256 price
    );

    event ItemCanceled(
        address indexed seller,
        address indexed nftAddress,
        uint256 indexed tokenId
    );

    event ItemBought(
        address indexed buyer,
        address indexed nftAddress,
        uint256 indexed tokenId,
        uint256 price
    );

    //////////////////////////////////////////
    // Constructor
    //////////////////////////////////////////
    constructor(address tokenAddress) {
        _paymentToken = IERC20(tokenAddress);
    }

    //////////////////////////////////////////
    // Getter Function
    //////////////////////////////////////////
    function getListing(
        address nftAddress,
        uint256 tokenId
    ) external view returns (Listing memory) {
        return _listings[nftAddress][tokenId];
    }

    //////////////////////////////////////////
    // Modifiers
    //////////////////////////////////////////
    modifier notListed(address nftAddress, uint256 tokenId) {
        Listing memory listing = _listings[nftAddress][tokenId];
        if (listing.price > 0) {
            revert AlreadyListed(nftAddress, tokenId);
        }
        _;
    }

    modifier isListed(address nftAddress, uint256 tokenId) {
        Listing memory listing = _listings[nftAddress][tokenId];
        if (listing.price <= 0) {
            revert NotListed(nftAddress, tokenId);
        }
        _;
    }

    modifier isOwner(
        address nftAddress,
        uint256 tokenId,
        address spender
    ) {
        IERC721 nft = IERC721(nftAddress);
        address owner = nft.ownerOf(tokenId);
        if (spender != owner) {
            revert NotOwner();
        }
        _;
    }

    //////////////////////////////////////////
    // Main Functions
    //////////////////////////////////////////
    /*
     * @notice Method for listing NFT
     * @param nftAddress Address of NFT contract
     * @param tokenId Token ID of NFT
     * @param price sale price for each item
     */
    function listItem(
        address nftAddress,
        uint256 tokenId,
        uint256 price
    )
        external
        notListed(nftAddress, tokenId)
        isOwner(nftAddress, tokenId, msg.sender)
    {
        if (price <= 0) {
            revert PriceMustBeAboveZero();
        }
        IERC721 nft = IERC721(nftAddress);
        if (nft.getApproved(tokenId) != address(this)) {
            revert NotApprovedForMarket();
        }
        _listings[nftAddress][tokenId] = Listing(price, msg.sender);
        emit ItemListed(msg.sender, nftAddress, tokenId, price);
    }

    /*
     * @notice Method for cancelling listing
     * @param nftAddress Address of NFT contract
     * @param tokenId Token ID of NFT
     */
    function cancelListing(
        address nftAddress,
        uint256 tokenId
    )
        external
        isOwner(nftAddress, tokenId, msg.sender)
        isListed(nftAddress, tokenId)
    {
        delete (_listings[nftAddress][tokenId]);
        emit ItemCanceled(msg.sender, nftAddress, tokenId);
    }

    /*
     * @notice Method for buying listing
     *
     * @notice The owner of an NFT could unapprove the Market,
     * which would cause this function to fail
     *
     * @notice ERC20 token has no risk of Reentrancy Attack.
     * But if Ether is used as payment, ReentrancyGuard MUST be implemented.
     *
     * @notice If do not want NFT owner to buy his own NFT,
     * _notOwnerCheck() can be added for buyItem() function.
     *
     * @param nftAddress Address of NFT contract
     * @param tokenId Token ID of NFT
     */
    function buyItem(
        address nftAddress,
        uint256 tokenId
    ) external isListed(nftAddress, tokenId) {
        Listing memory listedItem = _listings[nftAddress][tokenId];
        uint256 price = listedItem.price;
        address seller = listedItem.seller;

        // Check buyer balance to make sure he has enough money to buy
        uint256 balance = _paymentToken.balanceOf(msg.sender);
        if (balance < price) {
            revert InsufficientBalance(msg.sender, balance, price);
        }

        // Check to make sure buyer has approved this contract to transfer money (to seller)
        uint256 allowance = _paymentToken.allowance(msg.sender, address(this));
        if (allowance < price) {
            revert NotApprovedForMarket();
        }

        delete (_listings[nftAddress][tokenId]);
        IERC721(nftAddress).safeTransferFrom(seller, msg.sender, tokenId);
        _paymentToken.transferFrom(msg.sender, seller, price);
        emit ItemBought(msg.sender, nftAddress, tokenId, price);
    }

    /*
     * @notice Method for updating listing price
     * @param nftAddress Address of NFT contract
     * @param tokenId Token ID of NFT
     * @param newPrice Price in Wei of the item
     */
    function updatePrice(
        address nftAddress,
        uint256 tokenId,
        uint256 newPrice
    )
        external
        isListed(nftAddress, tokenId)
        isOwner(nftAddress, tokenId, msg.sender)
    {
        if (newPrice <= 0) {
            revert PriceMustBeAboveZero();
        }
        _listings[nftAddress][tokenId].price = newPrice;
        emit ItemListed(msg.sender, nftAddress, tokenId, newPrice);
    }
}
