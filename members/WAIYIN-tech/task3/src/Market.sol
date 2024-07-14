// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

contract Market is IERC721Receiver {
    event Launch(address indexed seller, address indexed nftAddr, uint256 indexed tokenId, uint256 price);
    event Delaunch(address indexed seller, address indexed nftAddr, uint256 indexed tokenId);
    event Buy(address indexed nftAddr, uint256 indexed tokenId, address indexed buyer, uint256 price);

    struct NFTInfo {
        address seller;
        uint256 price;
    }

    mapping(address => mapping(uint256 => NFTInfo)) public s_shelve;

    IERC20 private s_token;

    constructor(address tokenAddr) {
        s_token = IERC20(tokenAddr);
    }

    function launch(address nftAddress, uint256 tokenId, uint256 price) external {
        IERC721 nft = IERC721(nftAddress);
        require(nft.getApproved(tokenId) == address(this), "Need Approved.");
        require(price > 0);
        // 上架
        NFTInfo storage newNFT = s_shelve[nftAddress][tokenId];
        newNFT.seller = msg.sender;
        newNFT.price = price;
        nft.safeTransferFrom(msg.sender, address(this), tokenId);

        // emit
        emit Launch(msg.sender, nftAddress, tokenId, price);
    }

    function delaunch(address nftAddress, uint256 tokenId) external {
        IERC721 nft = IERC721(nftAddress);
        NFTInfo memory nftInfo = s_shelve[nftAddress][tokenId];
        require(nftInfo.seller == msg.sender);
        require(nft.ownerOf(tokenId) == address(this));

        nft.safeTransferFrom(address(this), msg.sender, tokenId);
        delete s_shelve[nftAddress][tokenId];

        // emit
        emit Delaunch(msg.sender, nftAddress, tokenId);
    }

    function buy(address nftAddress, uint256 tokenId) external {
        IERC721 nft = IERC721(nftAddress);
        NFTInfo memory nftInfo = s_shelve[nftAddress][tokenId];
        require(nft.ownerOf(tokenId) == address(this), "Invalid address or tokenId.");
        require(nftInfo.seller != address(0), "Invalid address or tokenId.");
        require(s_token.allowance(msg.sender, address(this)) >= nftInfo.price, "Insufficient token.");

        // transfer
        nft.safeTransferFrom(address(this), msg.sender, tokenId);
        s_token.transferFrom(msg.sender, nftInfo.seller, nftInfo.price);
        delete s_shelve[nftAddress][tokenId];

        // emit
        emit Buy(nftAddress, tokenId, msg.sender, nftInfo.price);
    }

    function onERC721Received(address operator, address from, uint256 tokenId, bytes calldata data)
        external
        returns (bytes4)
    {
        return IERC721Receiver.onERC721Received.selector;
    }
}
