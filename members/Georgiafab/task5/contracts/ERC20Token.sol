// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
contract MTK is ERC20 {
    constructor(address owner) ERC20("MILKToken", "MTK") {
        _mint(owner, 21000000 * 10 ** 18);
    }
}

// 0x5FbDB2315678afecb367f032d93F642f64180aa3
