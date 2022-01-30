import {
    Grid,
    Typography,
    Paper
} from "@mui/material";
import { useEffect, useState } from "react";
import Election from "../data/election";
export default function ElectionTitle(props) {

    return (
        <Grid
            container
            spacing={1}
            direction="column"
            alignItems="center"
            justifyContent="space-evenly"
            style={{ width: "100%" }}
        >
            <Grid item>
                <Typography variant="h1" style={{ width: "100%" }}>
                    {props.name}
                </Typography>
            </Grid>
        </Grid>
    )
}
