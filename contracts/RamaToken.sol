// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";
import "./FilmOwnerProjects.sol";

contract RamaToken is ERC20, FilmOwnerProjects {
    constructor(uint256 initialSupply)
        ERC20("Picturama", "RAMA")
        FilmOwnerProjects()
    {
        _mint(msg.sender, initialSupply);
    }
}
