const { expect } = require("chai");
const { waffle } = require("hardhat");
describe("Smart Election Factory", function () {
  it("Election Factory Contract", async function () {
    const provider = waffle.provider;
    const abi = [
      "function getAdmin() external view returns(address)",
      "function addVoter(address id) public onlyOwner"
    ]
    const signers = await ethers.getSigners();
    const owner = signers[0];
    const ElectionFactory = await ethers.getContractFactory("ElectionFactory");
    const electionFactory = await ElectionFactory.deploy();

    await electionFactory.connect(owner).addElection("test1");

    const testElecMeta = await electionFactory.getElection("test1");
    expect(testElecMeta.name).to.equal("test1");
    expect(testElecMeta.adminAddr).to.equal(owner.address);
    const testElection = new ethers.Contract(testElecMeta.elecAddr, abi, provider);
    expect(await testElection.getAdmin()).to.equal(owner.address);
  });
});