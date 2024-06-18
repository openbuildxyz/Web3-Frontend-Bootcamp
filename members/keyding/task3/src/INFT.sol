// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

// import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";

interface INFT is IERC721Metadata {
    function mint(address to, string memory tokenURI) external returns (uint256);
}
