// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {ERC721} from "../lib/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";

import {Strings} from "../lib/openzeppelin-contracts/contracts/utils/Strings.sol";

contract MyERC721 is ERC721 {
    using Strings for uint256;

    address owner;

    constructor() ERC721("MyNFT", "MNFT") {
        owner = msg.sender;
    }

    modifier onlyOner() {
        require(msg.sender == owner, "only owner!");
        _;
    }

    function mint(address to, uint256 tokenId) external onlyOner {
        _mint(to, tokenId);
    }

    // function _baseURI() internal view override returns (string memory) {
    //     return "https://xxxx.mypinata.cloud/ipfs/xxxx/";
    // }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        _requireOwned(tokenId);

        string memory baseURI = "https://xxxx.mypinata.cloud/ipfs/xxxx/"; // _baseURI();
        return
            bytes(baseURI).length > 0
                ? string.concat(
                    string.concat(baseURI, tokenId.toString()),
                    ".json"
                )
                : "";
    }
}
