import { ethers } from "hardhat";

const initialSupply = 10000;

async function main() {
  const RamaTokenFactory = await ethers.getContractFactory("RamaToken");
  const ramaTokenContract = await RamaTokenFactory.deploy(initialSupply);

  await ramaTokenContract.deployed();

  console.log("Rama contract deployed at:", ramaTokenContract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});