import { expect } from "chai";
import { ethers } from "hardhat";

const initialSupply = 1000;

describe("Rama contract tests", function () {
  it("tests initial supply is transferred to owner during deploy", async function () {
    const [owner] = await ethers.getSigners();

    const RamaTokenFactory = await ethers.getContractFactory("RamaToken");
    const ramaTokenContract = await RamaTokenFactory.deploy(initialSupply);

    await ramaTokenContract.deployed();

    expect(await ramaTokenContract.balanceOf(owner.address)).to.eq(
      initialSupply
    );
  });

  it("tests addition of a film owner", async function () {
    const [, addr1] = await ethers.getSigners();

    const RamaTokenFactory = await ethers.getContractFactory("RamaToken");
    const ramaTokenContract = await RamaTokenFactory.deploy(initialSupply);

    await ramaTokenContract.addFilmOwner(addr1.address);
    expect(await ramaTokenContract.isOwnerAdded(addr1.address)).to.eq(true);
  });

  it("tests checks if isOwnerAdded returns false if owner is not added", async function () {
    const [, addr1] = await ethers.getSigners();

    const RamaTokenFactory = await ethers.getContractFactory("RamaToken");
    const ramaTokenContract = await RamaTokenFactory.deploy(initialSupply);

    expect(await ramaTokenContract.isOwnerAdded(addr1.address)).to.eq(false);
  });
});
