// SPDX-License-Identifier: MIT
pragma solidity >0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";
contract Election is Ownable{

//The voter must be validated by election admin.
//This is to ensure only authorized people can vote.
    constructor(address admin) Ownable(){
        transferOwnership(admin);
        _admin = admin;
    }
    struct Voter{
        address id;
        bool hasRightToVote;
        bool hasVoted;
        uint8 vote;
    }
    struct Proposal{
        string statement;
        uint8 voteCount;
    }

    mapping(address=>Voter) public voters;
    Proposal[] public proposals;
    address private _admin;

    modifier isValidVoter(address id) {
        require(voters[id].hasRightToVote,"No right to vote");
        require(!voters[id].hasVoted,"voter already voted");
        _;
    }

    modifier isValidProp(uint8 toProp) {
        require(toProp>=0 && toProp<proposals.length,"Invalid");
        _;
    }
    function addProp(string memory _statement) public onlyOwner  {
        proposals.push(Proposal(_statement,0));
    }

//The vote function checks if :-
// 1.The voter has right to vote.
// 2.If the voter has already voted.
// 3.The proposal which is to be voted exists or not. 

    function vote(uint8 toProposal) 
    public 
    isValidVoter(msg.sender) 
    isValidProp(toProposal) {
        Voter storage sender = voters[msg.sender];
        sender.hasVoted = true;
        sender.vote=toProposal;
        proposals[toProposal].voteCount++;
    }

    function addVoter(address id) public onlyOwner  {
       Voter memory newVoter =  Voter(id,true,false,0);
       voters[id]=newVoter;
    }
//The winning proposal must have greater than 2 votes 
//All the proposals are compared against the proposal with maximum votes.
//After the vote counting process the winning proposal's index is returned.
    function winningProposal()  public onlyOwner view  returns (uint8 _winningProposal) {
        uint8 winningVoteCount=2;
        for (uint8 index = 0; index < proposals.length; index++) {
            if(proposals[index].voteCount>winningVoteCount){
                winningVoteCount = proposals[index].voteCount;
                _winningProposal = index;
            }
        }
        return _winningProposal;
    }

    function getAdmin() external view returns(address){
        return _admin;
    }

    function getProp() public view returns( Proposal[] memory) {
        return proposals;
    }
}