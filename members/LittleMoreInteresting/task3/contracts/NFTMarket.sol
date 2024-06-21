// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";


contract  NFTMarket is ReentrancyGuard {
    address public immutable _owner;
    address public immutable _token; 
    struct Listing {
        uint price;
        address seller;
    }
    event NftListed(
        address indexed seller,
        address indexed nftAddress,
        uint indexed tokenId,
        uint price,
        uint old_price
    );
    event BuyNFT(
        address indexed buyer,
        address indexed nftAddress,
        uint indexed tokenId,
        uint price
    );
    event CancelListing(
        address indexed seller,
        address indexed nftAddress,
        uint indexed tokenId
    );

    mapping(address => mapping(uint => Listing)) nft_listing;
    //mapping(address => uint) nft_proceeds;

    error ErrorNFTHasListed(address nftAddress, uint tokenId);
    error ErrorNFTHasNotListed(address nftAddress, uint tokenId);
    error ErrorNFTInvalidOwner(address owner);
    error ErrorNFTInvalidPrice();
    error ErrorNFTNotApproved(address nftAddress, uint tokenId);
    error ErrorNoProceed();

    modifier notListed(address nftAddress, uint tokenId) {
        Listing memory listing = nft_listing[nftAddress][tokenId];
        if(listing.price > 0){
            revert ErrorNFTHasListed(nftAddress,tokenId);
        }
        _;
    }

    modifier isNFTListed(address nftAddress, uint tokenId) {
        Listing memory listing = nft_listing[nftAddress][tokenId];
        if(listing.price <= 0){
            revert ErrorNFTHasNotListed(nftAddress,tokenId);
        }
        _;
    }

    modifier isNFTOwner(
        address nftAddress,
        uint tokenId,
        address spender
    ) {
        IERC721 nft = IERC721(nftAddress);
        if(nft.ownerOf(tokenId) != spender){
            revert ErrorNFTInvalidOwner(spender);
        }
        _;
    }

    modifier isPositivePrice(uint price) {
        if (price <=0 ) {
            revert ErrorNFTInvalidPrice() ;
        }
        _;
    }

    constructor(address token){
        _token = token; 
        _owner = msg.sender;   
    }

    // list NFT
    function list(
        address nftAddress,
        uint price,
        uint tokenId
    ) external 
    notListed(nftAddress,tokenId)
    isNFTOwner(nftAddress,tokenId,msg.sender)
    isPositivePrice(price)
    {
        // check approved
        if (IERC721(nftAddress).getApproved(tokenId) != address(this)) {
            revert ErrorNFTNotApproved(nftAddress,tokenId);
        }
        // list
        nft_listing[nftAddress][tokenId] = Listing(price,msg.sender);
        emit NftListed(msg.sender,nftAddress,tokenId,price,0);
    } 

    // buy 
    function buy(
        address nftAddress,
        uint tokenId
    ) external payable isNFTListed(nftAddress, tokenId) nonReentrant {
        Listing memory listing = nft_listing[nftAddress][tokenId];
        if(listing.price != msg.value){
            revert ErrorNFTInvalidPrice();
        }
        // transfer to seller
        require(IERC20(_token).transferFrom(msg.sender, listing.seller,listing.price), "Transfer from error");
        // nft_proceeds[listing.seller] += msg.value;
        delete nft_listing[nftAddress][tokenId];
        IERC721(nftAddress).safeTransferFrom(
            listing.seller,
            msg.sender,
            tokenId
        );
        emit BuyNFT(msg.sender, nftAddress, tokenId, listing.price);
    }

    function permitBuy (
        address nftAddress,
        uint tokenId,
        uint256 amount,
        uint256 deadline,
        bytes memory signature) external payable {
        (uint8 v, bytes32 r, bytes32 s) = recoverSignature(signature);
         Listing memory listing = nft_listing[nftAddress][tokenId];
        if(listing.price != amount){
            revert ErrorNFTInvalidPrice();
        }
        // approve
        IERC20Permit(_token).permit(msg.sender, address(this), amount, deadline, v, r, s);
        // transfer to seller
        require(IERC20(_token).transferFrom(msg.sender, listing.seller, amount), "Transfer from error");
        // buy
        delete nft_listing[nftAddress][tokenId];
        IERC721(nftAddress).safeTransferFrom(
            listing.seller,
            msg.sender,
            tokenId
        );
        emit BuyNFT(msg.sender, nftAddress, tokenId, listing.price);
    }

    function recoverSignature(bytes memory _signature) internal pure returns(uint8 v,bytes32 r,bytes32 s){
        require(_signature.length == 65, "invalid signature length");
         assembly {
            r := mload(add(_signature, 0x20))
            s := mload(add(_signature, 0x40))
            v := byte(0, mload(add(_signature, 0x60)))
        }
    }

    // cancel list
    function cancel(address nftAddress,uint256 tokenId) 
    external
    isNFTOwner(nftAddress,tokenId, msg.sender)
    isNFTListed(nftAddress,tokenId)
    {
        delete nft_listing[nftAddress][tokenId];
        emit CancelListing(msg.sender, nftAddress, tokenId);
    }

    function update(
        address nftAddress,
        uint tokenId,
        uint newPrice
    )
        external
        isNFTOwner(nftAddress, tokenId, msg.sender)
        isNFTListed(nftAddress, tokenId)
        isPositivePrice(newPrice)
    {
        uint old_price = nft_listing[nftAddress][tokenId].price;
        nft_listing[nftAddress][tokenId].price = newPrice;
        emit NftListed(msg.sender, nftAddress, tokenId, newPrice,old_price);
    }

    function getListing(
        address nftAddress,
        uint tokenId
    ) external view returns (Listing memory) {
        return nft_listing[nftAddress][tokenId];
    }

}