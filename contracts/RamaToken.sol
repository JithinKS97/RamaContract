// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract RamaToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("Picturama", "RAMA") {
        _mint(msg.sender, initialSupply);
    }
}
