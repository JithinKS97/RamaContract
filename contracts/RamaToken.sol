// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";
import "./FilmOwners.sol";

contract RamaToken is ERC20 {
    address public owner;
    FilmOwners private filmOwners = new FilmOwners();

    constructor(uint256 initialSupply) ERC20("Picturama", "RAMA") {
        _mint(msg.sender, initialSupply);
        owner = msg.sender;
    }

    modifier isOwner() {
        assert(owner == msg.sender);
        _;
    }

    function addFilmOwner(address newOwner) public isOwner {
        filmOwners.add(newOwner);
    }

    function isFilmOwnerAdded(address ownerAddress) public view returns (bool) {
        return filmOwners.isAdded(ownerAddress);
    }
}
