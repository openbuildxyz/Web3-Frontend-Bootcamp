// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

event NFTReceived(
    address operator,
    address indexed _from,
    address indexed _to,
    uint256 indexed _tokenId,
    bytes _data
);

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

contract NFTMarket is IERC721Receiver, Ownable, ReentrancyGuard {
    struct Listing {
        address seller;
        uint256 price;
        bool isSold;
        bool isListed;
    }

    struct NFTItem {
        address nftContract;
        uint256 tokenId;
    }

    struct NFTInfo {
        address nftContract;
        uint256 tokenId;
        address seller;
        uint256 price;
        bool isSold;
        bool isListed;
    }

    // ERC20 token used for purchases
    IERC20 public erc20Token;
    NFTItem[] private _allNFTs;
    mapping (address => mapping(uint => bool)) private _nftExists;
    mapping (address => mapping(uint => Listing)) public marketListings;

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

    function includes(address[] memory array, address element) private pure returns (bool) {
        for(uint i = 0; i < array.length; i++) {
            if(array[i] == element) {
                return true;
            }
        }

        return false;
    }

    function listItem(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) public isOwner(tokenId, msg.sender, nftContract) {
        require(price > 0, "Price must be greater than 0");

        Listing memory listing = marketListings[nftContract][tokenId];
        bool isListed = listing.isListed;
        if(isListed) {
            revert("This NFT is already listed");
        }

        bool isNFTExit = _nftExists[nftContract][tokenId];
        if(isNFTExit) {
            marketListings[nftContract][tokenId].seller = msg.sender;
            marketListings[nftContract][tokenId].isListed = true;
            marketListings[nftContract][tokenId].price = price;
        } else {
            _nftExists[nftContract][tokenId] = true;
            _allNFTs.push(NFTItem({
                nftContract: nftContract,
                tokenId: tokenId
            }));

            IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

            marketListings[nftContract][tokenId] = Listing({
                seller: msg.sender,
                price: price,
                isSold: false,
                isListed: true
            });
        }

        emit NFTListed(msg.sender, nftContract, tokenId, price);
    }

    function unlistItem(address nftContract, uint256 tokenId) public {
        Listing memory listing = marketListings[nftContract][tokenId];

        require(
            listing.seller == msg.sender,
            "You are not the seller of this NFT"
        );

        marketListings[nftContract][tokenId].isListed = false;
    }

    function buyNFT(address nftContract, uint256 tokenId) public {
        Listing memory listing = marketListings[nftContract][tokenId];

        require(listing.price > 0, "This NFT is not for sale");

        erc20Token.transferFrom(msg.sender, listing.seller, listing.price);
        IERC721(nftContract).transferFrom(
            address(this),
            msg.sender,
            tokenId
        );

        marketListings[nftContract][tokenId].isSold = true;
        marketListings[nftContract][tokenId].isListed = false;

        emit NFTPurchased(
            msg.sender,
            nftContract,
            tokenId,
            listing.price
        );
    }

    function getAll() public view returns (NFTInfo[] memory) {
        NFTInfo[] memory allItem = new NFTInfo[](_allNFTs.length);
        NFTItem memory nftItem;

        for(uint i = 0; i < _allNFTs.length; i++) {
            nftItem = _allNFTs[i];
            Listing memory listing = marketListings[nftItem.nftContract][nftItem.tokenId];

            allItem[i] = NFTInfo({
                nftContract: nftItem.nftContract,
                tokenId: nftItem.tokenId,
                seller: listing.seller,
                price: listing.price,
                isSold: listing.isSold,
                isListed: listing.isListed
            });
        }

        return allItem;
    }

    function onERC721Received(
        address operator,
        address from,
        uint tokenId,
        bytes calldata data
    ) public override returns (bytes4) {
        emit NFTReceived(operator, from, address(this), tokenId, data); // 触发事件记录转移

        return IERC721Receiver.onERC721Received.selector;
    }
}
