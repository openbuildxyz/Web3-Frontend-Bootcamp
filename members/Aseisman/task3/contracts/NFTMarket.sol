// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "@openzeppelin/contracts/interfaces/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTMarket {
    struct Listing {
        address seller;
        address nftAddress;
        uint256 tokenId;
        uint256 price;
    }

    mapping(uint256 => Listing) public listings;
    IERC20 public paymentToken;
    uint256 public listingCounter;

    event NFTListed(
        address indexed nftAddress,
        uint256 indexed tokenId,
        address seller,
        uint256 price,
        uint256 listingId
    );

    event NFTBought(
        address indexed nftAddress,
        uint256 indexed tokenId,
        address buyer,
        uint256 price,
        uint256 listingId
    );

    constructor(address _paymentToken) {
        paymentToken = IERC20(_paymentToken);
    }

    function listNFT(
        address _nftAddress,
        uint256 _tokenId,
        uint256 _price
    ) external {
        require(_price > 0, "Price must be greater than 0");
        
        IERC721 nft = IERC721(_nftAddress);
        require(nft.ownerOf(_tokenId) == msg.sender, "Not the owner");
        require(nft.isApprovedForAll(msg.sender, address(this)), "No approval");
        
        IERC721(_nftAddress).transferFrom(msg.sender, address(this), _tokenId);// approval transfer

        listings[listingCounter] = Listing({
            seller: msg.sender,
            price: _price,
            tokenId: _tokenId,
            nftAddress: _nftAddress
        });
        emit NFTListed(_nftAddress, _tokenId, msg.sender, _price, listingCounter);
        listingCounter++;
    }

    function bugNFT(
        uint256 listingId
    ) public {
        Listing memory item = listings[listingId];
        require(item.seller != address(0), "Not listed");
        require(item.price > 0, "NFT not listed");
        require(paymentToken.transferFrom(msg.sender, item.seller, item.price), "Payment failed");

        IERC721(item.nftAddress).safeTransferFrom(
            item.seller,
            msg.sender,
            item.tokenId
        );
        emit NFTBought(item.nftAddress, item.tokenId, msg.sender, item.price,listingId);
        delete listings[listingId];
    }

    function getAllList() public view returns (Listing[] memory) {
        Listing[] memory result = new Listing[](listingCounter);
        for (uint256 i = 0; i < listingCounter; i++) {
            result[i] = listings[i];
        }
        return result;
    }
}