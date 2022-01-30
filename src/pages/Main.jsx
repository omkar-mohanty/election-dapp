import React, { createContext, useEffect, useState } from "react"
import { Outlet } from "react-router-dom";
import Grid from '@mui/material/Grid';
import { Paper } from "@mui/material";
import AddButton from "../components/AddButton";
import ElectionFactory from "../data/electionContract";


export let ElectionFactoryContext = createContext();
const ElectionFactoryProvider = ({ children }) => {
    let [electionFactory, stateElectionFactory] = useState(new ElectionFactory());
    useEffect(() => {
        const newFactory = new ElectionFactory();
        newFactory
            .init()
            .then(() => {
                stateElectionFactory(newFactory);
            })
    }, []);
    return (
        <ElectionFactoryContext.Provider value={electionFactory}>
            {children}
        </ElectionFactoryContext.Provider>
    )

}
export default function Main() {

    return (
        <Grid
            container
            spacing={3}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: "100%" }, { width: "100%" }}>
            <Grid item s={12}>
                <Paper>
                    <AddButton />
                </Paper>
            </Grid>
            <Grid item style={{ width: "100%" }}>
                <ElectionFactoryProvider>
                    <Outlet />
                </ElectionFactoryProvider>
            </Grid>
        </Grid>
    );
}
