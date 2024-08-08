// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @custom:security-contact sheldon@nmn.im
contract SNFT is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;

     // Mapping from token ID to its minting timestamp
    mapping(uint256 => uint256) private _tokenMintTimes;

    struct NFTDetail {
        uint256 tokenId;
        string tokenURI;
        uint256 mintTime;
        address owner;
    }

    constructor(address initialOwner) ERC721("SNFT", "ST") Ownable(initialOwner) {}
   
    function safeMint(address to, string memory uri) public  {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        _tokenMintTimes[tokenId] = block.timestamp;
    }

    // The following functions are overrides required by Solidity.

    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Enumerable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value) internal override(ERC721, ERC721Enumerable) {
        super._increaseBalance(account, value);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function tokensOfOwner(address owner) public view returns (uint256[] memory) {
        uint256 tokenCount = balanceOf(owner);
        uint256[] memory tokenIds = new uint256[](tokenCount);
        for (uint256 i = 0; i < tokenCount; i++) {
            tokenIds[i] = tokenOfOwnerByIndex(owner, i);
        }
        return tokenIds;
    }

    function tokenDetailsOfOwner(address owner) public view returns (NFTDetail[] memory) {
        uint256[] memory tokenIds = tokensOfOwner(owner);
        NFTDetail[] memory details = new NFTDetail[](tokenIds.length);

        for (uint256 i = 0; i < tokenIds.length; i++) {
            uint256 tokenId = tokenIds[i];
            details[i] = NFTDetail({
                tokenId: tokenId,
                tokenURI: tokenURI(tokenId),
                mintTime: _tokenMintTimes[tokenId],
                owner: owner
            });
        }

        return details;
    }
}
