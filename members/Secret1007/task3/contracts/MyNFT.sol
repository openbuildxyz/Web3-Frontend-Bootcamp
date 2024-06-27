// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MyNFT is ERC721URIStorage, Ownable {
    uint256 private _currentTokenId = 0; // tokenId will start from 1
    IERC20 public token; // Your ERC-20 token
    uint256 public nftPrice; // Price in your token
    address public recipientAddress; // The recipient of the token payments

    constructor(
        address tokenAddress,
        uint256 initialPrice,
        address recipient
    ) ERC721("SecretNFT", "SNFT") {
        token = IERC20(tokenAddress);
        nftPrice = initialPrice;
        recipientAddress = recipient;
    }

    function mintNFT(
        address recipient,
        string memory tokenURI
    ) public returns (uint256) {
        require(
            token.balanceOf(msg.sender) >= nftPrice,
            "Insufficient token balance"
        );
        require(
            token.transferFrom(msg.sender, recipientAddress, nftPrice),
            "Token transfer failed"
        );

        _currentTokenId++;
        uint256 newItemId = _currentTokenId;
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }

    function setPrice(uint256 newPrice) public onlyOwner {
        nftPrice = newPrice;
    }

    function setRecipientAddress(address newRecipient) public onlyOwner {
        recipientAddress = newRecipient;
    }

    function getCurrentTokenId() public view returns (uint256) {
        return _currentTokenId;
    }
}
