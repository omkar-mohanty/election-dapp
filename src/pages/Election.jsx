import { useContext, useEffect, useState } from "react";
import AllElections from "../components/AllElections";
import ElectionFactory from "../data/electionContract";
import { ElectionContext } from "./Main";

export default function Election(props) {
    let [elections, elecState] = useState([]);
    let electionFactory = useContext(ElectionContext);
    useEffect(() => {
        elecState(electionFactory.getElections());
    }, [])
    return (
        <AllElections elections={elections} />
    )
} 
