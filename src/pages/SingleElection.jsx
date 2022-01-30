import { useParams } from "react-router-dom"
import Grid from '@mui/material/Grid';
import { useState, useEffect, createContext, useContext } from "react";
import { ElectionFactoryContext } from "./Main";
import ElectionTitle from "../components/Data";
import AddPropButton from "../components/AddProp";
import { getCurrentSigner } from "../data/electionContract";
export let ElectionContext = createContext(null);


export default function SingleElection() {
    let params = useParams();
    let name = params.id;
    let electionFactory = useContext(ElectionFactoryContext);
    let [election, electionState] = useState({});
    let [isAdmin, setAdmin] = useState(false);
    useEffect(() => {
        electionFactory
            .init()
            .then(() => {
                const updatedElection = electionFactory.getElectionByName(name);
                updatedElection.init().then(() => {
                    electionState(updatedElection);

                })
            })
    }, [])
    useEffect(() => {
        let timer = setInterval(() => {
            getCurrentSigner()
                .getAddress()
                .then((val) => {
                    setAdmin(val === election.admin)
                })
        }, 100);
        return () => clearInterval(timer);
    }, [election]);
    return (
        <Grid
            container
            spacing={1}
            direction="column"
            alignItems="center"
            justifyContent="space-evenly"
        >
            <Grid item style={{ width: "100%" }}>
                <ElectionTitle name={name} />
            </Grid>

            <Grid item
                container
                style={{ width: "100%" }}
                justifyContent="center"
                alignItems="center">
                <AddPropButton value={isAdmin} election={election} />
            </Grid>
        </Grid>

    );

}