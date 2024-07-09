// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";

contract YMNFT is ERC721, ERC721Burnable {
    uint256 private _nextTokenId;

    constructor()
        ERC721("YIMING NFT", "YMNFT")
    {}

    function _baseURI() internal pure override returns (string memory) {
        return "https://www.ruanyifeng.com/blogimg/asset/2017/bg2017122701.jpg";
    }

    function getBaseURI() public pure returns(string memory) {
        return _baseURI();
    }

    function safeMint(address to) public {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
    }

    // function getNFTsOfOwner(address owner) view public returns(uint256[] memory) {
    //     string memory tokenIds;
    //     for(uint256 i = 0; i < _nextTokenId; i++) {
    //         if(ownerOf(i) == owner) {
    //             tokenIds += i;
    //         }
    //     }
    //     return tokenIds;
    // }

    function tokensOfOwner(address owner) external view returns (uint256[] memory) {
        uint256 tokenCount = balanceOf(owner);
        if (tokenCount == 0) {
            // Return an empty array
            return new uint256[](0);
        } else {
            uint256[] memory result = new uint256[](tokenCount);
            uint256 totalTokens = _nextTokenId;
            uint256 resultIndex = 0;

            for (uint256 tokenId = 1; tokenId <= totalTokens; tokenId++) {
                if (_exists(tokenId) && ownerOf(tokenId) == owner) {
                    result[resultIndex] = tokenId;
                    resultIndex++;
                }
            }

            return result;
        }
    }
}