// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

event NFTReceived(address operator, address indexed _from, address indexed _to, uint256 indexed _tokenId, bytes _data);

contract NFTMarket is IERC721Receiver, Ownable, ReentrancyGuard {
    struct Listing {
        address seller;
        address nftContract;
        uint256 tokenId;
        uint256 price;
    }

    // ERC20 token used for purchases
    IERC20 public erc20Token;
    Listing[] public listings;

    event NFTListed(
        address seller,
        address nftContract,
        uint256 tokenId,
        uint256 price
    );
    event NFTPurchased(
        address buyer,
        address nftContract,
        uint256 tokenId,
        uint256 price
    );

    constructor(address _erc20TokenAddress) Ownable(msg.sender) {
        erc20Token = IERC20(_erc20TokenAddress);
    }

    modifier isOwner(
        uint256 tokenId,
        address spender,
        address nftContract
    ) {
        address owner = IERC721(nftContract).ownerOf(tokenId);
        require(owner == spender, "You are not the owner of this NFT");
        _;
    }

    function listItem(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) public isOwner(tokenId, msg.sender, nftContract) {
        require(price > 0, "Price must be greater than 0");

        IERC721(nftContract).safeTransferFrom(
            msg.sender,
            address(this),
            tokenId
        );

        listings.push(
            Listing({
                seller: msg.sender,
                nftContract: nftContract,
                tokenId: tokenId,
                price: price
            })
        );

        emit NFTListed(msg.sender, nftContract, tokenId, price);
    }

    function buyNFT(uint256 listingId) public {
        Listing memory listing = listings[listingId];

        require(listing.price > 0, "This NFT is not for sale");

        erc20Token.transferFrom(msg.sender, listing.seller, listing.price);
        IERC721(listing.nftContract).transferFrom(
            address(this),
            msg.sender,
            listing.tokenId
        );

        delete listings[listingId];

        emit NFTPurchased(
            msg.sender,
            listing.nftContract,
            listing.tokenId,
            listing.price
        );
    }

    function getListing(
        uint256 listingId
    ) public view returns (Listing memory) {
        return listings[listingId];
    }

    function onERC721Received(
        address operator,
        address from,
        uint tokenId,
        bytes calldata data
    ) public  override returns (bytes4){
        emit NFTReceived(operator, from, address(this), tokenId, data); // 触发事件记录转移

        return IERC721Receiver.onERC721Received.selector;
    }
}

