// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract WNft is ERC721, ERC721URIStorage, AccessControl {
    bytes32 public constant USER_ROLE = keccak256("USER_ROLE");
    uint256 private _nextTokenId;

    constructor(address defaultAdmin) ERC721("WNft", "WN") {
        _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);
    }

    function register(address minter) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(USER_ROLE, minter);
    }

    function safeMint(string memory uri) public onlyRole(USER_ROLE) returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);
        return tokenId;
    }

    // The following functions are overrides required by Solidity.
    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
