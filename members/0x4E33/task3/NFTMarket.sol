// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {
    function transferFrom(
        address from,
        address to,
        uint256 value
    ) external returns (bool);
}

interface IERC721 {
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external;
    function ownerOf(uint256 tokenId) external view returns (address);
    function getApproved(uint256 tokenId) external view returns (address);
    function isApprovedForAll(
        address owner,
        address operator
    ) external view returns (bool);
}

contract NFTMarket {
    struct Listing {
        address seller;
        address nftContract;
        uint256 tokenId;
        uint256 price;
    }

    mapping(uint256 => Listing) public listings;
    uint256 public listingCounter;
    IERC20 public paymentToken;

    event NFTListed(
        uint256 listingId,
        address seller,
        address nftContract,
        uint256 tokenId,
        uint256 price
    );

    event NFTPurchased(
        uint256 listingId,
        address buyer,
        address nftContract,
        uint256 tokenId,
        uint256 price
    );

    constructor(address _paymentToken) {
        paymentToken = IERC20(_paymentToken);
    }

    function listNFT(
        address _nftContract,
        uint256 _tokenId,
        uint256 _price
    ) public {
        IERC721 nft = IERC721(_nftContract);
        require(
            nft.ownerOf(_tokenId) == msg.sender,
            "You are not the owner of this NFT"
        );
        require(
            nft.getApproved(_tokenId) == address(this) ||
                nft.isApprovedForAll(msg.sender, address(this)),
            "Contract is not approved"
        );

        listingCounter++;
        listings[listingCounter] = Listing({
            seller: msg.sender,
            nftContract: _nftContract,
            tokenId: _tokenId,
            price: _price
        });

        emit NFTListed(
            listingCounter,
            msg.sender,
            _nftContract,
            _tokenId,
            _price
        );
    }

    function buyNFT(uint256 _listingId) public {
        Listing memory listing = listings[_listingId];

        require(listing.price > 0, "NFT not for sale");

        require(
            paymentToken.transferFrom(
                msg.sender,
                listing.seller,
                listing.price
            ),
            "Token transfer failed"
        );
        IERC721(listing.nftContract).safeTransferFrom(
            listing.seller,
            msg.sender,
            listing.tokenId
        );

        emit NFTPurchased(
            _listingId,
            msg.sender,
            listing.nftContract,
            listing.tokenId,
            listing.price
        );

        delete listings[_listingId];
    }
}
