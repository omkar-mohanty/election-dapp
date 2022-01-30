import { Button, Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import { Link } from "react-router-dom";
export default function Home() {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }}
        >
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="space-evenly"
                style={{ minHeight: '100vh' }}
            >
                <Typography variant="h1">
                    Election
                </Typography>
                <Button
                    size="large"
                    variant="outlined"
                    LinkComponent={Link}
                    to="/elections"
                    style={{ border: '2px solid' }}

                >Go to elections</Button>

            </Grid>
        </Grid>
    )
}