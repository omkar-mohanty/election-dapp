import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import ButtonRouter from './ButtonRouter';
import { Grid } from '@mui/material';
import { spacing } from '@mui/system';
function BasicCard(props) {
    return (
        <Grid
        >
            <Card sx={{ minWidth: 300 }}>
                <CardContent>
                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justify="center"
                        style={{ padding: 10 }}
                    >
                        <Typography variant='h4' sx={{ justifyContent: 'center' }}>
                            Election {props.id}
                        </Typography>
                    </Grid>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center' }}>
                    <ButtonRouter
                        path={'/' + props.path}
                        name={props.name}
                    />
                </CardActions>
            </Card>
        </Grid>
    )
}

export default BasicCard;