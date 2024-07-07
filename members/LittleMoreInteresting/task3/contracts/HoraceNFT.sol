// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract HoraceNFT is ERC721, Ownable {
    string public constant houseOne =
        "https://ipfs.filebase.io/ipfs/QmcLW1Xiw1NWVFYKzSw8FUZ8yvbftveww8rKrNV5mVFNUp";
    string public constant houseTwo =
        "https://ipfs.filebase.io/ipfs/QmZcUJ31KBqkTWYHXFWFNXsiZJTzBd2jC4FEaKtCkXV95C";
    uint256 private _tokenCounter;
    constructor(string memory name_, string memory symbol_)
        ERC721(name_, symbol_)
        Ownable(msg.sender)
    {
        _tokenCounter = 0;
    }
    
    function mintNft() public {
        _safeMint(msg.sender, _tokenCounter);
        _tokenCounter = _tokenCounter + 1;
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        _requireOwned(tokenId);
        if (tokenId % 2 == 0) {
            return houseOne;
        } else {
            return houseTwo;
        }
    }

    function getTokenCounter() public view returns (uint256) {
        return _tokenCounter;
    }
}