
  

# Election Dapp

  

Election Dapp aims to democratize election vote count process using Ethereum based blockchain networks.

  

## Overview
Dapp Election's Election Factory is used to create new Election instances and the Election instance's ownership is immediately transferred to sender. The sender becomes the owner of the Election instance and consequently becomes the administrator as well.

Each and every proposal's vote count is verified by all ethereum nodes which makes the vote count process highly secure, and removes single points of failure.

```solodity
struct Proposal {
        string statement;
        uint8 voteCount;
    }
```

## Vote count process

As of now the administrator can find out the winning proposal.

The minimum number of votes for a proposal to win is set to be 2 for now and a value of -1 is returned if no proposal can meet the minimum votes requirement.

```solidity
 function winningProposal()
        public
        view
        onlyOwner
        returns (int256 _winningProposal)
    {
        uint8 winningVoteCount = 2;
        _winningProposal = -1;
        for (uint256 index = 0; index < proposals.length; index++) {
            if (proposals[index].voteCount > winningVoteCount) {
                winningVoteCount = proposals[index].voteCount;
                _winningProposal = int256(index);
            }
        }
        return _winningProposal;
    }
```

## Voter addition
To ensure that only valid voters can vote the election admin adds the voters using the unique metamask address ID 
```solidity
 function addVoter(address id) public onlyOwner {
        Voter memory newVoter = Voter(id, true, false, 0);
        voterArr.push(newVoter);
        uint256 index = voterArr.length - 1;
        voters[id] = voterArr[index];
    }
```
## Installation
To get this repo on your local machine run 
```shell
git clone https://github.com/omkar-mohanty/election-dapp.git
```
To install all the dependencies run 
```shell
npm install
```
Additionally this project also requires geth and Solidity compiler (>0.8.0) to run

Installing solc
```shell
npm install solc
```
Installing geth
```shell
sudo add-apt-repository -y ppa:ethereum/ethereum
sudo apt-get update
sudo apt-get install ethereum
```

```shell

hardhat run --network ropsten scripts/deploy.js

```

  

Then, copy the deployment address and paste it in to replace `DEPLOYED_CONTRACT_ADDRESS` in this command:

  

```shell

npx hardhat verify --network ropsten DEPLOYED_CONTRACT_ADDRESS "Hello, Hardhat!"

```