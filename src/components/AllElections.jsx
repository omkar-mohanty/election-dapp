import BasicCard from "./BasicCard";
import { Grid } from "@mui/material";
export default function AllElections(props) {
    let elections = props.elections;
    return (
        <Grid
            container
            spacing={1}
            direction="row"
            alignItems="center"
            justifyContent="space-evenly"
        >
            {
                elections.map((election, index) => (
                    <Grid
                        item xs={12} md={4}
                        key={index}>
                        <BasicCard
                            id={election.name}
                            path={election.name}
                            name={election.name}
                        />
                    </Grid>
                ))
            }
        </Grid>
    )
}