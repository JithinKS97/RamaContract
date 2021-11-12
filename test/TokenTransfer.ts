import { expect } from "chai";
import { ethers } from "hardhat";

const initialSupply = 1000;

describe("Rama token tests", function () {
  it("tests if initial supply is transferred to owner during deployment", async function () {
    const [owner] = await ethers.getSigners();

    const RamaTokenFactory = await ethers.getContractFactory("RamaToken");
    const ramaTokenContract = await RamaTokenFactory.deploy(initialSupply);

    await ramaTokenContract.deployed();

    expect(await ramaTokenContract.balanceOf(owner.address)).to.eq(
      initialSupply
    );
  });

  it("tests transfer of Rama token", async function () {
    const [owner, addr1] = await ethers.getSigners();

    const RamaTokenFactory = await ethers.getContractFactory("RamaToken");
    const ramaTokenContract = await RamaTokenFactory.deploy(initialSupply);

    ramaTokenContract.transfer(addr1.address, 10);

    expect(await ramaTokenContract.balanceOf(owner.address)).to.eq(990);
    expect(await ramaTokenContract.balanceOf(addr1.address)).to.eq(10);
  });

  it("tests unauthorized transfer of Rama token", async function () {
    const [owner, addr1] = await ethers.getSigners();

    const RamaTokenFactory = await ethers.getContractFactory("RamaToken");
    const ramaTokenContract = await RamaTokenFactory.deploy(initialSupply);

    await expect(
      ramaTokenContract.connect(addr1).transfer(owner.address, 1)
    ).to.be.revertedWith("ERC20: transfer amount exceeds balance");
  });
});
