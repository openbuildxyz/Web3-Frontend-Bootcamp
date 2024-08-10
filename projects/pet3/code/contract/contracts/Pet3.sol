// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./token/ERC721/ERC721.sol";
import "./token/ERC721/extensions/ERC721Enumerable.sol";

contract Pet3 is ERC721, ERC721Enumerable {
    uint256 public immutable MAX_SUPPLY;

    struct Pet {
        address nftAddress;
        uint256 tokenId;
        address owner;
        uint256 playTimes;
        uint256 score;
    }

    Pet[] public allPets;

    constructor() ERC721("Pet3", "PET") {
        MAX_SUPPLY = 1000;
    }

    function mint(address to) public {
        uint256 ts = totalSupply();
        require(ts + 1 <= MAX_SUPPLY, "Mint would exceed max supply");
        _safeMint(to, ts);
        allPets.push(
            Pet({
                nftAddress: address(0),
                tokenId: ts,
                owner: to,
                playTimes: 0,
                score: 0
            })
        );
    }

    function addPlaytimes(uint256 tokenId, uint256 times) private {
        allPets[tokenId].playTimes += times;
    }

    function addScore(uint256 tokenId, uint256 score) public {
        require(
            allPets[tokenId].owner == msg.sender,
            "Only owner can add score"
        );
        allPets[tokenId].score += score;
    }

    function getScore(uint256 tokenId) public view returns (uint256) {
        return allPets[tokenId].score;
    }

    function getTokenId(address owner) public view returns (uint256) {
        for (uint256 i = 0; i < allPets.length; i++) {
            if (allPets[i].owner == owner) {
                return i;
            }
        }
        return 999999;
    }

    function play(uint256 tokenId) public view {}

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override(ERC721, ERC721Enumerable) returns (address) {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(
        address account,
        uint128 value
    ) internal override(ERC721, ERC721Enumerable) {
        super._increaseBalance(account, value);
    }
}
