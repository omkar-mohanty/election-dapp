const { expect } = require("chai");

describe("Smart Election", function () {
    it("Election Contract", async function () {
        const signers = await ethers.getSigners();
        const owner = signers[0];
        const Election = await ethers.getContractFactory("Election");
        const election = await Election.deploy(owner.address);

        //Testing Proposals
        for (let idx = 0; idx < 30; idx++) {
            await election.addProp(`Stat${idx}`);
        }
        let prop = await election.getProp();
        for (let idx = 0; idx < signers.length; idx++) {
            expect(prop[idx].statement).to.equal(`Stat${idx}`);
        }

        //Testing voter Addition
        for (let idx = 0; idx < signers.length; idx++) {
            await election.addVoter(signers[idx].address);
        }
        let voters = await election.getVoters();
        for (let idx = 0; idx < signers.length; idx++) {
            expect(voters[idx].id).to.equal(signers[idx].address);
        }

        //Testing Voting Mechanism
        const winningProp = Math.floor(Math.random() * 30);
        for (let idx = 0; idx < signers.length; idx++) {
            await election.connect(signers[idx]).vote(winningProp);
        }
        prop = await election.winningProposal();
        expect(prop).to.equal(winningProp);

        
        voters = await election.getVoters();
        for (let idx = 0; idx < signers.length; idx++) {
            expect(await election.connect(signers[idx]).hasVoted()).to.equal(true);
        }
        
    });
});