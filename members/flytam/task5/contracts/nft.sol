// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721URIStorage} from '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import {ERC721} from '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import "@openzeppelin/contracts/access/Ownable.sol";

// Author: @flytam https://github.com/flytam
contract BytedanceNFT is ERC721URIStorage, Ownable {
    uint256 private _currentTokenId;

    constructor() ERC721("BytedanceNFT", "BDM") Ownable(msg.sender) {}

     function safeMint(address to, string memory uri) public onlyOwner {
        _safeMint(to, _currentTokenId);
        _setTokenURI(_currentTokenId, uri);
        _currentTokenId++;
    }
}