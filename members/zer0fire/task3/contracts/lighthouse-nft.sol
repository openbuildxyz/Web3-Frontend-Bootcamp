
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract NFTDEMO is ERC721, Ownable {
    using Strings for uint256;


    
    string private _baseTokenURI;

    
    mapping(uint256 => bool) private _tokenIdExists;

    
    constructor(string memory name_, string memory symbol_) ERC721(name_, symbol_) Ownable(msg.sender) {

    }
        
    function setBaseTokenURI(string memory baseTokenURI) external onlyOwner {
        _baseTokenURI = baseTokenURI;
    }

    
    function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
    }

    
    event LighthouseNFTMinted(address indexed owner, uint256 tokenId);

    
    function mintLighthouseNFT(address to, uint256 tokenId) external onlyOwner {
        
        require(!_tokenIdExists[tokenId], "Token already minted");

        _tokenIdExists[tokenId] = true;

        _safeMint(to, tokenId);

        
        emit LighthouseNFTMinted(to, tokenId);
    }
}