const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", ethers.formatEther(balance.toString()));

  const MetaFight = await ethers.getContractFactory("MetaFight");
  const metafight= await MetaFight.deploy("MetaFight", "MFT", "ipfs://QmcXnQK9GKqXE9X8kkGe7Sb5G9rBAAPw6oxeA4CrjdQmCu/");
  console.log("Deploying MetaFight...");
  await metafight.waitForDeployment();

  console.log("MetaFight contract deployed to:", metafight.getAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

