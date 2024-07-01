// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// Author: @TomatoDroid
contract TomatoFrontendToken is ERC721 {

    uint256 private _value;

    constructor() ERC721("TomatoFrontendToken", "TFT") {
        increment();
    }

    function mint(address to) public {
        uint256 tokenId = increment();
        _safeMint(to, tokenId);
    }

    function currentId() public view returns(uint256) {
        return _value;
    }

    function increment() private returns(uint256) {
        _value += 1;
        return _value;
    }
}