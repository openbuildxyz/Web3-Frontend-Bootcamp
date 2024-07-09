// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFTMarket {
    struct NFTItem {
        address nftContract;
        address seller;
        uint256 tokenId;
        uint256 price;
    }

    event NFTListed(
        address seller,
        address nftContract,
        uint256 tokenId,
        uint256 price
    );
    event NFTBought(
        address buyer,
        address seller,
        address nftContract,
        uint256 tokenId,
        uint256 price
    );

    mapping(address => mapping(uint256 => NFTItem)) public gallery;

    IERC20 public payToken;

    constructor(address _payToken) {
        payToken = IERC20(_payToken);
    }

    function listNFT(
        address _nftContract,
        uint256 _tokenId,
        uint256 _price
    ) external {
        IERC721 nft = IERC721(_nftContract);
        require(
            nft.ownerOf(_tokenId) == msg.sender,
            "You are not owner of this nft."
        );
        require(
            nft.isApprovedForAll(msg.sender, address(this)),
            "Please approved first."
        );

        gallery[_nftContract][_tokenId] = NFTItem(
            _nftContract,
            msg.sender,
            _tokenId,
            _price
        );

        emit NFTListed(msg.sender, _nftContract, _tokenId, _price);
    }

    function buyNFT(address _nftContract, uint256 _tokenId) external {
        NFTItem memory nft = gallery[_nftContract][_tokenId];
        require(
            payToken.allowance(msg.sender, address(this)) >= nft.price,
            "insufficient allowance"
        );

        // transfer token from buyer to seller
        payToken.transferFrom(msg.sender, nft.seller, nft.price);
        // transfer nft from seller to buyer
        IERC721(_nftContract).transferFrom(nft.seller, msg.sender, _tokenId);
        // delete nft from gallery
        delete gallery[_nftContract][_tokenId];

        emit NFTBought(
            msg.sender,
            nft.seller,
            _nftContract,
            _tokenId,
            nft.price
        );
    }
}
