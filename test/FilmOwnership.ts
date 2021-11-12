import { expect } from "chai";
import { ethers } from "hardhat";

const initialSupply = 1000;

describe("Film ownership tests", function () {
  it("tests addition of a film owner", async function () {
    const [, addr1] = await ethers.getSigners();

    const RamaTokenFactory = await ethers.getContractFactory("RamaToken");
    const ramaTokenContract = await RamaTokenFactory.deploy(initialSupply);

    await ramaTokenContract.addFilmOwner(addr1.address);
    expect(await ramaTokenContract.isFilmOwnerAdded(addr1.address)).to.eq(true);
  });

  it("tests if isFilmOwnerAdded returns false if owner is not added", async function () {
    const [, addr1] = await ethers.getSigners();

    const RamaTokenFactory = await ethers.getContractFactory("RamaToken");
    const ramaTokenContract = await RamaTokenFactory.deploy(initialSupply);

    expect(await ramaTokenContract.isFilmOwnerAdded(addr1.address)).to.eq(
      false
    );
  });
});
