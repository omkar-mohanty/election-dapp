import { Typography } from "@mui/material";
import { useParams } from "react-router-dom"
import Grid from '@mui/material/Grid';
import { useState, useEffect, useContext } from "react";
import ElectionFactory from "../data/electionContract";

let placeholder = {
    name: "Loading",
    elecAddr: "Loading",
    adminAddr: "Loading",
};

import { ElectionContext } from "./Main";
import Data from "../components/Data";
export default function SingleElection() {
    let params = useParams();
    let name = params.id;
    let electionFactory = useContext(ElectionContext);
    let [election, electionState] = useState(placeholder);
    useEffect(() => {
        electionFactory
            .init()
            .then(() => {
                const updatedElection = electionFactory.getElectionByName(name);
                electionState(updatedElection);
            })
    }, [])
    return (

        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
        >
            <Data election={election} />
        </Grid>);

}