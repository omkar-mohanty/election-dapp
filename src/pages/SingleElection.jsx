import { Typography } from "@mui/material";
import { useParams } from "react-router-dom"
import { getEntry } from "../data/data";
import Grid from '@mui/material/Grid';

export default function SingleElection() {
    let params = useParams();
    let election = getEntry(parseInt(params.id, 0));
    return (

        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
        >
            <Typography variant="h1">
                {election.name}
            </Typography>
        </Grid>);

}