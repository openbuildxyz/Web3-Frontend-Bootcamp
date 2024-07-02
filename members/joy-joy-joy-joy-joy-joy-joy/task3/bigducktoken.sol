// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract bigducktoken is ERC20, Ownable {
    bool private setted=false;
    address public nftMarketContract;
    uint256 public currentSupply;

    constructor(string memory name, string memory symbol, uint256 initialSupply, address _owner) ERC20(name, symbol) Ownable(_owner){
        _mint(msg.sender, initialSupply);
        currentSupply=initialSupply;
    }

    function setNftMarketContract(address _nftMarketContract) external onlyOwner {
        transferOwnership(_nftMarketContract);
        nftMarketContract = _nftMarketContract;
        setted=true;
    }

    function getNftMarketContract() external returns (address) {
        return nftMarketContract;
    }

    function transferOwnership(address newOwner) public override onlyOwner {
        require(!setted, "Ownership has been permanently transferred");
        _transferOwnership(newOwner);
    }

    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
        currentSupply -= amount;
    }

    function mint(address account, uint256 value) external onlyOwner {
        _mint(account,value);
        currentSupply += value;
    }
}