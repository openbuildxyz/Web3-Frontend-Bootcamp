// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract JerryNFT is ERC721, ERC721Enumerable, Pausable, Ownable {
    string private _baseURIextended;
    uint256 public immutable MAX_SUPPLY;

    constructor() payable ERC721("JerryNFT", "JERN") {
        _baseURIextended = "";
        MAX_SUPPLY = 1000;
        pause();
    }

    /**
     * @dev Pauses the NFT, preventing any transfers. Called by default on a SBT.
     */
    function pause() internal {
        _pause();
    }

    /**
     * @dev An external method for the owner to mint Soulbound NFTs. Requires that the minted NFTs will not exceed the `MAX_SUPPLY`.
     */
    function mint(address to) external onlyOwner {
        uint256 ts = totalSupply();
        require(ts + 1 <= MAX_SUPPLY, "Mint would exceed max supply");
        _safeMint(to, ts);
    }

    /**
     * @dev Updates the baseURI that will be used to retrieve NFT metadata.
     * @param baseURI_ The baseURI to be used.
     */
    function setBaseURI(string memory baseURI_) external onlyOwner {
        _baseURIextended = baseURI_;
    }

    // Required Overrides

    function _baseURI() internal view virtual override returns (string memory) {
        return _baseURIextended;
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
