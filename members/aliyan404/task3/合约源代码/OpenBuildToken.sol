// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract OpenBuildToken is ERC20{

    constructor() ERC20("OpenBuildToken","OBT"){

    }

    //mint OBT
    function _mint(uint amount) external {
        _mint(msg.sender, amount);
    }


    //burn OBT
    function _burn(uint amount) external {
        _burn(msg.sender, amount);
    }
    
    //小数点
    function decimals() public view virtual override  returns (uint8) {
        return 6;
    }
}