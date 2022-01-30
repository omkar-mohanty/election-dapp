const { expect } = require("chai");
const { ethers } = require("ethers");
const { waffle } = require("hardhat");
const ElectionAbi = require("../src/artifacts/contracts/Election.sol/Election.json");
describe("Smart Election", function () {
    it("Election Contract", async function () {
        const contractAddress = "0xa16E02E87b7454126E5E10d957A927A7F5B5d2be";
        const provider = new ethers.providers.JsonRpcProvider();
        //const ens = await provider.lookupAddress(contractAddress);
        const election = new ethers.Contract(contractAddress, ElectionAbi.abi);
        console.log(election);
    });
});