// contracts/BadgeToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract NFT is ERC721 {

    // 声明事件
    event NFTMinted(uint256 _tokenId);

    uint256 private _currentTokenId = 0; //Token ID here will start from 1

    constructor(
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) {}

    /**
     * @dev Mints a token to an address with a tokenURI.
     * @param _to address of the future owner of the token
     */
    function mintTo(address _to) public {
        uint256 newTokenId = _getNextTokenId();
        _safeMint(_to, newTokenId);
        _incrementTokenId();
        emit NFTMinted(newTokenId);
    }

    /**
     * @dev calculates the next token ID based on value of _currentTokenId
     * @return uint256 for the next token ID
     */
    function _getNextTokenId() private view returns (uint256) {
        return _currentTokenId + 1;
    }

    /**
     * @dev increments the value of _currentTokenId
     */
    function _incrementTokenId() private {
        _currentTokenId++;
    }

    function tokenURI(
        uint256 tokenId
    ) public pure override returns (string memory) {
        string[3] memory parts;
        parts[
            0
        ] = '<svg width="500px" height="500px" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" fill="none"><path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="7.5" d="M49.456 30.466a6.219 6.219 0 0 0 -5.282 2.934l-29.641 47.644c-2.303 3.701 0.359 8.491 4.718 8.491h81.5c4.359 0.001 7.021 -4.79 4.718 -8.491l-13.977 -22.467c-2.434 -3.913 -8.131 -3.913 -10.565 0l-5.263 8.458 -20.925 -33.634a6.219 6.219 0 0 0 -5.281 -2.934z"/><text x="45" y="70" fill="black">';

        parts[1] = Strings.toString(tokenId);

        parts[2] = "</text></svg>";

        string memory output = string(
            abi.encodePacked(parts[0], parts[1], parts[2])
        );

        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "Badge #',
                        Strings.toString(tokenId),
                        '", "description": "A concise Hardhat tutorial Badge NFT with on-chain SVG images like look.", "image": "data:image/svg+xml;base64,',
                        Base64.encode(bytes(output)),
                        '"}'
                    )
                )
            )
        );
        output = string(
            abi.encodePacked("data:application/json;base64,", json)
        );

        return output;
    }
}
