// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract Mket {
    event Sold(address buyer, address nftContract, uint nftID, uint price);
    event List(address owner, address nftContract, uint nftID, uint price);
    event Delist(address owner, address nftContract, uint nftID, uint price);

    struct Nftem {
        address owner;
        string nftURI;
        uint price;
        uint tstamp;
        bool listing;
        bool onceupon;
    }

    struct Nftag {
        address nftContract;
        uint nftID;
    }

    IERC20 private _itoken = IERC20(0xD2067B644a64FCf1E1f41E216fc34343e14ea5E5);
    Nftag[] private _nftag;
    mapping(address => mapping(uint => Nftem)) private _nftems;

    constructor() {}

    function fetchAll() external view returns (Nftem[] memory, Nftag[] memory) {
        Nftem[] memory nftems = new Nftem[](_nftag.length);
        for (uint256 i = 0; i < _nftag.length; i++) {
            Nftag memory tag = _nftag[i];
            nftems[i] = _nftems[tag.nftContract][tag.nftID];
        }
        return (nftems, _nftag);
    }

    function trade(address nftContract, uint nftID) external {
        Nftem memory nft = _nftems[nftContract][nftID];
        require(nft.listing, "403 sold");
        require(
            _itoken.allowance(msg.sender, address(this)) >= nft.price,
            "poor guy"
        );

        _itoken.transferFrom(msg.sender, nft.owner, nft.price);
        IERC721 inft = IERC721(nftContract);
        inft.transferFrom(address(this), msg.sender, nftID);
        _nftems[nftContract][nftID].listing = false;

        emit Sold(msg.sender, nftContract, nftID, nft.price);
    }

    function list(
        address nftContract,
        string memory nftURI,
        uint nftID,
        uint price
    ) external {
        IERC721 inft = IERC721(nftContract);
        require(inft.ownerOf(nftID) == msg.sender, "filthy thief");
        require(price >= 0, "meth master");
        require(
            inft.isApprovedForAll(msg.sender, address(this)),
            "not approved"
        );

        Nftem memory nft = _nftems[nftContract][nftID];

        if (nft.onceupon) {
            _nftems[nftContract][nftID].owner = msg.sender;
            _nftems[nftContract][nftID].price = price;
            _nftems[nftContract][nftID].tstamp = block.timestamp;
            _nftems[nftContract][nftID].listing = true;
        } else {
            _nftems[nftContract][nftID] = Nftem(
                msg.sender,
                nftURI,
                price,
                block.timestamp,
                true,
                true
            );
            _nftag.push(Nftag(nftContract, nftID));
        }

        inft.transferFrom(msg.sender, address(this), nftID);
        emit List(msg.sender, nftContract, nftID, price);
    }

    function delist(address nftContract, uint nftID) external {
        Nftem memory nft = _nftems[nftContract][nftID];
        require(nft.listing, "403 sold");
        require(nft.owner == msg.sender, "not yours");

        _nftems[nftContract][nftID].listing = false;
        IERC721 inft = IERC721(nftContract);
        inft.transferFrom(address(this), nft.owner, nftID);

        emit Delist(msg.sender, nftContract, nftID, nft.price);
    }
}
