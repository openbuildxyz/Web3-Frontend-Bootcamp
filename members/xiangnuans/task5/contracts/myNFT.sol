// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MyNFT is ERC721URIStorage {
    uint256 private _tokenIds;
    mapping(uint256 => bool) public mintedTokens;

    constructor() ERC721("MyNFT", "MNFT") {}

    /**
     * @dev 铸造新的NFT
     * @param recipient 接收者地址
     * @param tokenURI 代币URI
     * @return 新的代币ID
     */
    function mint(
        address recipient,
        string memory tokenURI
    ) public returns (uint256) {
        _tokenIds++;
        uint256 newTokenId = _tokenIds;
        _mint(recipient, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        return newTokenId;
    }

    /**
     * @dev 获取已铸造但未上架的NFT列表
     * @return 返回已铸造NFT的数组[1, 2, 3]
     */
    function getMintedButNotListedTokens()
        public
        view
        returns (uint256[] memory)
    {
        uint256[] memory result = new uint256[](_tokenIds);
        uint256 count = 0;
        for (uint256 i = 1; i <= _tokenIds; i++) {
            if (!mintedTokens[i]) {
                result[count] = i;
                count++;
            }
        }
        // Resize the result array to the actual count of minted but not listed tokens
        assembly {
            mstore(result, count)
        }
        return result;
    }
}
