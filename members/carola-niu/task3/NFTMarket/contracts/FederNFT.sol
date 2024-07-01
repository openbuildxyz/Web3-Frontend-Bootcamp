//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";



contract FederNFT is ERC721, Ownable, ERC721Burnable, ERC721URIStorage {
    uint256 private tokenId;

    constructor(address initalOwner) 
        ERC721("FederNFT","FDN") 
        Ownable(initalOwner) {}
    
    function _safeMint(address to, string memory _tokenURI) public onlyOwner {
        
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, _tokenURI);
        tokenId++;
    }

    function tokenURI(uint256 tokenID) public view 
        override (ERC721, ERC721URIStorage) returns (string memory) {
            return super.tokenURI(tokenID);
        }
    
    function supportsInterface(bytes4 interfaceId) public view 
        override(ERC721, ERC721URIStorage) returns (bool) {
            return super.supportsInterface(interfaceId);
        }  
}