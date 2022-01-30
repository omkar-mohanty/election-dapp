import { ethers } from "ethers";
import { getCurrentSigner } from "./electionContract";
import * as ElectionAbi from "../artifacts/contracts/Election.sol/Election.json";
export default class Election {
    constructor(contractAddress) {
        this.election = null;
        this._proposals = [];
        this.votersMap = new Map();
        this._voterArray = [];
        this.isDone = false;
        this._admin = 'NULL';
        this.constractAddress = contractAddress;
    }
    async init() {
        if (!this.isDone) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = getCurrentSigner();
            this.election = new ethers.Contract(this.constractAddress, ElectionAbi.abi, provider);
            const election = this.election;
            this._proposals = await election.connect(signer).getProp();
            this._voterArray = await election.connect(signer).getVoters();
            this._admin = await election.connect(signer).getAdmin();
        }
    }
    async update() {
        const election = this.election;
        const signer = getCurrentSigner();
        this._proposals = await election.connect(signer).getProp();
        this._voterArray = await election.connect(signer).getVoters();
        this._admin = await election.connect(signer).getAdmin();
    }
    addProposal(statement) {
        const signer = getCurrentSigner();
        this.election.connect(signer).addProp(statement);
        this.update();
    }
    vote(proposalId) {
        const election = this.election;
        const signer = getCurrentSigner();
        election.connect(signer).vote(proposalId);
        this.update();
    }
    addVoter(address) {
        const election = this.election;
        const signer = getCurrentSigner();
        election.connect(signer).addVoter(address);
        this.update();
    }
    async getWinningProposal() {
        const election = this.election;
        const signer = getCurrentSigner();
        return election.connect(signer).winningProposal();
    }
    get proposals() {
        return this._proposals;
    }
    get voters() {
        return this._voterArray;
    }
    get admin() {
        return this._admin;
    }
}
