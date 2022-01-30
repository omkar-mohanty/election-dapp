import React, { useEffect, useState } from "react"
import Grid from '@mui/material/Grid';
import { Button, Typography } from "@mui/material";
import Link from '@mui/material/Link';
import { isWalletUnlocked } from "../data/electionContract";
export default function MetamaskLogin(props) {
    useEffect(() => {
        setInterval(() => {
            let res = isWalletUnlocked();
            res.then((val) => {
                if (val) {
                    props.stateUnlocked(val);
                }
            })
        }, 100)
    }, [])
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="space-evenly"
            style={{ minHeight: '100vh' }}
        >
            <Typography variant="h3">
                Please unlock Metamask wallet.
            </Typography>
            <Button
                size="large"
                variant="outlined"
            >
                <Link href="https://metamask.io/" underline="none">
                    Install Metamask
                </Link>
            </Button>
        </Grid>
    )
}