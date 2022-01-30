import { useContext, useEffect, useState } from "react";
import AllElections from "../components/AllElections";
import { ElectionFactoryContext } from "./Main";

export default function Election() {
    let [elections, elecState] = useState([]);
    let electionFactory = useContext(ElectionFactoryContext);
    useEffect(() => {
        elecState(electionFactory.getElections());
        electionFactory.init().then(() => {
            elecState(electionFactory.getElections());
        })
    }, []);
    return (
        <AllElections elections={elections} />
    )
} 
