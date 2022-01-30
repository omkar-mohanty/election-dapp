const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
import { ethers } from "ethers";
import * as ElecFactory from "../artifacts/contracts/ElectionFactory.sol/ElectionFactory.json"
import Election from "./election";

export function getCurrentSigner() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return signer;
}

export async function isWalletUnlocked() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    let unlocked;

    try {
        const accounts = await provider.listAccounts();

        unlocked = accounts.length > 0;
    } catch (e) {
        unlocked = false;
    }

    return unlocked;
}
export default class ElectionFactory {
    constructor() {
        this.electionFactory = new ethers.Contract(contractAddress, ElecFactory.abi);
        this.allElections = [];
        this.electionHashMap = new Map();
        this.isDone = false;
    }
    async createElection(name) {
        const signer = getCurrentSigner();
        this.electionHashMap.set(name);
        await this.electionFactory.connect(signer).addElection(name);
    }
    async init() {
        if (!this.isDone) {
            const signer = getCurrentSigner();
            this.allElections = await this.electionFactory.connect(signer).getCurrentElections();
            this._setMap();
        }
    }
    getElections() {
        let result = this.allElections;
        return result;
    }
    electionExists(name) {
        return this.electionHashMap.has(name);
    }
    getElectionByName(name) {
        const electionMap = this.electionHashMap;
        if (this.electionExists(name)) {
            const electionMeta = electionMap.get(name);
            return new Election(electionMeta.elecAddr);
        } else {
            return { name: "Loading" }
        }
    }
    _setMap() {
        this.allElections.map((val) => {
            const name = val.name;
            this.electionHashMap.set(name, val);
        })
    }
}

