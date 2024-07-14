// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Web3FrontendToken is ERC721 {
    mapping(uint256 => bool) private _mintedTokens;

    constructor() ERC721("Web3FrontendToken", "WFT") {
        
    }

    function mint(address to, uint256 tokenId) public {
        require(!_exists(tokenId), "token already minted");
        _safeMint(to, tokenId);
        _mintedTokens[tokenId] = true;
    }

    // burn 方法
    function burn(uint256 tokenId) public {
        address owner = ownerOf(tokenId); // 使用继承自 ERC721 的 ownerOf 方法
        require(owner == msg.sender, "ERC721: caller is not the owner");

        _burn(tokenId);
        delete _mintedTokens[tokenId];

        emit Transfer(owner, address(0), tokenId);
    }

    // tokenId是否已经mint
    function _exists(uint256 tokenId) internal view returns (bool) {
        return _mintedTokens[tokenId];
    }
}