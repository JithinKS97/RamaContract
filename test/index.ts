import { expect } from "chai";
import { ethers } from "hardhat";

const initialSupply = 1000;

describe("Rama contract tests", function () {
  it("tests basic aspects of the token", async function () {
    const [owner] = await ethers.getSigners();
    const RamaTokenFactory = await ethers.getContractFactory("RamaToken");
    const ramaTokenContract = await RamaTokenFactory.deploy(initialSupply);
    await ramaTokenContract.deployed();
    expect(await ramaTokenContract.balanceOf(owner.address)).to.eq(
      initialSupply
    );
  });
});
