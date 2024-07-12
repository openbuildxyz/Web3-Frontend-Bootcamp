// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNft is ERC721, Ownable  {
    uint256 private _currentTokenId = 0; //tokenId will start from 1


    constructor(string memory _name, string memory _symbol) 
        ERC721(_name, _symbol) 
        Ownable(msg.sender) {
    }

    /**
     * @dev Mints a token to an address with a tokenURI.
     */
    function mint() public payable {
        require(msg.value == 0.01 ether, "must pay 0.01 ether");
        _currentTokenId++;
        _mint(msg.sender, _currentTokenId);
    }
    
    
    function safeMint(address to) public onlyOwner {
        _currentTokenId++;
        _safeMint(to, _currentTokenId);
    }

    /**
     * @dev return tokenURI, image SVG data in it.
     */
    function tokenURI(uint256 tokenId) override public pure returns (string memory) {
        string[3] memory parts;

        parts[0] = "<svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMin meet' viewBox='0 0 350 350'><style>.base { fill: white; font-family: serif; font-size: 300px; }</style><rect width='100%' height='100%' fill='brown' /><text x='100' y='260' class='base'>";

        parts[1] = Strings.toString(tokenId);

        parts[2] = "</text></svg>";

        string memory json = Base64.encode(bytes(string(abi.encodePacked(
            "{\"name\":\"HW #", 
            Strings.toString(tokenId), 
            "\",\"description\":\"HW NFT with on-chain SVG image.\",",
            "\"image\": \"data:image/svg+xml;base64,", 
            // Base64.encode(bytes(output)), 
            Base64.encode(bytes(abi.encodePacked(parts[0], parts[1], parts[2]))),     
            "\"}"
            ))));
            
        return string(abi.encodePacked("data:application/json;base64,", json));
    }  
}