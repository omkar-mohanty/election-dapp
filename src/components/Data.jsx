import {
    Grid,
    Typography,
    Paper
} from "@mui/material";
export default function Data(props) {
    let election = props.election;
    let name = election.name;
    let adminAddr = election.adminAddr;
    let elecAddr = election.elecAddr;
    return (
        <Paper sx={{ minWidth: "100%" }}>
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
                        {name}
                    </Typography>
                </Grid>
                <Grid item
                    direction="row"
                    alignItems="center"
                    justifyContent="space-evenly"
                >
                    <Grid item>
                        <Paper>
                            <Typography variant="h3">
                                {elecAddr}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item>
                        <Paper>
                            <Typography variant="h3">
                                {adminAddr}
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </Paper >
    )
}
