/*
The following code can be potentially hard to read given the fact that it was 
written by someone who was absolutely new to Javascript devlopment so any
senior software devlopers reading my code here's a safety pig.
.
                         _
 _._ _..._ .-',     _.._(`))
'-. `     '  /-._.-'    ',/
   )         \            '.
  / _    _    |             \
 |  a    a    /              |
 \   .-.                     ;  
  '-('' ).-'       ,'       ;
     '-;           |      .'
        \           \    /
        | 7  .__  _.-\   \
        | |  |  ``/  /`  /
       /,_|  |   /,_/   /
          /,_/      '`-'

Election Class is made to hold data about one single Election.

The UI isn't supposed to create an instance of the Election class rather
the election factory returns an object when it is required to do so.
*/
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
    //TODO: This function although meant to be async is actually blocking
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
    //The UI data needs to be updated frequently so as to reflect the 
    //current state of the blockchain
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
