// SPDX-License-Identifier: MIT
pragma solidity >0.8.0;
import "./Election.sol";
contract ElectionFactory{

    struct ElecMeta{
        Election election;
        address[] apprAddr;
        address adminAddr;
        string name;
    }

    mapping(uint=>ElecMeta) public idToMeta;

    
}