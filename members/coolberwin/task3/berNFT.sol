// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v4.9/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v4.9/contracts/access/Ownable.sol";

contract BerNFT is ERC721URIStorage ,Ownable{
    uint256 private _currentTokenId = 0;
    uint256 public totalSupply;
    string private baseURI;


    // constructor(uint256 _maxSupply, string memory _baseURI) ERC721("BerNFT", "BNFT") {
    //     totalSupply = _maxSupply;
    //     baseURI = _baseURI;
    // }
    
        // 传递 name 和 symbol 参数到 ERC721 构造函数
    constructor(uint256 _maxSupply, string memory _baseURI)
        ERC721("BerNFT", "BNFT") {  // 这里指定了 "BerNFT" 作为 name 和 "BNFT" 作为 symbol
        totalSupply = _maxSupply;
        baseURI = _baseURI;
    }
    function mint() public returns(uint256) {
        require(_currentTokenId < totalSupply, "Max supply reached");
        // require(paymentToken.transferFrom(address(msg.sender),address(this),tokenPrice) , "Insufficient balance");
        uint256 newTokenId = _currentTokenId++;
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, getTokenURI(newTokenId));
        
        return newTokenId;
    }
    function getTokenURI(uint256 tokenId) public view returns(string memory) {
        return string(abi.encodePacked(baseURI, uint2str(9401 + tokenId)));
    }
        function uint2str(uint _i) internal pure returns (string memory _uintAsString) {
        if (_i == 0) {
            return "0";
        }
        uint j = _i;
        uint len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint k = len;
        while (_i != 0) {
            k = k-1;
            uint8 temp = (48 + uint8(_i - _i / 10 * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }
}