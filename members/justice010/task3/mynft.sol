// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract JusNFT is ERC721 {
    uint256 nextTokenId;

    constructor() ERC721("JusNFT", "JNFT") {}

    function mint(address to) external {
        _safeMint(to, nextTokenId);
        nextTokenId++;
    }
}
