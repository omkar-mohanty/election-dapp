import * as React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Button, Typography } from "@mui/material";
export default function AddElection() {
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
                defaultValue=""
            />
            <Button
                size="large"
                variant="outlined"
                style={{ border: '2px solid' }}
            >Add Election</Button>

        </Grid>);
}