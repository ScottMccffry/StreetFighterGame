// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const balance = await deployer.getBalance();
  console.log("Account balance:", ethers.utils.formatEther(balance));

  const MetaFight = await ethers.getContractFactory("contracts/MetaFight.sol:MetaFight");
  const metafight = await MetaFight.deploy("MetaFight", "MFT", "ipfs://QmcXnQK9GKqXE9X8kkGe7Sb5G9rBAAPw6oxeA4CrjdQmCu/");

  await metafight.deployed();

  console.log("metafight SC deployed to:", metafight.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

