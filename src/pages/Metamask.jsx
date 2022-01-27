import React from "react"
import Grid from '@mui/material/Grid';
import { Button, Typography } from "@mui/material";
import Link from '@mui/material/Link';

export default function Metamask() {
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
                Elections requires Metamask to work
            </Typography>
            <Button
                size="large"
                variant="outlined"
            >
                <Link href="https://metamask.io/" underline="none">
                    INstall Metamask
                </Link>
            </Button>
        </Grid>
    )
}