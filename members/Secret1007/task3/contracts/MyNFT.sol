// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MyNFT is ERC721URIStorage, Ownable {
    uint256 private _currentTokenId = 0; // tokenId will start from 1
    IERC20 public token; // Your ERC-20 token
    uint256 public nftPrice; // Price in your token

    constructor(address tokenAddress, uint256 initialPrice)
        ERC721("SecretNFT", "SNFT")
        Ownable(msg.sender)
    {
        token = IERC20(tokenAddress);
        nftPrice = initialPrice;
    }

    function mintNFT(string memory tokenURI) public returns (uint256) {
        require(
            token.balanceOf(msg.sender) >= nftPrice,
            "Insufficient token balance"
        );
        require(
            token.transferFrom(msg.sender, address(this), nftPrice),
            "Token transfer failed"
        );
        _currentTokenId++;
        uint256 newItemId = _currentTokenId;
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        return newItemId;
    }

    function sendNFT(address recipient, uint256 tokenId) public {
        require(ownerOf(tokenId) == msg.sender, "You do not own this NFT");
        _transfer(msg.sender, recipient, tokenId);
    }

    function setPrice(uint256 newPrice) public onlyOwner {
        nftPrice = newPrice;
    }

    function withdraw() public onlyOwner {
        uint256 balance = token.balanceOf(address(this));
        require(balance > 0, "No tokens to withdraw");
        token.transfer(owner(), balance);
    }

    function getCurrentTokenId() public view returns (uint256) {
        return _currentTokenId;
    }
}
