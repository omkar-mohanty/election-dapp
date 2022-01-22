// SPDX-License-Identifier: MIT
pragma solidity >0.8.0;
import "./Election.sol";
contract ElectionFactory{

    struct ElecMeta{
        Election election;
        address adminAddr;
        address elecAddr;
        string name;
    }

    mapping(uint=>ElecMeta) private idToMeta;
    mapping(string=>bool) private takenNames;

    modifier validName(string memory _name) {
        require(!takenNames[_name],"Name already taken");
        _;
    }

    function addElection(string memory _name)public validName(_name){
        takenNames[_name]=true;
        Election elec =new Election(msg.sender);
        uint _id = uint(keccak256(abi.encodePacked(_name))); 
        idToMeta[_id]=ElecMeta(elec,msg.sender,elec.getElecAddr(),_name);
    }
    function getElection(string memory _name) external view returns(ElecMeta memory){
        require(takenNames[_name],"The election does not exist");
        uint _id = uint(keccak256(abi.encodePacked(_name))); 
        return idToMeta[_id];
    }
}