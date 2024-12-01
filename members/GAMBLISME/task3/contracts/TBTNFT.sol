// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TBTNFT is ERC721, Ownable {

    uint256 private _id;

    constructor() ERC721("TaoNFT", "TNFT") Ownable(msg.sender) {
        increment();
    }

    function mint(address to) public {
        uint256 tokenId = increment();
        _safeMint(to, tokenId);
    }

    function getCurrentId() public view returns (uint256) {
        return _id;
    }

    function increment() private returns (uint256) {
        _id += 1;
        return _id;
    }


}
