// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC1155URIStorage, Ownable {
    constructor() ERC1155("") Ownable() {}

    // 设置特定代币ID的URI
    function setTokenURI(uint256 tokenId, string memory _uri) public onlyOwner {
        _setURI(tokenId, _uri);
    }

    // 实现uri函数，返回特定代币ID的URI
    function uri(uint256 tokenId) public view override returns (string memory) {
        return super.uri(tokenId);
    }

    function mint(address account, uint256 id, uint256 amount, string memory _uri, bytes memory data)
        public
        onlyOwner
    {
        _mint(account, id, amount, data);
        _setURI(id, _uri);
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        public
        onlyOwner
    {
        _mintBatch(to, ids, amounts, data);
    }
}