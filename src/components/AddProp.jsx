import { Button, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { TextField, Grid } from "@mui/material";


const Proposal = ((props) => {
    const statement = props.proposal.statement;
    const voteCount = props.proposal.voteCount;
    return (
        <Paper style={{ padding: 10 }}>
            <Grid
                item
                container
                spacing={1}
                direction="row"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: "100%" }, { width: "100%" }}>
                <GridItem>
                    <Typography variant="h6">
                        {statement}
                    </Typography>
                </GridItem>
                <GridItem>
                    <Typography variant="h6">
                        votes: {voteCount}
                    </Typography>
                </GridItem>
                <GridItem>
                    <Button size="small">
                        Vote
                    </Button>
                </GridItem>
            </Grid>
        </Paper>
    )
})
const AllProposals = ((props) => {
    console.log(props.election.proposals);
    let notUpdated = props.election.proposals === undefined;
    const proposals = props.election.proposals;
    let [proposalHidden, stateProposalHidden] = useState(true);
    if (proposalHidden) {
        return (
            <Button
                disabled={notUpdated}
                variant="outlined"
                onClick={() => stateProposalHidden(val => !val)}>
                Show Proposals
            </Button>
        )
    } else {
        return (
            <>
                <Grid
                    container
                    spacing={1}
                    direction="column"
                    alignItems="center"
                    justifyContent="center">
                    {proposals.map((item, index) => (
                        <GridItem>
                            <Proposal key={index} proposal={item} />
                        </GridItem>
                    ))}
                    <GridItem>
                        <Button
                            disabled={notUpdated}
                            variant="outlined"
                            onClick={() => stateProposalHidden(val => !val)}>
                            Show Proposals
                        </Button>
                    </GridItem>
                </Grid>

            </>
        )
    }
})

const GridContainer = ({ children }) => (
    <Grid
        item
        container
        spacing={4}
        direction="column"
        alignItems="center"
        justifyContent="space-evenly"
        style={{ minHeight: "100%" }, { width: "100%" }}>
        {children}
    </Grid>
)
const GridItem = ({ children }) => (
    <Grid
        item>
        {children}
    </Grid>
)
const checkProposalName = (statement) => {
    return statement.length != 0;
}

const checkAddress = (address) => {
    return address.length != 0;
}
export default function AddPropButton(props) {
    let [textFieldValue, stateFieldValue] = useState('');
    let [errorProposal, changeError] = useState(false);
    let notAdmin = props.value ? 'Add Proposal' : 'Only Admins';
    let notUpdated = props.election.addProposal === undefined;
    if (notUpdated) notAdmin = "Loading";
    let proposalStatement = "Proposal Statement";
    let notAdminAddVoter = props.value ? 'Add Voter' : 'Only Admins';
    return (
        <GridContainer>
            <GridItem>
                <AllProposals election={props.election} />
            </GridItem>
            <GridItem>
                <TextField error={errorProposal} label={`${proposalStatement}`}
                    onChange={(e) => {
                        stateFieldValue(e.target.value);
                    }}></TextField>
            </GridItem>
            <GridItem>
                <Button
                    disabled={!props.value && !notUpdated}
                    variant="contained"
                    onClick={() => {
                        const valid = checkAddress(textFieldValue);
                        changeError(!valid);
                        if (valid)
                            props.election.addProposal(textFieldValue);
                    }}
                >
                    {notAdmin}
                </Button>
            </GridItem>
            <GridItem>
                <TextField error={errorProposal} label={`Add Voter`}
                    onChange={(e) => {
                        stateFieldValue(e.target.value);
                    }}></TextField>
            </GridItem>
            <GridItem>
                <Button
                    disabled={!props.value && !notUpdated}
                    variant="contained"
                    onClick={() => {
                        const valid = checkProposalName(textFieldValue);
                        changeError(!valid);
                        if (valid)
                            props.election.addVoter(textFieldValue);
                    }}
                >
                    {notAdminAddVoter}
                </Button>
            </GridItem>
        </GridContainer>
    )

}