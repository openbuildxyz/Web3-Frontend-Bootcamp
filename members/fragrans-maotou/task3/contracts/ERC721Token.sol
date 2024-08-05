// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract ERC721Token is ERC721URIStorage {
    // 新的代币ID
    uint256 private _nextTokenId;
    mapping (address => uint256[]) public _ownedTokenIds;

    event TokenAwarded(address indexed player, uint256 tokenId, string _tokenURI);

    constructor() ERC721("MaoTouERC721NFT", "MT721NFT") {}
    
    function awardItem(address player, string memory _tokenURI) public returns (uint256) {
        require(bytes(_tokenURI).length > 0, "Token URI cannot be empty");

        uint256 tokenId = _nextTokenId++;
        _mint(player, tokenId);
        _setTokenURI(tokenId, _tokenURI);
        _ownedTokenIds[player].push(tokenId);

        emit TokenAwarded(player, tokenId, _tokenURI);

        return tokenId;
    }

    function getOwnerTokenIds(address player) public view returns (uint256[] memory) {
        require(player != address(0), "Invalid address");
        return _ownedTokenIds[player];
    }

    // Optionally, you can add a function to get the token count for a specific address
    function getTokenCount(address player) public view returns (uint256) {
        return _ownedTokenIds[player].length;
    }

    function getTokenURI(uint256 _tokenId) public view returns(string memory){
        return tokenURI(_tokenId);
    }
}
