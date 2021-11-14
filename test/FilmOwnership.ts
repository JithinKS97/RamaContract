import { ethers } from "hardhat";
import { expect } from "chai";

const initialSupply = 1000;

describe("Film ownership tests", function () {
  it("tests addition of films", async function () {
    const [, addr1] = await ethers.getSigners();

    const RamaTokenFactory = await ethers.getContractFactory("RamaToken");
    const ramaTokenContract = await RamaTokenFactory.deploy(initialSupply);

    await ramaTokenContract.addFilm(addr1.address, 1000);
    await ramaTokenContract.addFilm(addr1.address, 2000);

    const res = await ramaTokenContract.getAllProjects();

    expect(res[0].toString()).to.eq("1000,0,1");
    expect(res[1].toString()).to.eq("2000,0,2");
  });

  it("tests addition of a film by user who is not the admin", async function () {
    const [, addr1] = await ethers.getSigners();

    const RamaTokenFactory = await ethers.getContractFactory("RamaToken");
    const ramaTokenContract = await RamaTokenFactory.deploy(initialSupply);

    await expect(
      ramaTokenContract.connect(addr1).addFilm(addr1.address, 1000)
    ).to.be.revertedWith("Unauthorised request");
  });
});
