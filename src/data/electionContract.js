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

Election Factory class is made to create elections , get election data from the blockchain
and lastly provide all ongoing elections.

Given the fact that data has to be fetched from the blockchain every function which fetches 
data or has chance to block the UI is async.
*/


import { ethers } from "ethers";
import * as ElecFactory from "../artifacts/contracts/ElectionFactory.sol/ElectionFactory.json"
import Election from "./election";


//Change this when testing or deploying the smart contract
const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

//Since metamask can hold multiple addresses at once this function 
//is meant to get the current active address, this is an essential 
//function and changing this might break the application in unexpected ways
export function getCurrentSigner() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return signer;
}

//Checks if the metamask wallet is unlocked
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
    //constructor dosen't call any async function by default
    //The UI calls the init function to actually fetch data from the blockchain
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
    //The init function fetches data from the blockchain and because
    //network requests can take time it is made async 
    async init() {
        if (!this.isDone) {
            const signer = getCurrentSigner();
            this.allElections = await this.electionFactory.connect(signer).getCurrentElections();
            //See comment on setMap for further explanation 
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
    /*
        Rather than looping through the entire elections array to find data
        about a particular election  it is more efficient to store all elections
        and their name (which happens to be their id) as key value pairs in a hash map the key being the election name 
        and value being the Election object itself.
     */
    _setMap() {
        this.allElections.map((val) => {
            const name = val.name;
            this.electionHashMap.set(name, val);
        })
    }
}

