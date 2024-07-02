// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract BPOP is ERC721{
    uint private _index = 0;
    uint256 MAX_SUPPLY = 1000;

    constructor() ERC721("BEE POP", "BPOP") {
        mint(msg.sender);
    }

    function mint(address to) public{
        require(_index < MAX_SUPPLY, "no more, nomo");
        _safeMint(to, _index);
        _index++;
    }

    function burn(uint256 tokenId) external {
        _burn(tokenId);
    }
}
