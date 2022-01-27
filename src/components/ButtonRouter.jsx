import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@mui/material/Button';

export default function ButtonRouter(props) {
    return (
        <div>
            <Button
                variant="contained"
                LinkComponent={RouterLink}
                to={`${props.path}`}

            >
                {`Go to ` + props.name}
            </Button>
        </div>
    );
}
