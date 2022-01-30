import React, { useContext, useState } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import ElectionFactory from '../data/electionContract';
import { ElectionFactoryContext } from './Main';
export default function AddElection() {
    let electionFactory = useContext(ElectionFactoryContext);
    let [textFieldValue, stateTextFieldValue] = useState('');
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="space-evenly"
            style={{ minHeight: '100vh' }}
        >

            <TextField
                label="Name"
                placeholder="New election name"
                onChange={(e) => {

                    stateTextFieldValue(e.target.value)
                }}
            />
            <Button
                size="large"
                variant="outlined"
                style={{ border: '2px solid' }}
                onClick={() => {
                    const name = textFieldValue;
                    electionFactory.createElection(name);
                }}
            >Add Election</Button>

        </Grid >);
}