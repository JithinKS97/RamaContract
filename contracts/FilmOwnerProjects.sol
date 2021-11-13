// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";

contract FilmOwnerProjects {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    // All the film owners currently in the platform
    address[] private filmOwners;

    // As we add new projects, this is incremented to keep track of it
    uint256 private filmCount = 0;

    // Film owner mapping to projects that they own
    mapping(address => uint256[]) public filmOwnerToFilmIdsMapping;

    // Project object that keeps track of target fund and funders and their contributions
    struct FilmFundingDetails {
        uint256 targetAmount;
        mapping(address => uint256) funderAddressToAmountMapping;
    }

    struct FilmData {
        uint256 targetAmount;
        uint256 totalFunded;
        uint256 id;
    }

    // project id to project details mapping
    mapping(uint256 => FilmFundingDetails) public filmIdToDetailsMapping;

    // Adds a new film to the platform
    function addFilm(address filmOwnerAddress, uint256 fundingGoal) public {
        if (!doesOwnerAddressExist(filmOwnerAddress)) {
            addFilmOwner(filmOwnerAddress);
        }

        filmCount = filmCount + 1;

        // Adding a new film
        filmOwnerToFilmIdsMapping[filmOwnerAddress].push(filmCount);
        FilmFundingDetails storage newFilmDetails = filmIdToDetailsMapping[
            filmCount
        ];
        newFilmDetails.targetAmount = fundingGoal;
    }

    // Add a new new film owner to the film owners list
    function addFilmOwner(address filmOwnerAddress) private {
        if (doesOwnerAddressExist(filmOwnerAddress)) {
            filmOwnerToFilmIdsMapping[filmOwnerAddress] = new uint256[](100);
        }
    }

    // Checks if the film owner is already present in the platform
    function doesOwnerAddressExist(address funderAddress)
        private
        view
        returns (bool)
    {
        for (uint256 i = 0; i < filmOwners.length; i += 1) {
            if (filmOwners[i] == funderAddress) {
                return true;
            }
        }
        return false;
    }

    function getProjectsOwned(address ownerAddress)
        public
        view
        returns (uint256[] memory)
    {
        return filmOwnerToFilmIdsMapping[ownerAddress];
    }

    function getAllProjects() public view returns (FilmData[] memory) {
        FilmData[] memory filmDataList = new FilmData[](filmCount);
        for (uint256 i = 1; i <= filmCount; i++) {
            FilmData memory filmData = FilmData(
                filmIdToDetailsMapping[i].targetAmount,
                0,
                0
            );
            filmDataList[i - 1] = filmData;
        }
        return filmDataList;
    }
}
