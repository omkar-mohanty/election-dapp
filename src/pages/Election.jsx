import BasicCard from "../components/BasicCard";
import { getData } from "../data/data";
import Box from '@mui/material/Box';
export default function Election() {
    let elections = getData();
    return (
        <div style={{ width: '100%' }}>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    columnGap: 3,
                    rowGap: 3,
                }}
            >
                {
                    elections.map((election) => (
                        <BasicCard
                            id={election.id}
                            path={election.id}
                            name={election.id}
                        />
                    ))
                }
            </Box>
        </div>
    )
} 
