// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

contract FilmOwners {
    using EnumerableSet for EnumerableSet.AddressSet;
    EnumerableSet.AddressSet private filmOwners;

    function add(address newOwner) public {
        filmOwners.add(newOwner);
    }

    function isAdded(address ownerAddress) public view returns (bool) {
        return filmOwners.contains(ownerAddress);
    }
}
