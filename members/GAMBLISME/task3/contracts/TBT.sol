// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TBT is ERC20, Ownable {

    constructor() ERC20("TaoToken", "TT") Ownable(msg.sender){
        // 设置代币的总供应量为 10000 个，并分配给部署者
        _mint(msg.sender, 10000 * 10 ** decimals());
    }

}
