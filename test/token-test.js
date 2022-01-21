const { expect } = require("chai");

describe("Token contract",function () {
  it("Basic Tests", async function () {   
    const signers = await ethers.getSigners();
    const owner =  signers[0];
    const Election = await ethers.getContractFactory("Election");
    const election = await Election.deploy(owner.address);   
    await election.addProp("Stat1");
    const prop = await election.getProp();
    expect(prop[0].statement).to.equal("Stat1");

    election.connect()
  });
});